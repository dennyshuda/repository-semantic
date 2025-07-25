import { getSession } from "@/utils/actions/auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const session = await getSession();

	if (path.startsWith("/dashboard")) {
		if (!session.isLoggedIn) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		if (path.startsWith("/dashboard/article") && session.role !== "admin") {
			return NextResponse.redirect(new URL("/forbidden", request.url));
		}

		if (path.startsWith("/dashboard/user") && session.role !== "admin") {
			return NextResponse.redirect(new URL("/forbidden", request.url));
		}

		if (path.startsWith("/dashboard/author") && session.role !== "admin") {
			return NextResponse.redirect(new URL("/forbidden", request.url));
		}

		if (path.startsWith("/dashboard/collection") && session.role !== "author") {
			return NextResponse.redirect(new URL("/forbidden", request.url));
		}
	}

	return NextResponse.next();
}
