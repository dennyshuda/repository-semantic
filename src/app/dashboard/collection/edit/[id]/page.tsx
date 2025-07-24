import { getArticleById } from "@/utils/actions/articles/get-article-id";
import CollectionEditForm from "../_components/CollectionEditForm";

export default async function DashboardEditCollectionPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const data = await getArticleById(id);

	return <CollectionEditForm article={data.article} />;
}
