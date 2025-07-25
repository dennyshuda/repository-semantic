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
import { updateUser } from "../../action";

interface IUser {
	id: number;
	name: string;
	username: string;
	authorId: string;
	role: string;
}

interface UserEditFormProps {
	user: IUser;
}

export interface EditUserFormValues {
	name: string;
	authorId: string[];
	username: string;
	password: string;
}

export default function UserEditForm({ user }: UserEditFormProps) {
	const { register, control, handleSubmit } = useForm<EditUserFormValues>({
		defaultValues: { name: user.name, username: user.username, authorId: [user.authorId] },
	});

	const { data } = useGetAllAuthors({ department: "", expertise: "", name: "" });

	const collection = useMemo(() => {
		return createListCollection({
			items: data?.authors ?? [],
			itemToString: (author) => author.name,
			itemToValue: (author) => author.id,
		});
	}, [data?.authors]);

	const router = useRouter();

	const onSubmit = async (data: EditUserFormValues) => {
		await updateUser({ id: user.id, data });

		router.push("/dashboard/user");
	};
	return (
		<Card.Root>
			<Card.Header>
				<Heading size="lg">EDIT USER</Heading>
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
										disabled
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
							<Field.Label>Username</Field.Label>
							<Input placeholder="Username" {...register("username")} />
						</Field.Root>

						<Field.Root>
							<Field.Label>Password</Field.Label>
							<Input placeholder="*********" {...register("password")} />
						</Field.Root>

						<HStack justify="flex-end" gap={4} pt={4}>
							<Button variant="outline">Cancel</Button>
							<Button type="submit" colorScheme="primary" loadingText="Adding...">
								Save
							</Button>
						</HStack>
					</Stack>
				</form>
			</Card.Body>
		</Card.Root>
	);
}
