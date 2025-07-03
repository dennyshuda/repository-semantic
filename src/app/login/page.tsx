import LoginForm from "@/app/login/_components/LoginForm";
import { Box, Container, Flex, Heading, Image, Text } from "@chakra-ui/react";
export default async function LoginPage() {
	return (
		<Flex minH="100vh">
			<Box
				flex="1"
				bg="gray.100"
				display={{ base: "none", md: "flex" }}
				alignItems="center"
				justifyContent="center"
			>
				<Image
					src="/fasilkom-login.png"
					alt="Academic Repository Illustration"
					width="full"
					height="full"
					fit="cover"
				/>
			</Box>

			<Flex flex="1" align="center" justify="center">
				<Container maxW="md" py={12} px={{ base: 6, md: 8 }}>
					<Box marginBottom="6">
						<Heading fontSize="2xl">FASILKOM Repository</Heading>
						<Text fontSize="sm" color="gray.500">
							UPN &quot;Veteran&quot; Jawa Timur
						</Text>
					</Box>

					<LoginForm />
				</Container>
			</Flex>
		</Flex>
	);
}
