export interface GetAuthorByIdResponse {
	name: string;
	id: string;
	nip: string;
	email: string;
	department: string;
	expertises: string[];
	articles: string | undefined;
	collaborators: string | undefined;
}
