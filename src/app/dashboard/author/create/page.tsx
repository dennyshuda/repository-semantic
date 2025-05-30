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
import { Controller, useForm } from "react-hook-form";
import slugify from "react-slugify";

export interface CreateAuthorFormValues {
	name: string;
	email: string;
	nip: number;
	image: string;
	departmentId: string[];
	expertisesId: string[];
}

export default function DashboardCreateAuthorPage() {
	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateAuthorFormValues>();

	const onSubmit = async (data: CreateAuthorFormValues) => {
		const authorId = slugify(data.name);

		const sparqlQuery = `
		PREFIX journal: ${IRI}
		PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

		INSERT DATA {
			journal:${authorId} rdf:type journal:Author;
            journal:authorId "${authorId}";
            journal:authorName "${data.name}";
            journal:authorImage "${data.image}";
            journal:authorNip ${data.nip};
            journal:authorEmail "${data.email}".

			journal:${authorId} journal:hasMajor journal:${data.departmentId[0]}.
			journal:${data.departmentId[0]} journal:isMajorOf journal:${authorId}.

            ${data.expertisesId
							.map((id: string) => `journal:${authorId} journal:hasExpertise journal:${id} .`)
							.join("\n")}

            ${data.expertisesId
							.map((id: string) => `journal:${id} journal:isExpertiseOf journal:${authorId} .`)
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
			reset();
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
				Add New Author
			</Heading>

			<Box p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px">
				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack gap={6} align="stretch">
						<Field.Root required>
							<Field.Label>
								Full Name <Field.RequiredIndicator />
							</Field.Label>
							<Input placeholder="Enter author's full name" {...register("name")} />
						</Field.Root>

						<Field.Root required>
							<Field.Label>
								Photo (URL) <Field.RequiredIndicator />
							</Field.Label>
							<Input placeholder="Enter photo's" {...register("image")} />
						</Field.Root>

						<SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
							<Field.Root required>
								<Field.Label>
									Email <Field.RequiredIndicator />
								</Field.Label>
								<Input type="email" placeholder="Enter author's email" {...register("email")} />
							</Field.Root>

							<Field.Root required>
								<Field.Label>
									NIP <Field.RequiredIndicator />
								</Field.Label>
								<Input type="number" placeholder="Enter author's NIP" {...register("nip")} />
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
											required
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
								<Field.ErrorText>{errors.departmentId?.message}</Field.ErrorText>
							</Field.Root>

							<Field.Root>
								<Field.Label>Expertises </Field.Label>
								<Controller
									control={control}
									name="expertisesId"
									render={({ field }) => (
										<Select.Root
											required
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
