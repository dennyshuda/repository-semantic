"use client";

import { Toaster, toaster } from "@/components/ui/toaster";
import { ENDPOINT_UPDATE, IRI } from "@/utils/constant";
import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import {
	Button,
	Card,
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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface CreateCollectionFormProps {
	authorId: string;
}

export interface CreateCollectionFormValues {
	title: string;
	abstract: string;
	publisher: string;
	url: string;
	doi: string;
	year: number;
	keywords: string;
	authorId: string[];
}
export default function CreateCollectionForm({ authorId }: CreateCollectionFormProps) {
	const { register, control, reset, handleSubmit } = useForm<CreateCollectionFormValues>();

	const router = useRouter();

	const onSubmit = async (data: CreateCollectionFormValues) => {
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
				auth: {
					username: "admin",
					password: "admin",
				},
			});

			toaster.create({
				title: "Successfully created",
				type: "success",
			});
			setTimeout(() => {
				router.push("/dashboard/collection");
			}, 2000);
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
		<Card.Root>
			<Toaster />
			<Card.Header>
				<Heading size="lg">Create New Article</Heading>
			</Card.Header>

			<Card.Body>
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
											defaultValue={[authorId]}
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
							<Field.Label>
								Abstract <Field.RequiredIndicator />
							</Field.Label>
							<Textarea size="xl" placeholder="abstract" autoresize {...register("abstract")} />
						</Field.Root>

						<HStack justify="flex-end" gap={4} pt={4}>
							<Button variant="outline">Cancel</Button>
							<Button type="submit" loadingText="Adding...">
								Create Article
							</Button>
						</HStack>
					</VStack>
				</form>
			</Card.Body>
		</Card.Root>
	);
}
