import { Author } from "@/utils/interfaces/authors";
import { Avatar, Box, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface AuthorCardProps {
	author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
	return (
		<Link href={`author/${author.id}`}>
			<Box
				maxW={"445px"}
				w={"full"}
				boxShadow={"md"}
				rounded={"md"}
				p={6}
				height="full"
				overflow={"hidden"}
				_hover={{ boxShadow: "lg", transform: "translateY(-5px)", transition: "all 0.3s ease" }}
			>
				<Flex align="center" mb={4}>
					<Avatar.Root size="lg" mr={4}>
						<Avatar.Fallback name={author.name} />
						<Avatar.Image src={author.image} />
					</Avatar.Root>

					<Stack>
						<Heading fontSize={"xl"} fontFamily={"body"}>
							{author.name}
						</Heading>

						<Text color={"gray.500"}>Department of {author.department}</Text>
					</Stack>
				</Flex>

				<Stack gap={2}>
					<Text fontWeight={600}>Expertise</Text>
					<Text color={"gray.500"}>{author.expertises}</Text>
				</Stack>
			</Box>
		</Link>
	);
}
