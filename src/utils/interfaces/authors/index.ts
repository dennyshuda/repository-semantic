export interface Author {
	id: string;
	name: string;
	email: string;
	image: string;
	nip: string;
	expertises: string[];
	department: string;
}

export interface AuthorResponse {
	authors: Author[];
}
