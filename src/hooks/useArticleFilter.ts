import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface ArticleFilters {
	query?: string;
}

export function useArticlesFilters() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const query = searchParams.get("query") as ArticleFilters["query"];

	const setFilters = useCallback(
		(filter: ArticleFilters) => {
			const params = new URLSearchParams(searchParams.toString());
			if (filter.query) {
				params.set("query", filter.query);
			} else {
				params.delete("query");
				router.push(`?${params.toString()}`);
			}

			return params;
		},
		[searchParams, router]
	);

	return {
		query,
		setFilters,
	};
}
