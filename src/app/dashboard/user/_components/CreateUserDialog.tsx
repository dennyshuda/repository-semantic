"use client";

import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import {
	Button,
	createListCollection,
	Dialog,
	Field,
	Input,
	Portal,
	Select,
	Stack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { createUser } from "../action";

interface CreateUserDialogProps {
	open: boolean;
	toggle: () => void;
	setOff: () => void;
}

export interface CreateUserFormValues {
	name: string;
	authorId: string[];
	password: string;
}

export function CreateUserDialog({ open, toggle, setOff }: CreateUserDialogProps) {
	const { register, control, reset, handleSubmit } = useForm<CreateUserFormValues>();

	const onSubmit = async (data: CreateUserFormValues) => {
		console.log(data, data.authorId[0]);

		const { status } = await createUser(data);

		if (status === 201) {
			console.log("sucess");
		} else {
			console.log("gagal");
		}

		setOff();
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
		<Dialog.Root lazyMount open={open} onOpenChange={toggle}>
			<Portal>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Dialog.Header>
								<Dialog.Title>Dialog Header</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body pb="4">
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
															<Select.ValueText placeholder="Select departments" />
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
								</Stack>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Dialog.ActionTrigger>
								<Button type="submit">Save</Button>
							</Dialog.Footer>
						</form>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
