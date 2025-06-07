import axios from "axios";
import { ENDPOINT, ENDPOINT_UPDATE } from "./constant";

export const executeQuery = async (sparql: string) => {
	try {
		const response = await axios.post(ENDPOINT, sparql, {
			headers: {
				"Content-Type": "application/sparql-query",
				Accept: "application/sparql-results+json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
};

export const executeUpdate = async (sparql: string) => {
	try {
		const response = await axios.post(ENDPOINT_UPDATE, sparql, {
			headers: {
				"Content-Type": "application/sparql-update",
				Accept: "application/json",
			},
		});

		console.log(response);
		return response.status;
	} catch (error) {
		throw new Error(`SPARQL update failed: ${error}`);
	}
};
