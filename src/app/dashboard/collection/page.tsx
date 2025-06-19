import { getSession } from "@/utils/actions/auth";
import { Box } from "@chakra-ui/react";
import CollectionHeader from "./_components/CollectionHeader";
import CollectionTable from "./_components/CollectionTable";

export default async function CollectionPage() {
	const session = await getSession();

	return (
		<Box>
			<CollectionHeader />
			<CollectionTable authorId={session?.username} />
		</Box>
	);
}
