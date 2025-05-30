import {
	Avatar,
	AvatarGroup,
	Badge,
	Box,
	Flex,
	Heading,
	HStack,
	Icon,
	Stack,
	Text,
} from "@chakra-ui/react";
import { FiCalendar } from "react-icons/fi";
import Link from "next/link";
import { Article } from "@/utils/interfaces/articles";

interface ArticleCardProps {
	article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Link href={`/article/${article.id}`}>
			<Box
				w={"full"}
				boxShadow={"sm"}
				rounded={"xl"}
				overflow={"hidden"}
				borderWidth="1px"
				position="relative"
				transition="all 0.3s"
				height="full"
				_hover={{
					transform: "translateY(-5px)",
					boxShadow: "md",
					borderColor: "primary.200",
				}}
			>
				<Flex p={6} height="full" direction="column" justify="space-between">
					<Box>
						<Stack gap={2} align={"start"} mb={5}>
							<HStack>
								<Badge
									px={2}
									py={1}
									fontWeight="medium"
									rounded="full"
									colorScheme="blue"
									variant="solid"
								>
									{article.year}
								</Badge>
							</HStack>
							<Heading
								fontSize={"xl"}
								fontFamily={"body"}
								lineHeight="tight"
								textTransform="uppercase"
							>
								{article.title}
							</Heading>
						</Stack>

						<Text color={"gray.500"} fontSize="sm" mb={4} textAlign="justify">
							{article.abstract.slice(0, 200) + "..."}
						</Text>
					</Box>

					<Stack mt="auto" pt={4} borderTop="1px">
						<Flex justify="space-between" align="center">
							<AvatarGroup size="sm">
								{article.authors.split(",").map((author: string, idx: number) => (
									<Avatar.Root key={idx} bg="primary.500" color="white">
										<Avatar.Fallback name={author} />
									</Avatar.Root>
								))}
							</AvatarGroup>
							<HStack gap={4} color="gray.500" fontSize="xs">
								<Flex align="center">
									<Icon as={FiCalendar} mr={1} />
									<Text>{article.year}</Text>
								</Flex>
							</HStack>
						</Flex>
					</Stack>
				</Flex>
			</Box>
		</Link>
	);
}
