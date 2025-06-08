"use client";

import { ENDPOINT_UPDATE, IRI } from "@/utils/constant";
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
	VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
}

interface AuthorEditFormProps {
	author: Author;
}

export default function AuthorEditForm({ author }: AuthorEditFormProps) {
	const router = useRouter();
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: {},
	} = useForm<EditAuthorFormValues>();

	const onSubmit = async (data: EditAuthorFormValues) => {
		const newAuthor = {
			id: author.id,
			name: data.name ? data.name : author.name,
			email: data.email ? data.email : author.email,
			nip: data.nip ? data.nip : author.nip,
			image: data.image ? data.image : author.image,
			department: data.departmentId ? data.departmentId[0] : author.departmentId,
			expertisesId:
				data.expertisesId && data.expertisesId.length !== 0
					? data.expertisesId
					: author.expertisesId,
		};

		console.log(newAuthor);

		const sparqlQuery = `
        PREFIX journal: ${IRI}
        PREFIX rdf: <http:www.w3.org/1999/02/22-rdf-syntax-ns#>

        DELETE { journal:${newAuthor.id} ?p ?o }

        INSERT {
            journal:${newAuthor.id} rdf:type journal:newAuthor;
            journal:authorId "${newAuthor.id}";
            journal:authorName "${newAuthor.name}";
            journal:authorImage  "${newAuthor.image}";
            journal:authorNip ${newAuthor.nip};
            journal:authorEmail  "${newAuthor.email}".

            journal:${newAuthor.id} journal:hasMajor journal:${newAuthor.department}.
            journal:${newAuthor.department} journal:isMajorOf journal:${newAuthor.id}.

            ${newAuthor.expertisesId
							.map((id: string) => `journal:${newAuthor.id} journal:hasExpertise journal:${id} .`)
							.join("\n")}

            ${newAuthor.expertisesId
							.map((id: string) => `journal:${id} journal:isExpertiseOf journal:${newAuthor.id} .`)
							.join("\n")}
        }

        WHERE  {
            journal:${newAuthor.id} ?p ?o .
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

	const expertiseList = createListCollection({
		items: [
			{ label: "Data Mining", value: "data_mining" },
			{ label: "Software Engineering", value: "software_engineering" },
			{ label: "Computer Vision", value: "computer_vision" },
			{ label: "Computer Network", value: "computer_network" },
		],
	});

	return (
		<Box>
			<Heading size="lg" mb={6}>
				Edit Author
			</Heading>

			<Box p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px">
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack gap={6} align="stretch">
						<Field.Root>
							<Field.Label>Full Name</Field.Label>
							<Field.HelperText>Current: {author.name}</Field.HelperText>
							<Input placeholder="Enter author's full name" {...register("name")} />
						</Field.Root>

						<Field.Root>
							<Field.Label>Photo (URL)</Field.Label>
							<Field.HelperText>Current: {author.image}</Field.HelperText>
							<Input placeholder="Enter photo's" {...register("image")} />
						</Field.Root>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root>
								<Field.Label>Email</Field.Label>
								<Field.HelperText>Current: {author.email}</Field.HelperText>
								<Input type="email" placeholder="Enter author's email" {...register("email")} />
							</Field.Root>

							<Field.Root>
								<Field.Label>Nip</Field.Label>
								<Field.HelperText>Current: {author.nip}</Field.HelperText>
								<Input type="number" placeholder="Enter author's nip" {...register("nip")} />
							</Field.Root>
						</SimpleGrid>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root>
								<Field.Label>Department</Field.Label>
								<Field.HelperText>Current: {author.department}</Field.HelperText>
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
								<Field.HelperText>Current: {author.expertises.toString()}</Field.HelperText>
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
						</SimpleGrid>

						<HStack justify="flex-end" gap={4} pt={4}>
							<Button variant="outline">Cancel</Button>
							<Button type="submit" colorScheme="primary" loadingText="Adding...">
								Add Author
							</Button>
						</HStack>
					</VStack>
				</form>
			</Box>
		</Box>
	);
}
