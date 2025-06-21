import { Box } from "@chakra-ui/react";
import UserHeader from "./_components/UserHeader";
import UserTable from "./_components/UserTable";
import { getUsers } from "./action";

export default async function DashboardUserPage() {
	const users = await getUsers();

	return (
		<Box>
			<UserHeader />
			<UserTable users={users} />
		</Box>
	);
}
