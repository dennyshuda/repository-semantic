export interface Article {
	id: string;
	title: string;
	abstract: string;
	year: string;
	authors: string;
	publisher: string;
}

export interface ArticleResponse {
	articles: Article[];
}
