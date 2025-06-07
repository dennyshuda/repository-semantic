"use client";

import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import {
	Box,
	Button,
	createListCollection,
	Field,
	Heading,
	HStack,
	Input,
	Portal,
	Select,
	SimpleGrid,
	Textarea,
	VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { ENDPOINT_UPDATE, IRI } from "@/utils/constant";
import axios from "axios";

export interface CreateArticleFormValues {
	title: string;
	abstract: string;
	publisher: string;
	url: string;
	doi: string;
	year: number;
	keywords: string;
	authorId: string[];
}

export default function DashboardCreateArticlePage() {
	const { register, control, reset, handleSubmit } = useForm<CreateArticleFormValues>();

	const onSubmit = async (data: CreateArticleFormValues) => {
		console.log(data);

		const articleId = uuidv4();

		const sparqlQuery = `
        PREFIX journal: ${IRI}
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

        INSERT DATA {
            journal:${articleId} rdf:type journal:Publication;
            journal:articleId "${articleId}";
            journal:articleTitle "${data.title}";
            journal:articleAbstract "${data.abstract}";
            journal:articleYear ${data.year};
            journal:articleUrl "${data.url}";
            journal:articleDoi  "${data.doi}";
            journal:articlePublisher "${data.publisher}";
            journal:articleKeyword "${data.keywords}".

            ${data.authorId
							.map((id: string) => `journal:${articleId} journal:isArticleOf journal:${id} .`)
							.join("\n")}

            ${data.authorId
							.map((id: string) => `journal:${id} journal:hasArticle journal:${articleId} .`)
							.join("\n")}
        }`;

		try {
			const response = await axios.post(ENDPOINT_UPDATE, sparqlQuery, {
				headers: {
					"Content-Type": "application/sparql-update",
					Accept: "application/json",
				},
			});

			console.log(response);
			return response.status;
		} catch (error) {
			return error;
		} finally {
			reset({
				authorId: [],
			});
		}
	};

	const { data } = useGetAllAuthors({ department: "", expertise: "", name: "" });

	const collection = useMemo(() => {
		return createListCollection({
			items: data?.authors ?? [],
			itemToString: (author) => author.name,
			itemToValue: (author) => author.id,
		});
	}, [data?.authors]);

	return (
		<Box>
			<Heading size="lg" mb={6}>
				Add New Article
			</Heading>

			<Box p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px">
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack gap={6} align="stretch">
						<Field.Root required>
							<Field.Label>
								Title <Field.RequiredIndicator />
							</Field.Label>
							<Input placeholder="Enter title" {...register("title")} />
						</Field.Root>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root required>
								<Field.Label>
									Year <Field.RequiredIndicator />
								</Field.Label>
								<Input placeholder="Enter year" type="number" {...register("year")} />
							</Field.Root>
							<Field.Root>
								<Field.Label>Authors</Field.Label>
								<Controller
									control={control}
									name="authorId"
									render={({ field }) => (
										<Select.Root
											required
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
													<Select.ValueText placeholder="Select departments" />
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
							<Field.Root required>
								<Field.Label>
									URL <Field.RequiredIndicator />
								</Field.Label>
								<Input placeholder="Enter URL" {...register("url")} />
							</Field.Root>

							<Field.Root required>
								<Field.Label>
									DOI <Field.RequiredIndicator />
								</Field.Label>
								<Input placeholder="Enter DOI" {...register("doi")} />
							</Field.Root>
						</SimpleGrid>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root required>
								<Field.Label>
									Publisher <Field.RequiredIndicator />
								</Field.Label>
								<Input placeholder="Enter Publisher" {...register("publisher")} />
							</Field.Root>

							<Field.Root required>
								<Field.Label>
									Keywords <Field.RequiredIndicator />
								</Field.Label>
								<Input placeholder="Enter Keywords" {...register("keywords")} />
								<Field.HelperText>Example: Data Mining, Programming, etc..</Field.HelperText>
							</Field.Root>
						</SimpleGrid>

						<Field.Root required>
							<Field.Label>Abstract</Field.Label>
							<Textarea size="xl" placeholder="abstract" autoresize {...register("abstract")} />
						</Field.Root>

						<HStack justify="flex-end" gap={4} pt={4}>
							<Button variant="outline">Cancel</Button>
							<Button type="submit" colorScheme="primary" loadingText="Adding...">
								Add Article
							</Button>
						</HStack>
					</VStack>
				</form>
			</Box>
		</Box>
	);
}

// "
//         PREFIX journal: <http://www.if.upnjatim.ac.id/ontologies/2025/faculty#>
//         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

//         INSERT DATA {
//             journal:360b1aef-22f0-45e3-a4c4-c6c9bfe4cfb1 rdf:type journal:Publication;
//             journal:articleId "360b1aef-22f0-45e3-a4c4-c6c9bfe4cfb1";
//             journal:articleTitle "Eum id minus exerci";
//             journal:articleAbstract "undefined";
//             journal:articleYear 2015;
//             journal:articleUrl "example.com";
//             journal:articleDoi  "In duis sint dolori";
//             journal:articlePublisher "Est fugiat pariatur";
//             journal:articleKeyword "Data, Diti , Dutu".

//             journal:360b1aef-22f0-45e3-a4c4-c6c9bfe4cfb1 journal:isArticleOf journal:fawwaz_ali_akbar .
// journal:360b1aef-22f0-45e3-a4c4-c6c9bfe4cfb1 journal:isArticleOf journal:mohamad_irwan_afandi .

//             journal:fawwaz_ali_akbar journal:hasArticle journal:360b1aef-22f0-45e3-a4c4-c6c9bfe4cfb1 .
// journal:mohamad_irwan_afandi journal:hasArticle journal:360b1aef-22f0-45e3-a4c4-c6c9bfe4cfb1 .
//         }"
