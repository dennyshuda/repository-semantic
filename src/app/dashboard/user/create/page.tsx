"use client";

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
	Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { createUser } from "../action";
import { toaster, Toaster } from "@/components/ui/toaster";

export interface CreateUserFormValues {
	name: string;
	authorId: string[];
	password: string;
}

export default function DashboardCreateUserPage() {
	const { register, control, reset, handleSubmit } = useForm<CreateUserFormValues>();
	const router = useRouter();
	const onSubmit = async (data: CreateUserFormValues) => {
		const { status, message } = await createUser(data);

		if (status === 201) {
			toaster.create({
				title: "Successfully created",
				type: "success",
			});
			setTimeout(() => {
				router.push("/dashboard/user");
			}, 2000);
		} else {
			toaster.create({
				title: message,
				type: "error",
			});
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
		<Card.Root>
			<Toaster />
			<Card.Header>
				<Heading size="lg">Create New User</Heading>
			</Card.Header>

			<Card.Body>
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
								Create User
							</Button>
						</HStack>
					</Stack>
				</form>
			</Card.Body>
		</Card.Root>
	);
}
