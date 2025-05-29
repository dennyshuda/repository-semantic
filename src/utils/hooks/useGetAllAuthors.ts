import { useQuery } from "@tanstack/react-query";
import { getAllAuthors } from "../actions/authors/get-all-authors";

export const useGetAllAuthors = () => {
	return useQuery({ queryKey: ["posts"], queryFn: getAllAuthors });
};
