"use client";

import { ENDPOINT_UPDATE, IRI } from "@/utils/constant";
import { useGetAllExpertises } from "@/utils/hooks/useGetAllExpertises";
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
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";

export interface EditAuthorFormValues {
	name: string;
	email: string;
	nip: number;
	image: string;
	departmentId: string[];
	expertisesId: string[];
}

interface Author {
	id: string;
	name: string;
	nip: string;
	image: string;
	email: string;
	department: string;
	departmentId: string;
	expertises: string[];
	expertisesId: string[];
	articles: {
		id: string;
	}[];
}

interface AuthorEditFormProps {
	author: Author;
}

export default function AuthorEditForm({ author }: AuthorEditFormProps) {
	console.log(author);

	const router = useRouter();
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: {},
	} = useForm<EditAuthorFormValues>({
		defaultValues: {
			name: author.name,
			nip: Number(author.nip),
			image: author.image,
			email: author.email,
			departmentId: [author.departmentId],
			expertisesId: author.expertisesId,
		},
	});

	const onSubmit = async (data: EditAuthorFormValues) => {
		const sparqlQuery = `
        PREFIX journal: ${IRI}
        PREFIX rdf: <http:www.w3.org/1999/02/22-rdf-syntax-ns#>

        DELETE { 
        journal:${author.id} ?p ?o.
        ?author journal:hasArticle journal:${author.id} .
        journal:${author.id} journal:isArticleOf ?author .
        }

        INSERT {
        journal:${author.id} rdf:type journal:Author;
        journal:authorId "${author.id}";
        journal:authorName "${data.name}";
        journal:authorImage  "${data.image}";
        journal:authorNip ${data.nip};
        journal:authorEmail  "${data.email}".

        journal:${author.id} journal:hasMajor journal:${data.departmentId[0]}.
        journal:${data.departmentId[0]} journal:isMajorOf journal:${author.id}.

        ${data.expertisesId
					.map((id: string) => `journal:${author.id} journal:hasExpertise journal:${id} .`)
					.join("\n")}

        ${data.expertisesId
					.map((id: string) => `journal:${id} journal:isExpertiseOf journal:${author.id} .`)
					.join("\n")}

        ${author.articles
					.map((a) => `journal:${a.id} journal:isArticleOf journal:${author.id} .`)
					.join("\n")}

        ${author.articles
					.map((a) => `journal:${author.id} journal:hasArticle journal:${a.id} .`)
					.join("\n")}
        }

        WHERE  {
        journal:${author.id} ?p ?o .
        OPTIONAL { ?author journal:hasArticle journal:${author.id} . }
        OPTIONAL { journal:${author.id} journal:isArticleOf ?author . }
        }
		`;

		try {
			const response = await axios.post(ENDPOINT_UPDATE, sparqlQuery, {
				headers: {
					"Content-Type": "application/sparql-update",
					Accept: "application/json",
				},
			});

			console.log(response);
			reset();
			router.push("/dashboard/author");
			return response.status;
		} catch (error) {
			console.log(error);
			return error;
		} finally {
			reset();
		}
	};

	const departmentList = createListCollection({
		items: [
			{ label: "Informatika", value: "informatika" },
			{ label: "Sistem Informasi", value: "sistem_informasi" },
			{ label: "Data Sains", value: "sains_data" },
			{ label: "Bisnis Digital", value: "bisnis_digital" },
		],
	});

	const { data } = useGetAllExpertises();

	const expertiseList = useMemo(() => {
		return createListCollection({
			items: data?.expertises ?? [],
			itemToString: (expertise) => expertise.expertise,
			itemToValue: (expertise) => expertise.id,
		});
	}, [data?.expertises]);

	return (
		<Card.Root>
			<Card.Header>
				<Heading size="lg">EDIT AUTHOR</Heading>
			</Card.Header>

			<Card.Body>
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack gap={6} align="stretch">
						<Field.Root>
							<Field.Label>Full Name</Field.Label>
							<Input placeholder="Enter author's full name" {...register("name")} />
						</Field.Root>

						<Field.Root>
							<Field.Label>Photo (URL)</Field.Label>
							<Input placeholder="Enter photo's" {...register("image")} />
						</Field.Root>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root>
								<Field.Label>Email</Field.Label>
								<Input type="email" placeholder="Enter author's email" {...register("email")} />
							</Field.Root>

							<Field.Root>
								<Field.Label>Nip</Field.Label>
								<Input type="number" placeholder="Enter author's nip" {...register("nip")} />
							</Field.Root>
						</SimpleGrid>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root>
								<Field.Label>Department</Field.Label>
								<Controller
									control={control}
									name="departmentId"
									render={({ field }) => (
										<Select.Root
											name={field.name}
											value={field.value}
											onValueChange={({ value }) => field.onChange(value)}
											onInteractOutside={() => field.onBlur()}
											collection={departmentList}
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
														{departmentList.items.map((item) => (
															<Select.Item item={item} key={item.value}>
																{item.label}
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

							<Field.Root>
								<Field.Label>Expertises </Field.Label>
								<Controller
									control={control}
									name="expertisesId"
									render={({ field }) => (
										<Select.Root
											multiple
											name={field.name}
											value={field.value}
											onValueChange={({ value }) => field.onChange(value)}
											onInteractOutside={() => field.onBlur()}
											collection={expertiseList}
										>
											<Select.HiddenSelect />
											<Select.Control>
												<Select.Trigger>
													<Select.ValueText placeholder="Select expertises" />
												</Select.Trigger>
												<Select.IndicatorGroup>
													<Select.Indicator />
												</Select.IndicatorGroup>
											</Select.Control>
											<Portal>
												<Select.Positioner>
													<Select.Content>
														{expertiseList.items.map((item) => (
															<Select.Item item={item} key={item.id}>
																{item.expertise}
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

						<HStack justify="flex-end" gap={4} pt={4}>
							<Button variant="outline">Cancel</Button>
							<Button type="submit" colorScheme="primary" loadingText="Adding...">
								Save
							</Button>
						</HStack>
					</VStack>
				</form>
			</Card.Body>
		</Card.Root>
	);
}
