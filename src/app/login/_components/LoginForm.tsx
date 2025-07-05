"use client";

import { toaster, Toaster } from "@/components/ui/toaster";
import { useToggle } from "@/hooks/useToggle";
import { signin } from "@/utils/actions/auth";
import { Box, Button, Field, IconButton, Input, InputGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";

export interface LoginForm {
	username: string;
	password: string;
}

export default function LoginForm() {
	const { value, toggle } = useToggle();

	const { register, reset, handleSubmit } = useForm<LoginForm>();

	const router = useRouter();

	const onSubmit = async (data: LoginForm) => {
		const response = await signin(data);

		if (response.status === 200) {
			toaster.create({ title: response.message, type: "success" });
			setTimeout(() => {
				router.push("/dashboard");
			}, 2000);
		} else {
			toaster.create({ title: response.message, type: "error" });
		}
		reset();
	};

	return (
		<Box width={{ base: "xs", sm: "sm" }}>
			<Toaster />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={4}>
					<Field.Root required>
						<Field.Label>
							Username <Field.RequiredIndicator />
						</Field.Label>
						<Input placeholder="Username" {...register("username")} />
					</Field.Root>
					<Field.Root required>
						<Field.Label>
							Password <Field.RequiredIndicator />
						</Field.Label>
						<InputGroup
							endElement={
								value ? (
									<IconButton variant="ghost" rounded="full" onClick={toggle}>
										<BiShow />
									</IconButton>
								) : (
									<IconButton variant="ghost" rounded="full" onClick={toggle}>
										<BiHide />
									</IconButton>
								)
							}
						>
							<Input
								placeholder="********"
								type={value ? "text" : "password"}
								{...register("password")}
							/>
						</InputGroup>
					</Field.Root>

					<Stack gap={6}>
						<Button type="submit" colorPalette="green" size="lg" mt={2} fontWeight="semibold">
							Sign in
						</Button>
					</Stack>
				</Stack>
			</form>
		</Box>
	);
}
