import { getSession } from "@/utils/actions/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await getSession();

	if (session.role === "author") {
		redirect("/dashboard/collection");
	}

	return <div>Dashboard</div>;
}
