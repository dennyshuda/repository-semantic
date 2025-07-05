import { getSession, logout } from "@/utils/actions/auth";
import { Badge, Box, Button, Flex, HStack, Icon, Separator, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";
import { FiBook, FiHome, FiLogOut, FiUsers, FiUserPlus } from "react-icons/fi";
import { HiOutlineCollection } from "react-icons/hi";

const LinkItems = [
	{ name: "Dashboard", icon: FiHome, href: "/dashboard", role: "admin" },
	{ name: "Articles", icon: FiBook, href: "/dashboard/article", role: "admin" },
	{ name: "Authors", icon: FiUsers, href: "/dashboard/author", role: "admin" },
	{ name: "Users", icon: FiUserPlus, href: "/dashboard/user", role: "admin" },
	{
		name: "My Collecttion",
		icon: HiOutlineCollection,
		href: "/dashboard/collection",
		role: "author",
	},
];

interface NavItemProps {
	icon: IconType;
	children: React.ReactNode;
	href: string;
	pl?: number;
}

export const NavItem = ({ icon: IconLink, children, href, pl = 4 }: NavItemProps) => {
	return (
		<Box asChild _hover={{ background: "gray.200", rounded: "md" }}>
			<Link href={href}>
				<HStack>
					<Flex
						align="center"
						p="3"
						pl={pl}
						rounded="lg"
						role="group"
						cursor="pointer"
						fontWeight="medium"
						transition="all 0.2s"
						color="gray.700"
					>
						{IconLink && (
							<Icon mr="3" fontSize="16">
								<IconLink />
							</Icon>
						)}
						<Text>{children}</Text>
					</Flex>
				</HStack>
			</Link>
		</Box>
	);
};

export default async function DashboardSidebar() {
	const session = await getSession();

	const filteredNav = LinkItems.filter((item) => item.role === session.role);

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
					Admin Dashboard
				</Text>
			</Flex>

			<Box px={4} pb={4}>
				<HStack gap={3} p={3} rounded="lg">
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
				<Text paddingLeft="4" fontSize="sm" color="gray.500">
					Management
				</Text>

				{filteredNav.map((link) => (
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
