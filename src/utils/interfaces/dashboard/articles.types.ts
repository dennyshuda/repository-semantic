interface Collaborator {
	name: string;
	id: string;
	department: string;
	image: string;
}

interface Article {
	id: string;
	title: string;
	collaborators: Collaborator[];
	doi: string;
	keywords: string;
	publisher: string;
	year: string;
	abstract: string;
	url: string;
}

export interface EditFormProps {
	article: Article;
}
