import { IRI } from "@/utils/constant";
import { parseCollaboratorsArticle } from "@/utils/parse";
import { executeQuery } from "@/utils/sparql";

export const getArticleById = async (id: string) => {
	const sparqlQuery = `
    PREFIX journal: ${IRI}

    SELECT 
    ?id 
    ?title 
    ?year 
    ?abstract 
    ?url 
    ?doi 
    ?keywords 
    ?publisher
    (GROUP_CONCAT(DISTINCT CONCAT(?collaboratorName, "/", STR(?collaboratorId), "/", ?collaboratorMajor); separator=", ") AS ?collaborators)
    WHERE {
    ?article 
        journal:isArticleOf ?author ;
        journal:articleTitle ?title ;
        journal:articleId ?id ;
        journal:articleYear ?year;
        journal:articleAbstract ?abstract;
        journal:articleDoi ?doi;
        journal:articleKeyword ?keywords;
        journal:articlePublisher ?publisher;
        journal:articleUrl ?url.

    ?article 
        journal:isArticleOf ?collaborator .
    ?collaborator 
        journal:authorName ?collaboratorName ;
        journal:authorId ?collaboratorId;
        journal:hasMajor ?major.

    ?major 
        journal:majorName ?collaboratorMajor.

    FILTER (?id = "${id}")
    }
    GROUP BY ?id ?title ?year ?abstract ?url ?doi ?keywords ?publisher
    `;

	const result = await executeQuery(sparqlQuery);

	const binding = result.results.bindings[0];

	const parsedCollaborators = parseCollaboratorsArticle(binding.collaborators.value);

	return {
		article: {
			id: binding.id.value,
			title: binding.title.value,
			collaborators: parsedCollaborators,
			year: binding.year.value,
			publisher: binding.publisher.value,
			abstract: binding.abstract.value,
			keywords: binding.keywords.value,
			url: binding.url.value,
			doi: binding.doi.value,
		},
	};
};
