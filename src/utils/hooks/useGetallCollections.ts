import { useQuery } from "@tanstack/react-query";
import { getAllCollections } from "../actions/collections/get-all-collections";

export const useGetAllCollections = (authorId?: string) => {
	return useQuery({
		queryKey: ["collections", authorId],
		queryFn: () => getAllCollections(authorId),
	});
};
