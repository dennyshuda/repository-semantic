import { IRI } from "@/utils/constant";
import { executeUpdate } from "@/utils/sparql";

interface DeleteArticleByIdProps {
	id: string;
}

export const deleteArticleById = async ({ id }: DeleteArticleByIdProps) => {
	const sparql = `
    PREFIX journal: ${IRI}

    DELETE WHERE {
        journal:${id} ?property ?value .
        
        ?author journal:hasArticle journal:${id} .
        journal:${id} journal:isArticleOf ?author .
    }`;

	const result = await executeUpdate(sparql);

	return result;
};
