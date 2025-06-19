"use server";

import prisma from "@/lib/prisma";
import { CreateUserFormValues } from "./_components/CreateUserDialog";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function createUser(data: CreateUserFormValues) {
	const find = await prisma.user.findUnique({
		where: {
			username: data.authorId[0],
		},
	});

	if (find?.username === data.authorId[0]) {
		return {
			status: 400,
			message: "authorId is exist",
		};
	}

	await prisma.user.create({
		data: {
			name: data.name,
			username: data.authorId[0],
			authorId: data.authorId[0],
			role: "author",
			password: await bcrypt.hash(data.password, 10),
		},
	});

	revalidatePath("/dashboard/user");

	return { status: 201, message: "succes" };
}

export async function deleteUser(id: number) {
	await prisma.user.delete({ where: { id } });

	revalidatePath("/dashboard/user");
}
