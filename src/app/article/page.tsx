"use client";

import { ArticleListFilters } from "@/app/article/_components/ArticleListFilters";
import { useArticlesFilters } from "@/hooks/useArticleFilter";
import { useGetAllArticles } from "@/utils/hooks/useGetAllArticles";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { ArticleNotFound } from "@/app/article/_components/ArticleNotFound";
import ArticleCard from "@/app/article/_components/ArticleCard";

export default function ArticlePage() {
	const { query } = useArticlesFilters();
	const { data } = useGetAllArticles({ query });

	return (
		<Box minH="100vh">
			<Container maxW="7xl" py={8}>
				<ArticleListFilters />

				<Box>
					<Text marginBottom="8">
						Found{" "}
						<Text as="span" fontWeight="bold">
							{data?.articles.length}
						</Text>{" "}
						articles
					</Text>

					{data?.articles.length !== 0 ? (
						<SimpleGrid column="1" gap={8}>
							{data?.articles?.map((article) => (
								<ArticleCard key={article.id} article={article} />
							))}
						</SimpleGrid>
					) : (
						<ArticleNotFound />
					)}
				</Box>
			</Container>
		</Box>
	);
}
