import { getSession } from "@/utils/actions/auth";
import { NextRequest, NextResponse } from "next/server";

const adminRoutes = ["/dashboard", "/dashboard/article", "/dashboard/author"];
const authorRoutes = ["/dashboard/collection", "/dashboard/collection/create"];

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isAdminRoute = adminRoutes.includes(path);
	const isAuthorRoute = authorRoutes.includes(path);

	const session = await getSession();

	if (isAdminRoute && !session.isLoggedIn) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (isAuthorRoute && session.role !== "author") {
		return NextResponse.redirect(new URL("/dashboard", req.url));
	}

	return NextResponse.next();
}
