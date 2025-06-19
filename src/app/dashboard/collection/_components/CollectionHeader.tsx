import { Flex, Box, Text, Button, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";

export default function CollectionHeader() {
	return (
		<Flex justify="space-between" align="center" mb={6}>
			<Box>
				<Heading size="lg">Collection List</Heading>
				<Text color="gray.500">Manage all articles in the repository</Text>
			</Box>
			<Link href="/dashboard/article/create">
				<Button colorScheme="primary">
					<FiPlus />
					Create New Article
				</Button>
			</Link>
		</Flex>
	);
}
