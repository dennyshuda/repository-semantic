export const parseArticles = (data: string) => {
	return data
		.split(",")
		.map((item) => item.trim())
		.filter((item) => item)
		.map((item) => {
			const [title, id, year] = item.split("|");
			return {
				title: title.trim(),
				id: id.trim(),
				year: parseInt(year.trim()),
			};
		})
		.sort((a, b) => b.year - a.year);
};

export const parseCollaborators = (data: string) => {
	return data
		.split(",")
		.map((item) => item.trim())
		.filter((item) => item)
		.map((item) => {
			const [collaboratorName, collaboratorId, collaboratorImage] = item.split("|");
			return {
				name: collaboratorName.trim(),
				id: collaboratorId.trim(),
				image: collaboratorImage.trim(),
			};
		});
};

export const parseCollaboratorsArticle = (data: string) => {
	return data
		.split(",")
		.map((item) => item.trim())
		.filter((item) => item)
		.map((item) => {
			const [collaboratorName, collaboratorId, collaboratorMajor, collaboratorImage] =
				item.split("|");
			return {
				name: collaboratorName.trim(),
				id: collaboratorId.trim(),
				department: collaboratorMajor.trim(),
				image: collaboratorImage.trim(),
			};
		});
};

export const parseAuthorArticle = (data: string) => {
	return data
		.split(",")
		.map((item) => item.trim())
		.filter((item) => item)
		.map((item) => {
			const [authorName, authorId] = item.split("|");
			return {
				name: authorName.trim(),
				id: authorId.trim(),
			};
		});
};
