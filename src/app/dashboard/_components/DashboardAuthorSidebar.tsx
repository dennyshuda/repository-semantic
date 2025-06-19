import { getSession, logout } from "@/utils/actions/auth";
import {
	Avatar,
	Badge,
	Box,
	Button,
	Flex,
	HStack,
	Separator,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BiCollection } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { NavItem } from "./DashboardSidebar";

const LinkItems = [{ name: "Collection", icon: BiCollection, href: "/dashboard/collection" }];

export default async function DashboardAuthorSidebar() {
	const session = await getSession();

	return (
		<Box
			borderRight="1px"
			display={{ base: "none", md: "block" }}
			w={{ base: "280px" }}
			pos="fixed"
			h="full"
			boxShadow="sm"
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="xl" fontWeight="bold">
					Author Dashboard
				</Text>
			</Flex>

			<Box px={4} pb={4}>
				<HStack gap={3} p={3} rounded="lg">
					<Avatar.Root size="sm" bg="primary.500" color="white">
						<Avatar.Fallback name={session.name} />
					</Avatar.Root>
					<Box>
						<Text fontWeight="medium" fontSize="sm">
							{session.name}
						</Text>
						<Text fontSize="xs" color="gray.500">
							{session.username}
						</Text>
					</Box>
					<Badge colorScheme="primary" ml="auto">
						{session.role === "admin" ? "Admin" : "Author"}
					</Badge>
				</HStack>
			</Box>

			<VStack gap={1} align="stretch" px={3}>
				{LinkItems.map((link) => (
					<NavItem key={link.name} icon={link.icon} href={link.href}>
						{link.name}
					</NavItem>
				))}
			</VStack>

			<Box position="absolute" bottom="5" width="100%" px={3}>
				<Separator mb={4} />

				<form action={logout}>
					<HStack>
						<Button type="submit" variant="plain" color="red.500" fontWeight="medium" fontSize="16">
							<FiLogOut /> Log Out
						</Button>
					</HStack>
				</form>
			</Box>
		</Box>
	);
}
