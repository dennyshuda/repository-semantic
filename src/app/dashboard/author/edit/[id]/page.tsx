import AuthorEditForm from "@/app/dashboard/author/edit/_components/AuthorEditForm";
import { getAuthorById } from "@/utils/actions/authors/get-author-id";
import { Box } from "@chakra-ui/react";

export default async function DashboardEditAuthorPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const data = await getAuthorById(id);

	return (
		<Box>
			<AuthorEditForm author={data.author} />
		</Box>
	);
}
