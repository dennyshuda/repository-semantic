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
    (GROUP_CONCAT(DISTINCT ?expertiseName; separator=", ") AS ?expertises)
    (GROUP_CONCAT(DISTINCT CONCAT(?collaboratorName, "/", STR(?collaboratorId)); separator=", ") AS ?collaborators)
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
        journal:majorName ?department.

    ?expertise 
        journal:expertiseName ?expertiseName .

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
        journal:authorId ?collaboratorId .
        FILTER (?id != ?collaboratorId)
    }

    FILTER (?id = "${id}")
    }
    GROUP BY ?name ?id ?nip ?email ?department ?image
`;

	const result = await executeQuery(sparqlQuery);
	const binding = result.results.bindings[0];

	console.log(binding);

	const parsedArticles = binding.articles?.value ? parseArticles(binding.articles.value) : [];

	const parsedCollaborators = binding.collaborators?.value
		? parseCollaborators(binding.collaborators.value)
		: [];

	return {
		author: {
			name: binding.name.value,
			id: binding.id.value,
			nip: binding.nip.value,
			department: binding.department.value,
			email: binding.email.value,
			expertises: binding.expertises.value.split(", "),
			articles: parsedArticles,
			collaborators: parsedCollaborators,
		},
	};
};
