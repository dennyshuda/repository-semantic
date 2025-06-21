import LoginForm from "@/app/login/_components/LoginForm";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";

export default async function LoginPage() {
	return (
		<Box minH={"100vh"} display="flex" alignItems="center" justifyContent="center">
			<Stack gap={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to access the admin dashboard
					</Text>
				</Stack>

				<LoginForm />
			</Stack>
		</Box>
	);
}
