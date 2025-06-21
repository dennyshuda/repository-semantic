"use client";

import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function UserHeader() {
	return (
		<Flex justify="space-between" align="center" mb={6}>
			<Box>
				<Heading size="lg">Users Management</Heading>
				<Text color="gray.500">Manage all users in the repository</Text>
			</Box>

			<Link href="/dashboard/user/create">
				<Button colorScheme="primary">
					<FiPlus />
					Create New User
				</Button>
			</Link>
		</Flex>
	);
}
