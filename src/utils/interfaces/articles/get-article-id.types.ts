export interface GetArticleByIdResponse {
	id: { type: string; value: string };
	title: { type: string; value: string };
	collaborators: { type: string; value: string };
	year: { type: string; value: string };
	publisher: { type: string; value: string };
	abstract: { type: string; value: string };
	keywords: { type: string; value: string };
	url: { type: string; value: string };
	doi: { type: string; value: string };
}
