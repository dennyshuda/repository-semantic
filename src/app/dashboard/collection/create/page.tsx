import { Box } from "@chakra-ui/react";
import CreateCollectionForm from "@/app/dashboard/collection/create/_components/CreateCollectionForm";
import { getSession } from "@/utils/actions/auth";

export default async function DashboardCreateCollectionPage() {
	const session = await getSession();

	return (
		<Box>
			<CreateCollectionForm authorId={session.authorId!} />
		</Box>
	);
}
