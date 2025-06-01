import { IRI } from "@/utils/constant";
import { executeUpdate } from "@/utils/sparql";

export const deleteAuthorById = async ({ id }: { id: string }) => {
	const sparql = `
    PREFIX journal: ${IRI}
    DELETE WHERE {
        journal:${id} ?property ?value .
    }`;

	console.log(id);

	const result = await executeUpdate(sparql);

	return result;
};
