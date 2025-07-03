import { Article } from "@/utils/interfaces/articles";
import { Badge, Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

interface ArticleCardProps {
	article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
	return (
		<Box
			as="article"
			borderYWidth="2px"
			borderEndWidth="2px"
			borderStartWidth="5px"
			borderStartColor="orange.500"
			padding="5"
			rounded="md"
			_hover={{ shadow: "md" }}
		>
			<Badge>{article.year}</Badge>

			<Stack marginY="5">
				<Heading fontSize="md">{article.title}</Heading>
				<Text fontSize="sm">
					<Text as="span" color="gray.500">
						by
					</Text>{" "}
					{article.authors}
				</Text>
			</Stack>

			<Stack>
				<Text color="gray.500" fontSize="sm">
					{article.abstract.slice(0, 150) + "..."}
				</Text>
				<Stack direction="row">
					{article.keywords.split(",").map((keyword, index) => (
						<Badge key={index} variant="outline" paddingX="2">
							{keyword}
						</Badge>
					))}
				</Stack>
			</Stack>

			<Flex justify="end">
				<Button
					asChild
					marginTop="5"
					variant="outline"
					_hover={{ background: "orange.500", color: "white" }}
				>
					<Link href={`/article/${article.id}`}>View Article</Link>
				</Button>
			</Flex>
		</Box>
	);
}
