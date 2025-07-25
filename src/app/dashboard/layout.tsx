import DashboardSidebar from "@/app/dashboard/_components/DashboardSidebar";
import { Box, Flex } from "@chakra-ui/react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<Flex minH="100vh">
			<DashboardSidebar />
			<Box flex="1" ml={{ base: 0, md: "280px" }}>
				<Box p={6}>{children}</Box>
			</Box>
		</Flex>
	);
}
