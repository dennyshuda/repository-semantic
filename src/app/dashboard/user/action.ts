"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { CreateUserFormValues } from "./create/page";

export async function getUser(id: number) {
	const user = await prisma.user.findUnique({
		where: { id: Number(id) },
		select: {
			name: true,
			username: true,
			id: true,
		},
	});

	return user;
}

export async function getUsers() {
	const users = await prisma.user.findMany({
		where: {
			role: "author",
		},
		omit: { password: true },
	});

	return users;
}

export async function createUser(data: CreateUserFormValues) {
	const findAuthorId = await prisma.user.findFirst({
		where: {
			authorId: data.authorId[0],
		},
		select: {
			authorId: true,
		},
	});

	if (findAuthorId?.authorId === data.authorId[0]) {
		return {
			status: 400,
			message: "authorId is already exist",
		};
	}

	const findUsername = await prisma.user.findUnique({
		where: {
			username: data.username,
		},
		select: {
			username: true,
		},
	});

	if (findUsername?.username === data.username) {
		return {
			status: 400,
			message: "username is already exist",
		};
	}

	await prisma.user.create({
		data: {
			name: data.name,
			username: data.username,
			authorId: data.authorId[0],
			role: "author",
			password: await bcrypt.hash(data.password, 10),
		},
	});

	revalidatePath("/dashboard/user");

	return { status: 201, message: "succes" };
}

interface Props {
	id: number;
	data: {
		authorId: string[];
		name: string;
		password: string;
		username: string;
	};
}

export async function updateUser({ id, data }: Props) {
	await prisma.user.update({
		where: {
			id: id,
		},
		data: {
			...(data.name && { name: data.name }),
			...(data.username && { username: data.username }),
			...(data.authorId && { authorId: data.authorId[0] }),
			...(data.password && { password: await bcrypt.hash(data.password, 10) }),
		},
	});

	revalidatePath("/dashboard/user");
}

export async function deleteUser(id: number) {
	await prisma.user.delete({ where: { id } });

	revalidatePath("/dashboard/user");
}
