import axios from "axios";

export const getAllAuthors = async () => {
	const sparqlQuery = `
    PREFIX journal: <http://www.if.upnjatim.ac.id/ontologies/2025/faculty#>
    SELECT ?authorName ?authorId ?authorNip ?authorEmail ?majorName ?authorImage (GROUP_CONCAT(DISTINCT ?expertiseName; separator=", ") AS ?expertiseList)

    WHERE {
    ?author 
    journal:authorName ?authorName ;
    journal:authorNip ?authorNip ;
    journal:authorEmail ?authorEmail ;
    journal:authorId ?authorId ;
    journal:authorImage ?authorImage ;
    journal:hasMajor ?major ;
    journal:hasExpertise ?expertise .
    ?major 
    journal:majorName ?majorName .
    ?expertise 
    journal:expertiseName ?expertiseName .

    FILTER (REGEX(STR(?authorName), "", "i"))

    FILTER (REGEX(STR(?majorName), "", "i"))

    ?author journal:hasExpertise ?filteredExpertise .
    ?filteredExpertise journal:expertiseName ?filteredExpertiseName .
    FILTER (REGEX(STR(?filteredExpertiseName), "", "i"))
    }
    GROUP BY ?authorName ?authorId ?authorNip ?authorEmail ?majorName ?authorImage
    `;

	try {
		const response = await axios.post("http://localhost:3030/faculty/sparql", sparqlQuery, {
			headers: {
				"Content-Type": "application/sparql-query",
				Accept: "application/sparql-results+json",
			},
		});

		return {
			data: response.data,
			status: response.status,
		};
	} catch (error) {
		return error;
	}
};
