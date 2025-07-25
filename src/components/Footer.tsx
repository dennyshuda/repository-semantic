import { Box, Container, Text } from "@chakra-ui/react";

export function Footer() {
	return (
		<Box borderTopWidth={1} borderStyle={"solid"} paddingY="5">
			<Container maxW="7xl" textAlign="center">
				<Text>© {new Date().getFullYear()} Faculty of Computer Science. All rights reserved</Text>
			</Container>
		</Box>
	);
}
