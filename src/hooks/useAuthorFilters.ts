import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export interface AuthorFilters {
	name?: string;
	department?: string;
	expertise?: string;
}

export function useAuthorFilters() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const name = searchParams.get("name") as AuthorFilters["name"];
	const expertise = searchParams.get("expertise") as AuthorFilters["expertise"];
	const department = searchParams.get("department") as AuthorFilters["department"];

	const setFilters = useCallback(
		(filter: AuthorFilters) => {
			const params = new URLSearchParams(searchParams.toString());
			if (filter.name) {
				params.set("name", filter.name);
			} else {
				params.delete("name");
			}

			if (filter.expertise) {
				params.set("expertise", filter.expertise);
			}

			if (filter.department) {
				params.set("department", filter.department);
			}

			return params;
		},
		[searchParams]
	);

	const clearFilter = () => {
		const params = new URLSearchParams(searchParams.toString());
		console.log(searchParams.toString());
		params.delete("name");
		params.delete("department");
		params.delete("expertise");
		router.push(`?${params.toString()}`);
	};

	return {
		name,
		expertise,
		department,
		setFilters,
		clearFilter,
	};
}
