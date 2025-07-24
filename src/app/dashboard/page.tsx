import { getSession } from "@/utils/actions/auth";
import { Box, Card, Heading, Separator } from "@chakra-ui/react";

export default async function DashboardPage() {
	const session = await getSession();

	const hours = new Date().getHours();

	return (
		<Box>
			<Heading>Dashboard</Heading>
			<Separator marginY="10" />

			<Card.Root>
				<Card.Header>
					<Card.Title fontSize="3xl">Welcome to Dashboard Repository</Card.Title>
				</Card.Header>
				<Card.Body>
					<Heading as="h2">
						{hours >= 18 ? "Good Night" : "Good Evening"}, {session.name}
					</Heading>
				</Card.Body>
			</Card.Root>
		</Box>
	);
}
