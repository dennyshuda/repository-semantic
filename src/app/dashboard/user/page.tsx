import { Box } from "@chakra-ui/react";
import UserTable from "./_components/UserTable";
import { getUsers } from "./action";

export default async function DashboardUserPage() {
	const users = await getUsers();

	return (
		<Box>
			<UserTable users={users} />
		</Box>
	);
}
