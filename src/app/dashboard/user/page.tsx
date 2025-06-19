import prisma from "@/lib/prisma";
import { Box } from "@chakra-ui/react";
import UserHeader from "./_components/UserHeader";
import UserTable from "./_components/UserTable";

export default async function DashboardUserPage() {
	const users = await prisma.user.findMany({
		where: {
			role: "author",
		},
		omit: { password: true },
	});

	return (
		<Box>
			<UserHeader />
			<UserTable users={users} />
		</Box>
	);
}
