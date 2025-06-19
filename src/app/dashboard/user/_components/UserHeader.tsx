"use client";

import { useToggle } from "@/hooks/useToggle";
import { Flex, Box, Button, Text, Heading } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { CreateUserDialog } from "./CreateUserDialog";

export default function UserHeader() {
	const { value, toggle, setOff } = useToggle();

	return (
		<Flex justify="space-between" align="center" mb={6}>
			<Box>
				<Heading size="lg">Users Management</Heading>
				<Text color="gray.500">Manage all users in the repository</Text>
			</Box>

			<Button onClick={toggle} colorScheme="primary">
				<FiPlus />
				Create New User
			</Button>

			<CreateUserDialog open={value} setOff={setOff} toggle={toggle} />
		</Flex>
	);
}
