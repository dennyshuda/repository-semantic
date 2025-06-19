import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import LoginForm from "@/app/login/_components/LoginForm";
import { getSession, logout } from "@/utils/actions/auth";

export default async function LoginPage() {
	const session = await getSession();

	return (
		<Box minH={"100vh"} display="flex" alignItems="center" justifyContent="center">
			<Stack gap={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"}>Sign in to your account</Heading>
					<Text fontSize={"lg"} color={"gray.600"}>
						to access the admin dashboard
					</Text>
					{session.isLoggedIn && (
						<Box>
							<Text>
								{session.username} - {session.role}
							</Text>
							<form action={logout}>
								<Button type="submit">Logout</Button>
							</form>
						</Box>
					)}
				</Stack>

				<LoginForm />
			</Stack>
		</Box>
	);
}
