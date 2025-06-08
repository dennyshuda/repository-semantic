import { getAuthorById } from "@/utils/actions/authors/get-author-id";
import { Box, Heading } from "@chakra-ui/react";
import AuthorEditForm from "@/app/dashboard/author/edit/_components/AuthorEditForm";

export default async function DashboardEditAuthorPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const data = await getAuthorById(id);

	return (
		<Box>
			<Heading size="lg" mb={6}>
				Edit Author {id}
			</Heading>

			<AuthorEditForm author={data.author} />
		</Box>
	);
}
