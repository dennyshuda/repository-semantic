import { Author } from "@/utils/interfaces/authors";
import { Avatar, Badge, Box, Flex, Heading, Stack, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

interface AuthorCardProps {
	author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
	function formatDepartment(value: string) {
		switch (value) {
			case "informatika":
				return "Informatics";
			case "sistem_informasi":
				return "System Information";
			case "bisnis_digital":
				return "Digital Business";
			case "sains_data":
				return "Data Science";
		}
	}
	return (
		<Box
			padding="4"
			rounded="md"
			borderXWidth="2px"
			borderBottomWidth="2px"
			borderTopWidth="5px"
			borderTopColor="orange.500"
		>
			<Flex gap="3">
				<Avatar.Root size="xl">
					<Avatar.Fallback name="Segun Adebayo" />
					<Avatar.Image src={author.image} />
				</Avatar.Root>

				<Box spaceY="1">
					<Heading fontSize="lg">{author.name}</Heading>
					<Badge size="sm" colorPalette="green">
						{formatDepartment(author.department)}
					</Badge>
					<Text fontSize="sm">{author.nip}</Text>
					<Text fontSize="sm">{author.email}</Text>
				</Box>
			</Flex>

			<Box marginY="5">
				<Text fontSize="sm">Research Interesets</Text>
				<Stack direction="row">
					{author.expertises.slice(0, 2).map((keyword, index) => (
						<Badge key={index} variant="outline" paddingX="2" size="xs">
							{keyword}
						</Badge>
					))}

					{author.expertises.length > 2 && (
						<Badge variant="solid" colorScheme="blue" px="2" size="xs">
							+{author.expertises.length - 2} more
						</Badge>
					)}
				</Stack>
			</Box>

			<Button
				asChild
				variant="outline"
				width="full"
				_hover={{ background: "orange.500", color: "white" }}
			>
				<Link href={`/author/${author.id}`}>View Profile</Link>
			</Button>
		</Box>
		// <Link href={`author/${author.id}`}>
		// 	<Box
		// 		maxW={"445px"}
		// 		w={"full"}
		// 		boxShadow={"md"}
		// 		rounded={"md"}
		// 		p={6}
		// 		height="full"
		// 		overflow={"hidden"}
		// 		_hover={{ boxShadow: "lg", transform: "translateY(-5px)", transition: "all 0.3s ease" }}
		// 	>
		// 		<Flex align="center" mb={4}>
		// 			<Avatar.Root size="lg" mr={4}>
		// 				<Avatar.Fallback name={author.name} />
		// 				<Avatar.Image src={author.image} />
		// 			</Avatar.Root>

		// 			<Stack>
		// 				<Heading fontSize={"xl"} fontFamily={"body"}>
		// 					{author.name}
		// 				</Heading>

		// 				<Text color={"gray.500"}>Department of {author.department}</Text>
		// 			</Stack>
		// 		</Flex>

		// 		<Stack gap={2}>
		// 			<Text fontWeight={600}>Expertise</Text>
		// 			<Text color={"gray.500"}>{author.expertises.toString()}</Text>
		// 		</Stack>
		// 	</Box>
		// </Link>
	);
}
