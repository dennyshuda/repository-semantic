import { Box, Heading, VStack, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function ForbiddenPage() {
	return (
		<Box
			minH="100vh"
			bg="gray.50"
			display="flex"
			justifyContent="center"
			alignItems="center"
			px={6}
		>
			<VStack gap={4} textAlign="center">
				<Heading fontSize="6xl" color="red.500">
					403 - Forbidden
				</Heading>
				<Text fontSize="xl" maxW="md">
					You don’t have permission to access this page.
				</Text>
				<Link href="/dashboard">
					<Button colorScheme="teal">Go to Home</Button>
				</Link>
			</VStack>
		</Box>
	);
}
