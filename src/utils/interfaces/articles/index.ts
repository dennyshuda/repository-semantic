export interface Article {
	id: string;
	title: string;
	abstract: string;
	year: string;
	authors: string;
	publisher: string;
	doi: string;
}

export interface ArticleResponse {
	articles: Article[];
}
