"use client";

import ArticleCard from "@/components/ArticleCard";
import { ArticleListFilters } from "@/components/ArticleListFilters";
import { useArticlesFilters } from "@/hooks/useArticleFilter";
import { useGetAllArticles } from "@/utils/hooks/useGetAllArticles";
import {
	Box,
	Breadcrumb,
	Button,
	Container,
	Heading,
	Link,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { Suspense } from "react";
import Loading from "./loading";

export default function ArticlePage() {
	const { query } = useArticlesFilters();
	const { data } = useGetAllArticles({ query });

	console.log(data);

	return (
		<Box minH="100vh">
			<Container maxW={"7xl"} py={8}>
				<Breadcrumb.Root mb={6} fontSize="sm">
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Link href="/">Home</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.CurrentLink>
							<Link href="/article">Article</Link>
						</Breadcrumb.CurrentLink>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<ArticleListFilters />

				<Box>
					<Suspense fallback={<Loading />}>
						{data?.articles.length !== 0 ? (
							<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
								{data?.articles?.map((article) => (
									<ArticleCard key={article.id} article={article} />
								))}
							</SimpleGrid>
						) : (
							<Box textAlign="center" py={10} px={6} borderRadius="xl" borderWidth="1px">
								<Heading as="h2" size="xl" mt={6} mb={2}>
									No Results Found
								</Heading>
								<Text color={"gray.500"}>
									We couldnt find any journals matching your search criteria. Try adjusting your
									filters or search terms.
								</Text>
								<Button mt={6} colorScheme="brand">
									Clear All Filters
								</Button>
							</Box>
						)}
					</Suspense>
				</Box>
			</Container>
		</Box>
	);
}
