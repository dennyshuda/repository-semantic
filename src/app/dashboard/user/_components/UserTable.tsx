"use client";

import { useToggle } from "@/hooks/useToggle";
import {
	Box,
	Card,
	Flex,
	HStack,
	IconButton,
	Input,
	InputGroup,
	Table,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import DeleteUserDialog from "./DeleteUserDialog";
import UserHeader from "./UserHeader";

export interface User {
	id: number;
	username: string;
	name: string;
	role: string;
	authorId: string;
}

interface UserTableProps {
	users: User[];
}

export default function UserTable({ users }: UserTableProps) {
	const [userId, setUserId] = useState<number>();

	const {
		value: openDelete,
		toggle: toggleDelete,
		setOn: setOpenDelete,
		setOff: setCloseDelete,
	} = useToggle();

	const router = useRouter();

	return (
		<Box>
			<Card.Root>
				<Card.Header>
					<UserHeader />

					<InputGroup startElement={<FiSearch />}>
						<Input placeholder="Search users..." />
					</InputGroup>

					<Text fontSize="sm" color="gray.500" marginTop="5">
						Showing {users.length} users
					</Text>
				</Card.Header>

				<Card.Body>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader color="gray.500">Id</Table.ColumnHeader>
								<Table.ColumnHeader color="gray.500">Username</Table.ColumnHeader>
								<Table.ColumnHeader color="gray.500">Name</Table.ColumnHeader>
								<Table.ColumnHeader color="gray.500">Role</Table.ColumnHeader>
								<Table.ColumnHeader color="gray.500">Actions</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{users.map((user) => (
								<Table.Row key={user.id}>
									<Table.Cell>
										<Flex align="center">
											<Text fontWeight="medium">{user.id}</Text>
										</Flex>
									</Table.Cell>
									<Table.Cell>
										<Flex align="center">
											<Text fontWeight="medium">{user.username}</Text>
										</Flex>
									</Table.Cell>
									<Table.Cell>
										<Flex align="center">
											<Text fontWeight="medium">{user.name}</Text>
										</Flex>
									</Table.Cell>
									<Table.Cell>
										<Text fontSize="sm">{user.role}</Text>
									</Table.Cell>
									<Table.Cell>
										<HStack gap={1}>
											<IconButton size="sm" variant="outline" aria-label="View user">
												<FiEye />
											</IconButton>
											<IconButton
												size="sm"
												variant="outline"
												aria-label="Edit user"
												onClick={() => {
													router.push(`/dashboard/user/edit/${user.id}`);
												}}
											>
												<FiEdit />
											</IconButton>
											<IconButton
												size="sm"
												variant="outline"
												colorPalette="red"
												aria-label="Delete user"
												onClick={() => {
													setUserId(user.id);
													setOpenDelete();
												}}
											>
												<FiTrash2 />
											</IconButton>
										</HStack>
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Root>
				</Card.Body>
			</Card.Root>

			<DeleteUserDialog
				userId={userId!}
				open={openDelete}
				toggle={toggleDelete}
				setClose={setCloseDelete}
			/>
		</Box>
	);
}
