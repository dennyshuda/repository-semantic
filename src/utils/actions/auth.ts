"use server";

import { LoginForm } from "@/app/login/_components/LoginForm";
import prisma from "@/lib/prisma";
import { defaultSession, SessionData, sesssionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getSession() {
	const session = await getIronSession<SessionData>(await cookies(), sesssionOptions);

	if (!session.isLoggedIn) {
		session.isLoggedIn = defaultSession.isLoggedIn;
	}

	return session;
}

export async function signin(data: LoginForm) {
	const user = await prisma.user.findUnique({
		where: {
			username: data?.username,
		},
	});

	console.log(user);

	if (!user) {
		return {
			status: 404,
			message: "not found",
			data: null,
		};
	}

	const checkPassword = await bcrypt.compare(data.password, user.password);

	if (!checkPassword) {
		return {
			status: 404,
			message: "Password incorrect",
			data: null,
		};
	}

	const session = await getSession();

	session.id = user.id;
	session.name = user.name;
	session.username = user.username;
	session.role = user.role;
	session.isLoggedIn = true;
	await session.save();

	revalidatePath("/login");

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password, ...userWithoutPassword } = user;

	return {
		data: userWithoutPassword,
		message: "data found",
		status: 200,
	};
}

export async function logout() {
	const session = await getSession();
	session.destroy();
	revalidatePath("/login");
}
