import { IRI } from "@/utils/constant";
import { AuthorResponse } from "@/utils/interfaces/authors";
import { GetAllAuthorsResponse } from "@/utils/interfaces/authors/get-all-authors.types";
import { executeQuery } from "@/utils/sparql";

interface GetAllAuthorsProps {
	name?: string;
	department?: string;
	expertise?: string;
}

export const getAllAuthors = async ({ name, department, expertise }: GetAllAuthorsProps) => {
	const sparqlQuery = `
    PREFIX journal: ${IRI}
    SELECT 
    ?name 
    ?id 
    ?nip 
    ?email 
    ?department 
    ?image 
    (GROUP_CONCAT(DISTINCT ?expertiseName; separator=", ") AS ?expertises)

    WHERE {
    ?author 
        journal:authorName ?name ;
        journal:authorNip ?nip ;
        journal:authorEmail ?email ;
        journal:authorId ?id ;
        journal:authorImage ?image ;
        journal:hasMajor ?major ;
        journal:hasExpertise ?expertise .
    ?major 
        journal:majorId ?department .
    ?expertise 
        journal:expertiseName ?expertiseName .

    FILTER (REGEX(STR(?name), "${name ? name : ""}", "i"))

    FILTER (REGEX(STR(?department), "${department ? department : ""}", "i"))

    ?author 
        journal:hasExpertise ?filteredExpertise .
    ?filteredExpertise 
        journal:expertiseName ?filteredExpertiseName .

    FILTER (REGEX(STR(?filteredExpertiseName), "${expertise ? expertise : ""}", "i"))
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
