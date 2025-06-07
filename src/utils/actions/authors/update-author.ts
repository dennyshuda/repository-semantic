import { Author } from "@/utils/interfaces/authors";
import { executeUpdate } from "@/utils/sparql";

export const updateAuthor = async (author: Author) => {
	const sparql = `
    DELETE { journal:${author.id} ?p ?o }

    INSERT {
        journal:${author.id} rdf:type journal:Author;
        journal:authorId "${author.id}";
        journal:authorName "${author.name}";
        journal:authorImage  "${author.image}";
        journal:authorNip ${author.nip};
        journal:authorEmail  "${author.email}".

        journal:${author.id} journal:hasMajor journal:${author.department}.
		journal:${author.department} journal:isMajorOf journal:${author.id}.

        ${author.expertises
					.map((id: string) => `journal:${author.id} journal:hasExpertise journal:${id} .`)
					.join("\n")}

        ${author.expertises
					.map((id: string) => `journal:${id} journal:isExpertiseOf journal:${author.id} .`)
					.join("\n")}   
    }

    WHERE  { 
        journal:${author.id} ?p ?o . 
    }
        
    `;
	const result = await executeUpdate(sparql);

	return result;
};
