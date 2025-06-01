/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { use, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import slugify from "react-slugify";

export interface EditAuthorFormValues {
	name: string;
	email: string;
	nip: number;
	image: string;
	departmentId: string[];
	expertisesId: string[];
}

export default function DashboardEditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params);

	const [value, setValue] = useState<any>();

	const router = useRouter();

	useEffect(() => {
		if (typeof window !== "undefined" && window.localStorage) {
			const localstorageValue = localStorage.getItem("author");

			if (localstorageValue !== null) {
				setValue(JSON.parse(localstorageValue));
			}
		}
	}, []);

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: {},
	} = useForm<EditAuthorFormValues>();

	const onSubmit = async (data: EditAuthorFormValues) => {
		const author = {
			id: value?.id,
			name: data.name ? data.name : value?.name,
			email: data.email ? data.email : value?.email,
			nip: data.nip ? data.nip : value?.nip,
			image: data.image ? data.image : value?.image,
			department: data.departmentId ? data.departmentId[0] : value?.department,
			expertises: data.expertisesId ? data.expertisesId : value?.expertises,
		};

		console.log(author);

		const sparqlQuery = `
		    PREFIX journal: ${IRI}
		    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

		    DELETE { journal:${author.id} ?p ?o }

		    INSERT {
		        journal:${author.id} rdf:type journal:Author;
		        journal:authorId "${author.id}";
		        journal:authorName "${author.name}";
		        journal:authorImage  "${author.image}";
		        journal:authorNip ${author.nip};
		        journal:authorEmail  "${author.email}".

		        journal:${author.id} journal:hasMajor journal:${author.department}.
		        journal:${author.department} journal:isMajorOf journal:${author.id}.

		        ${author.expertises
							.map(
								(id: string) =>
									`journal:${author.id} journal:hasExpertise journal:${slugify(id, {
										delimiter: "_",
									})} .`
							)
							.join("\n")}

		        ${author.expertises
							.map(
								(id: string) =>
									`journal:${slugify(id, { delimiter: "_" })} journal:isExpertiseOf journal:${
										author.id
									} .`
							)
							.join("\n")}
		        }

		    WHERE  {
		        journal:${author.id} ?p ?o .
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
			return error;
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
				Edit Author {id}
			</Heading>

			<Box p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px">
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack gap={6} align="stretch">
						<Field.Root>
							<Field.Label>
								Full Name <Field.RequiredIndicator />
							</Field.Label>
							<Field.HelperText>Previous Name</Field.HelperText>
							<Input placeholder={value?.name} disabled />
							<Field.HelperText>New Name</Field.HelperText>
							<Input placeholder="Enter author's full name" {...register("name")} />
						</Field.Root>

						<Field.Root>
							<Field.Label>
								Photo (URL) <Field.RequiredIndicator />
							</Field.Label>
							<Field.HelperText>Previous Photo</Field.HelperText>
							<Input placeholder={value?.image} disabled />
							<Field.HelperText>New Photo</Field.HelperText>
							<Input placeholder="Enter photo's" {...register("image")} />
						</Field.Root>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root>
								<Field.Label>
									Email <Field.RequiredIndicator />
								</Field.Label>
								<Field.HelperText>Previous Email</Field.HelperText>
								<Input type="email" placeholder={value?.email} disabled />
								<Field.HelperText>New Email</Field.HelperText>
								<Input type="email" placeholder="Enter author's email" {...register("email")} />
							</Field.Root>

							<Field.Root>
								<Field.Label>
									Nip <Field.RequiredIndicator />
								</Field.Label>
								<Field.HelperText>Previous Nip</Field.HelperText>
								<Input type="text" placeholder={value?.nip} disabled />
								<Field.HelperText>New Email</Field.HelperText>
								<Input type="number" placeholder="Enter author's nip" {...register("nip")} />
							</Field.Root>
						</SimpleGrid>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root>
								<Field.Label>Department</Field.Label>
								<Field.HelperText>Previous Department: {value?.department}</Field.HelperText>
								{/* <Input type="text" placeholder={value?.department} disabled /> */}
								<Field.HelperText>New Department</Field.HelperText>
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
								<Field.HelperText>
									Previous Expertises: {value?.expertises?.join()}
								</Field.HelperText>
								{/* <Input type="text" placeholder={value?.expertises?.join()} disabled /> */}
								<Field.HelperText>New Department</Field.HelperText>
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
