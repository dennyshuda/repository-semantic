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
		});
};

export const parseCollaborators = (data: string) => {
	return data
		.split(",")
		.map((item) => item.trim())
		.filter((item) => item)
		.map((item) => {
			const [collaboratorName, collaboratorId] = item.split("/");
			return {
				name: collaboratorName.trim(),
				id: collaboratorId.trim(),
			};
		});
};

export const parseCollaboratorsArticle = (data: string) => {
	return data
		.split(",")
		.map((item) => item.trim())
		.filter((item) => item)
		.map((item) => {
			const [collaboratorName, collaboratorId, collaboratorMajor] = item.split("/");
			return {
				name: collaboratorName.trim(),
				id: collaboratorId.trim(),
				department: collaboratorMajor.trim(),
			};
		});
};
