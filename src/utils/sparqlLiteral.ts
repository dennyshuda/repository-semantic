export function sparqlLiteral(input: string) {
	return input
		.replace(/\\/g, "\\\\") // escape backslash
		.replace(/"/g, '\\"') // escape double quote
		.replace(/\n/g, "\\n") // escape newlines
		.replace(/\r/g, "\\r"); // escape carriage return
}
