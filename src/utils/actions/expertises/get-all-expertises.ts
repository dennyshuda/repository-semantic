"use server";

import { IRI } from "@/utils/constant";
import { GetAllExpertisesResponse } from "@/utils/interfaces/expertises/get-all-expertises.types";
import { executeQuery } from "@/utils/sparql";

export interface Expertise {
	id: string;
	expertise: string;
}

export interface ExpertiseResponse {
	expertises: Expertise[];
}

export const getAllExpertises = async () => {
	const sparql = `
    PREFIX journal: ${IRI}

    SELECT ?id ?expertise
    WHERE {
        ?journal journal:expertiseId ?id;
        journal:expertiseName ?expertise.
    }
    `;

	const result = await executeQuery(sparql);
	const data = result.results.bindings.map((binding: GetAllExpertisesResponse) => ({
		id: binding.id.value,
		expertise: binding.expertise.value,
	}));

	return { expertises: data } as ExpertiseResponse;
};
