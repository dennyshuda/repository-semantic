import prisma from "@/lib/prisma";
import { Box } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import UserEditForm from "../_components/UserEditForm";

export default async function DashboardEditUserPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const user = await prisma.user.findUnique({
		where: { id: parseInt(id) },
	});

	if (!user) {
		notFound();
	}

	return (
		<Box>
			<UserEditForm id={user.id} name={user.name} username={user.username} />
		</Box>
	);
}
