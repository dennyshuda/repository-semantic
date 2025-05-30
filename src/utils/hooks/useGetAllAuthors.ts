import { useQuery } from "@tanstack/react-query";
import { getAllAuthors } from "../actions/authors/get-all-authors";

interface UseGetAllAuthorsProps {
	name?: string;
	department?: string;
	expertise?: string;
}

export const useGetAllAuthors = ({ name, department, expertise }: UseGetAllAuthorsProps) => {
	return useQuery({
		queryKey: ["authors", name, department, expertise],
		queryFn: () => getAllAuthors({ name, department, expertise }),
	});
};
