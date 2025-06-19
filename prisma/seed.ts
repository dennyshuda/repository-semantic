import { PrismaClient } from "@/app/generated/prisma";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function main() {
	await prisma.user.create({
		data: {
			name: "Admin",
			username: "admin",
			password: await bcrypt.hash(process.env.ADMIN_PASSWORD!, 10),
			role: "admin",
			authorId: "admin",
		},
	});
}

main();
