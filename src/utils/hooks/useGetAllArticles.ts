import { useQuery } from "@tanstack/react-query";
import { getAllArticles } from "../actions/articles/get-all-articles";

export interface UseGetAllAuthorsProps {
	query?: string;
}

export const useGetAllArticles = ({ query }: UseGetAllAuthorsProps) => {
	return useQuery({
		queryKey: ["articles", query],
		queryFn: () => getAllArticles({ query }),
	});
};
