import axios from "axios";
import { ENDPOINT } from "./constant";

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
		return error;
	}
};
