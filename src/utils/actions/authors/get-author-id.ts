import { IRI } from "@/utils/constant";
import { parseArticles, parseCollaborators } from "@/utils/parse";
import { executeQuery } from "@/utils/sparql";

export const getAuthorById = async (id: string) => {
	const sparqlQuery = `
    PREFIX journal: ${IRI}

    SELECT 
    ?name 
    ?id 
    ?nip 
    ?email
    ?image
    ?department
    (GROUP_CONCAT(DISTINCT CONCAT(?articleTitle, "|", STR(?articleId), "|", STR(?articleYear)); separator=", ") AS ?articles)
    (GROUP_CONCAT(DISTINCT ?expertiseName; separator=",") AS ?expertises)
    (GROUP_CONCAT(DISTINCT ?expertiseId; separator=",") AS ?expertisesId)
    (GROUP_CONCAT(DISTINCT ?departmentId; separator=", ") AS ?departmentsId)
    (GROUP_CONCAT(DISTINCT CONCAT(?collaboratorName, "|", STR(?collaboratorId), "|", STR(?collaboratorImage) ); separator=", ") AS ?collaborators)
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
        journal:majorName ?department;
        journal:majorId ?departmentId.

    ?expertise 
        journal:expertiseName ?expertiseName ;
        journal:expertiseId ?expertiseId .

    OPTIONAL {
    ?author 
        journal:hasArticle ?article .
    ?article 
        journal:articleTitle ?articleTitle ;
        journal:articleId ?articleId ;
        journal:articleYear ?articleYear .

    ?article 
        journal:isArticleOf ?collaborator .
    ?collaborator 
        journal:authorName ?collaboratorName ;
        journal:authorImage ?collaboratorImage;
        journal:authorId ?collaboratorId .
        # FILTER (?id != ?collaboratorId)
    }

    FILTER (?id = "${id}")
    }
    GROUP BY ?name ?id ?nip ?email ?department ?image
`;

	const result = await executeQuery(sparqlQuery);
	const binding = result.results.bindings[0];
	console.log(binding);

	const parsedArticles = binding?.articles?.value ? parseArticles(binding.articles.value) : [];

	const parsedCollaborators = binding?.collaborators?.value
		? parseCollaborators(binding.collaborators.value)
		: [];

	return {
		author: {
			name: binding?.name.value,
			id: binding?.id.value,
			image: binding?.image.value,
			nip: binding?.nip.value,
			department: binding?.department.value,
			email: binding?.email.value,
			expertises: binding?.expertises.value.split(","),
			expertisesId: binding?.expertisesId.value.split(","),
			departmentId: binding?.departmentsId.value,
			articles: parsedArticles,
			collaborators: parsedCollaborators,
		},
	};
};
