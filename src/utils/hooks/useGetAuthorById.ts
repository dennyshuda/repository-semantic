import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "../actions/authors/get-author-id";

export const useGetAuthorById = (id: string) => {
	return useQuery({
		queryKey: ["author", id],
	queryFn: () => getAuthorById(id),
	});
};
