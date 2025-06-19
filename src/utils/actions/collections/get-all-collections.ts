import { IRI } from "@/utils/constant";
import { ArticleResponse } from "@/utils/interfaces/articles";
import { GetAllArticlesResponse } from "@/utils/interfaces/articles/get-all-articles.types";
import { executeQuery } from "@/utils/sparql";

export const getAllCollections = async (authorId?: string) => {
	const sparqlQuery = `
        PREFIX journal: ${IRI}
    
        SELECT 
        ?title 
        ?id 
        ?abstract 
        ?year
        ?publisher
        ?doi
        ?keywords
        ?url
        (GROUP_CONCAT(?articleAuthor; separator=", ") AS ?authors)
        (GROUP_CONCAT(?articleAuthorId; separator=", ") AS ?authorsId)
        WHERE {
        ?journal 
            journal:articleTitle ?title;
            journal:articleId ?id;
            journal:articleAbstract ?abstract;
            journal:articlePublisher ?publisher;
            journal:articleYear ?year;
            journal:articleDoi ?doi;
            journal:articleKeyword ?keywords;
            journal:articleUrl ?url;
            journal:isArticleOf ?author.
        ?author 
            journal:authorName ?articleAuthor;
            journal:authorId ?articleAuthorId.
        FILTER (?articleAuthorId = "${authorId}")
        }
        GROUP BY ?title ?id ?abstract ?year ?publisher ?doi ?keywords ?url
        `;

	const result = await executeQuery(sparqlQuery);

	console.log(result);

	const data = result.results.bindings.map((binding: GetAllArticlesResponse) => ({
		title: binding.title.value,
		id: binding.id.value,
		authors: binding.authors.value,
		publisher: binding.publisher.value,
		abstract: binding.abstract.value,
		doi: binding.doi.value,
		year: binding.year.value,
		url: binding.url.value,
		keywords: binding.keywords.value,
		authorId: binding.authorsId.value,
	}));

	return {
		articles: data,
	} as ArticleResponse;
};
