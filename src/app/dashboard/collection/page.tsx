import { getSession } from "@/utils/actions/auth";
import { Box } from "@chakra-ui/react";
import CollectionTable from "@/app/dashboard/collection/_components/CollectionTable";

export default async function CollectionPage() {
	const session = await getSession();

	return (
		<Box>
			<CollectionTable authorId={session?.username} />
		</Box>
	);
}
