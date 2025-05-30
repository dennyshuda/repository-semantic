import { IRI } from "@/utils/constant";
import { UseGetAllAuthorsProps } from "@/utils/hooks/useGetAllArticles";
import { ArticleResponse } from "@/utils/interfaces/articles";
import { GetAllArticlesResponse } from "@/utils/interfaces/articles/get-all-articles.types";
import { executeQuery } from "@/utils/sparql";

export const getAllArticles = async ({ query }: UseGetAllAuthorsProps) => {
	const sparqlQuery = `
    PREFIX journal: ${IRI}

    SELECT 
    ?title 
    ?id 
    ?abstract 
    ?year
    ?publisher
    (GROUP_CONCAT(?articleAuthor; separator=", ") AS ?authors)
    WHERE {
    ?journal 
        journal:articleTitle ?title;
        journal:articleId ?id;
        journal:articleAbstract ?abstract;
        journal:articlePublisher ?publisher;
        journal:articleYear ?year;
        journal:isArticleOf ?author.
    ?author 
        journal:authorName ?articleAuthor.
    FILTER (REGEX(STR(?title), "${query ? query : ""}", "i"))
    }
    GROUP BY ?title ?id ?abstract ?year ?publisher
    `;

	const result = await executeQuery(sparqlQuery);

	const data = result.results.bindings.map((binding: GetAllArticlesResponse) => ({
		title: binding.title.value,
		id: binding.id.value,
		authors: binding.authors.value,
		publisher: binding.publisher.value,
		abstract: binding.abstract.value,
		year: binding.year.value,
	}));

	return {
		articles: data,
	} as ArticleResponse;
};
