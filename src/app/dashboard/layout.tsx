import DashboardSidebar from "@/app/dashboard/_components/DashboardSidebar";
import { getSession } from "@/utils/actions/auth";
import { Box, Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import DashboardAuthorSidebar from "./_components/DashboardAuthorSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();

	if (!session.isLoggedIn) {
		redirect("/login");
	}

	return (
		<Flex minH="100vh">
			{session.role === "admin" ? <DashboardSidebar /> : <DashboardAuthorSidebar />}
			<Box flex="1" ml={{ base: 0, md: "280px" }}>
				<Box p={6}>{children}</Box>
			</Box>
		</Flex>
	);
}
