import { Avatar, Badge, Box, Flex, HStack, Icon, Separator, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { IconType } from "react-icons";
import { FiBook, FiHome, FiLogOut, FiPlusCircle, FiSearch, FiUsers } from "react-icons/fi";

const LinkItems = [
	{ name: "Dashboard", icon: FiHome, href: "/dashboard" },
	{ name: "Articles", icon: FiBook, href: "/dashboard/article" },
	{ name: "Add Article", icon: FiPlusCircle, href: "/dashboard/article/create", indent: true },
	{ name: "Authors", icon: FiUsers, href: "/dashboard/author" },
	{ name: "Add Author", icon: FiPlusCircle, href: "/dashboard/author/create", indent: true },
	{ name: "Search", icon: FiSearch, href: "/dashboard" },
];

interface NavItemProps {
	icon: IconType;
	children: React.ReactNode;
	href: string;
	pl?: number;
	color?: string;
}

const NavItem = ({ icon: IconLink, children, href, pl = 4, color }: NavItemProps) => {
	return (
		<Link href={href}>
			<HStack>
				<Flex
					align="center"
					p="3"
					pl={pl}
					borderRadius="lg"
					role="group"
					cursor="pointer"
					_hover={{
						bg: "primary.50",
						color: "primary.600",
					}}
					color={color}
					fontWeight="medium"
					transition="all 0.2s"
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
	);
};

export default function DashboardSidebar() {
	const user = {
		name: "Admin",
		email: "admin@gmail.com",
	};

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
					<Avatar.Root size="sm" bg="primary.500" color="white">
						<Avatar.Fallback name={user?.name} />
					</Avatar.Root>
					<Box>
						<Text fontWeight="medium" fontSize="sm">
							{user?.name}
						</Text>
						<Text fontSize="xs" color="gray.500">
							{user?.email}
						</Text>
					</Box>
					<Badge colorScheme="primary" ml="auto">
						Admin
					</Badge>
				</HStack>
			</Box>

			<VStack gap={1} align="stretch" px={3}>
				{LinkItems.map((link) => (
					<NavItem key={link.name} icon={link.icon} href={link.href} pl={link.indent ? 12 : 4}>
						{link.name}
					</NavItem>
				))}
			</VStack>

			<Box position="absolute" bottom="5" width="100%" px={3}>
				<Separator mb={4} />
				<NavItem icon={FiLogOut} href="/" color="red.500">
					Log Out
				</NavItem>
			</Box>
		</Box>
	);
}
