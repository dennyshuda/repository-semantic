import { useQuery } from "@tanstack/react-query";
import { getAllExpertises } from "../actions/expertises/get-all-expertises";

export const useGetAllExpertises = () => {
	return useQuery({
		queryKey: ["expertises"],
		queryFn: () => getAllExpertises(),
	});
};
