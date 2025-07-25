"use client";

import { toaster, Toaster } from "@/components/ui/toaster";
import { useToggle } from "@/hooks/useToggle";
import { signin } from "@/utils/actions/auth";
import { Box, Button, Field, IconButton, Input, InputGroup, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import * as z from "zod/v4";

const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(8, "Password must be at least 8 characters long."),
});

export type LoginFormValue = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const { value, toggle } = useToggle();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValue>({
		resolver: standardSchemaResolver(loginSchema),
	});

	const router = useRouter();

	const onSubmit: SubmitHandler<LoginFormValue> = async (data) => {
		const response = await signin(data);

		if (response.status === 200) {
			toaster.create({ title: response.message, type: "success" });
			setTimeout(() => {
				router.push("/dashboard");
			}, 2000);
		} else {
			toaster.create({ title: response.message, type: "error" });
		}
	};

	return (
		<Box width={{ base: "xs", sm: "sm" }}>
			<Toaster />
			<form onSubmit={handleSubmit(onSubmit)}>
				<Stack gap={4}>
					<Field.Root invalid={!!errors.username}>
						<Field.Label>
							Username <Field.RequiredIndicator />
						</Field.Label>
						<Input placeholder="Username" type="text" {...register("username")} required />

						<Field.ErrorText>{errors.username?.message}</Field.ErrorText>
					</Field.Root>
					<Field.Root invalid={!!errors.password}>
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
								required
							/>
						</InputGroup>
						<Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
