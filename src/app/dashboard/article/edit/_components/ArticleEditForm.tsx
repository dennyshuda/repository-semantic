"use client";

import { ENDPOINT_UPDATE, IRI } from "@/utils/constant";
import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import { EditFormProps } from "@/utils/interfaces/dashboard/articles.types";
import {
	Box,
	Button,
	createListCollection,
	Field,
	HStack,
	Input,
	Portal,
	Select,
	Separator,
	SimpleGrid,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

export interface EditArticleFormValues {
	title: string;
	abstract: string;
	publisher: string;
	url: string;
	doi: string;
	year: number;
	keywords: string;
	authorId: string[];
}

export default function ArticleEditForm({ article }: EditFormProps) {
	const router = useRouter();
	const { data } = useGetAllAuthors({ department: "", expertise: "", name: "" });

	const collection = useMemo(() => {
		return createListCollection({
			items: data?.authors ?? [],
			itemToString: (author) => author.name,
			itemToValue: (author) => author.id,
		});
	}, [data?.authors]);

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: {},
	} = useForm<EditArticleFormValues>({
		defaultValues: {
			title: article.title,
			year: Number(article.year),
			authorId: article.collaborators.map((a) => a.id),
			url: article.url,
			doi: article.doi,
			publisher: article.publisher,
			keywords: article.keywords,
			abstract: article.abstract,
		},
	});

	const onSubmit = async (data: EditArticleFormValues) => {
		console.log(data);

		const sparqlQuery = `
        PREFIX journal: ${IRI}
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        DELETE {
            journal:${article.id} ?p ?o .
            ?author journal:hasArticle journal:${article.id} .
            journal:${article.id} journal:isArticleOf ?author .
        }
        INSERT {
            journal:${article.id} rdf:type journal:Publication;
            journal:articleId "${article.id}";
            journal:articleTitle "${data.title}";
            journal:articleAbstract "${data.abstract}";
            journal:articleYear ${data.year};
            journal:articleUrl "${data.url}";
            journal:articleDoi "${data.doi}";
            journal:articlePublisher "${data.publisher}";
            journal:articleKeyword "${data.keywords}".

            ${data.authorId
							.map((id: string) => `journal:${article.id} journal:isArticleOf journal:${id} .`)
							.join("\n")}
            ${data.authorId
							.map((id: string) => `journal:${id} journal:hasArticle journal:${article.id} .`)
							.join("\n")}
        }
        WHERE {
            journal:${article.id} ?p ?o .
            OPTIONAL { ?author journal:hasArticle journal:${article.id} . }
            OPTIONAL { journal:${article.id} journal:isArticleOf ?author . }
        }
        `;

		try {
			const response = await axios.post(ENDPOINT_UPDATE, sparqlQuery, {
				headers: {
					"Content-Type": "application/sparql-update",
					Accept: "application/json",
				},
			});
			router.push("/dashboard/article");
			return response;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			console.log(error);
			throw new Error("error", error);
		} finally {
			reset({
				authorId: [],
			});
		}
	};

	return (
		<Box p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px">
			<form onSubmit={handleSubmit(onSubmit)}>
				<VStack gap={6} align="stretch">
					<Field.Root>
						<Field.Label>Title </Field.Label>
						<Input placeholder="Enter title" {...register("title")} />
					</Field.Root>

					<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
						<Field.Root>
							<Field.Label>Year</Field.Label>
							<Input placeholder="Enter year" type="number" {...register("year")} />
						</Field.Root>
						<Field.Root>
							<Field.Label>Authors</Field.Label>
							<Controller
								control={control}
								name="authorId"
								render={({ field }) => (
									<Select.Root
										multiple
										name={field.name}
										value={field.value}
										onValueChange={({ value }) => field.onChange(value)}
										onInteractOutside={() => field.onBlur()}
										collection={collection}
									>
										<Select.HiddenSelect />
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="Select authors" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content>
													{collection.items.map((item) => (
														<Select.Item item={item} key={item.id}>
															{item.name}
															<Select.ItemIndicator />
														</Select.Item>
													))}
												</Select.Content>
											</Select.Positioner>
										</Portal>
									</Select.Root>
								)}
							/>
						</Field.Root>
					</SimpleGrid>

					<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
						<Field.Root>
							<Field.Label>URL</Field.Label>
							<Input placeholder="Enter URL" {...register("url")} />
						</Field.Root>

						<Field.Root>
							<Field.Label>DOI</Field.Label>
							<Input placeholder="Enter DOI" {...register("doi")} />
						</Field.Root>
					</SimpleGrid>

					<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
						<Field.Root>
							<Field.Label>Publisher</Field.Label>
							<Input placeholder="Enter Publisher" {...register("publisher")} />
						</Field.Root>

						<Field.Root>
							<Field.Label>Keywords</Field.Label>
							<Input placeholder="Enter Keywords" {...register("keywords")} />
						</Field.Root>
					</SimpleGrid>

					<Field.Root>
						<Field.Label>Abstract</Field.Label>
						<Separator />
						<Textarea size="xl" placeholder="abstract" autoresize {...register("abstract")} />
					</Field.Root>

					<HStack justify="flex-end" gap={4} pt={4}>
						<Button variant="outline">Cancel</Button>
						<Button type="submit" colorScheme="primary" loadingText="Adding...">
							Update Article
						</Button>
					</HStack>
				</VStack>
			</form>
		</Box>
	);
}
