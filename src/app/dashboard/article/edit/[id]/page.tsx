import ArticleEditForm from "@/app/dashboard/article/edit/_components/ArticleEditForm";
import { getArticleById } from "@/utils/actions/articles/get-article-id";

export default async function DashboardEditArticlePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const data = await getArticleById(id);

	return <ArticleEditForm article={data.article} />;
}
