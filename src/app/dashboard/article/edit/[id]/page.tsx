import EditForm from "@/app/dashboard/article/edit/_components/EditForm";
import { getArticleById } from "@/utils/actions/articles/get-article-id";
import { Box, Heading } from "@chakra-ui/react";

export default async function DashboardEditArticlePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const data = await getArticleById(id);

	return (
		<Box>
			<Heading size="lg" mb={6}>
				Edit Article {id}
			</Heading>

			<EditForm article={data.article} />
		</Box>
	);
}
