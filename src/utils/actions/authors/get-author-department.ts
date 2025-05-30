import { IRI } from "@/utils/constant";
import { AuthorResponse } from "@/utils/interfaces/authors";
import { GetAllAuthorsResponse } from "@/utils/interfaces/authors/get-all-authors.types";
import { executeQuery } from "@/utils/sparql";

export const getAuthorByDepartment = async (department: string) => {
	const sparqlQuery = `
    PREFIX journal: ${IRI}

    SELECT 
    ?name 
    ?id 
    ?nip 
    ?email
    ?image
    ?department
    (GROUP_CONCAT(DISTINCT ?expertiseName; separator=", ") AS ?expertises)
    WHERE {
    ?author 
        journal:authorName ?name ;
        journal:authorId ?id ;
        journal:authorNip ?nip ;
        journal:authorEmail ?email ;
        journal:authorImage ?image ;
        journal:hasMajor ?major ;
        journal:hasExpertise ?expertise .

    ?major
        journal:majorId ?department.

    ?expertise 
        journal:expertiseName ?expertiseName .

    FILTER (?department = "${department}")
    }
    GROUP BY ?name ?id ?nip ?email ?department ?image
`;

	const result = await executeQuery(sparqlQuery);

	const data = result.results.bindings.map((binding: GetAllAuthorsResponse) => ({
		name: binding.name.value,
		id: binding.id.value,
		email: binding.email.value,
		nip: binding.nip.value,
		image: binding.image.value,
		department: binding.department.value,
		expertises: binding.expertises.value.split(","),
	}));

	return { authors: data } as AuthorResponse;
};
