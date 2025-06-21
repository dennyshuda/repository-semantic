"use client";

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
	Stack,
} from "@chakra-ui/react";
import { createUser } from "../action";
import { Controller, useForm } from "react-hook-form";
import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

export interface CreateUserFormValues {
	name: string;
	authorId: string[];
	password: string;
}
export default function DashboardCreateUserPage() {
	const { register, control, reset, handleSubmit } = useForm<CreateUserFormValues>();

	const router = useRouter();
	const onSubmit = async (data: CreateUserFormValues) => {
		console.log(data, data.authorId[0]);

		const { status } = await createUser(data);

		if (status === 201) {
			router.push("/dashboard/user");
			console.log("sucess");
		} else {
			console.log("gagal");
		}

		reset();
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
				Add New User
			</Heading>

			<Box p={6} borderRadius="lg" boxShadow="sm" borderWidth="1px">
				<form onSubmit={handleSubmit(onSubmit)}>
					<Stack gap="4">
						<Field.Root>
							<Field.Label>Authors</Field.Label>
							<Controller
								control={control}
								name="authorId"
								render={({ field }) => (
									<Select.Root
										required
										name={field.name}
										value={field.value}
										onValueChange={({ value }) => field.onChange(value)}
										onInteractOutside={() => field.onBlur()}
										collection={collection}
									>
										<Select.HiddenSelect />
										<Select.Control>
											<Select.Trigger>
												<Select.ValueText placeholder="Select author" />
											</Select.Trigger>
											<Select.IndicatorGroup>
												<Select.Indicator />
											</Select.IndicatorGroup>
										</Select.Control>
										<Portal>
											<Select.Positioner>
												<Select.Content zIndex="9999">
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

						<Field.Root>
							<Field.Label>Name</Field.Label>
							<Input placeholder="Name" {...register("name")} />
						</Field.Root>
						<Field.Root>
							<Field.Label>Password</Field.Label>
							<Input placeholder="*********" {...register("password")} />
						</Field.Root>

						<HStack justify="flex-end" gap={4} pt={4}>
							<Button variant="outline">Cancel</Button>
							<Button type="submit" colorScheme="primary" loadingText="Adding...">
								Add User
							</Button>
						</HStack>
					</Stack>
				</form>
			</Box>
		</Box>
	);
}
