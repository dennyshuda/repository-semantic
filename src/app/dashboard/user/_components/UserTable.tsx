"use client";

import { useToggle } from "@/hooks/useToggle";
import {
	Box,
	Button,
	Card,
	CloseButton,
	Dialog,
	Flex,
	HStack,
	IconButton,
	Input,
	InputGroup,
	Portal,
	Table,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import { deleteUser } from "../action";

interface User {
	id: number;
	username: string;
	name: string;
	role: string;
}

interface UserTableProps {
	users: User[];
}

export default function UserTable({ users }: UserTableProps) {
	const [userId, setUserId] = useState<number>();
	const { value, toggle, setOn, setOff } = useToggle();

	const handleClickDelete = async () => {
		await deleteUser(userId!);
		setOff();
	};

	return (
		<>
			<Card.Root shadow="sm" borderRadius="xl">
				<Card.Header>
					<Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={4}>
						<HStack gap={4} flex="1">
							<InputGroup startElement={<FiSearch />} maxW="300px">
								<Input placeholder="Search users..." />
							</InputGroup>
						</HStack>
					</Flex>

					<Text fontSize="sm" color="gray.500">
						Showing 0 users
					</Text>
				</Card.Header>

				<Card.Body>
					<Box>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>Id</Table.ColumnHeader>
									<Table.ColumnHeader>Username</Table.ColumnHeader>
									<Table.ColumnHeader>Name</Table.ColumnHeader>
									<Table.ColumnHeader>Role</Table.ColumnHeader>
									<Table.ColumnHeader>Actions</Table.ColumnHeader>
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
												<IconButton size="sm" variant="ghost" aria-label="View journal">
													<FiEye />
												</IconButton>
												<IconButton size="sm" variant="ghost" aria-label="Edit journal">
													<FiEdit />
												</IconButton>
												<IconButton
													size="sm"
													variant="ghost"
													colorScheme="red"
													aria-label="Delete journal"
													onClick={() => {
														setUserId(user.id);
														setOn();
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
					</Box>
				</Card.Body>
			</Card.Root>

			<Dialog.Root role="alertdialog" lazyMount open={value} onOpenChange={toggle}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Delete Author</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								Are you sure you want to delete with id{" "}
								<Text as="span" fontWeight="bold">
									{userId}
								</Text>
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Dialog.ActionTrigger>
								<Button colorPalette="red" onClick={handleClickDelete}>
									Delete
								</Button>
							</Dialog.Footer>
							<Dialog.CloseTrigger asChild>
								<CloseButton size="sm" />
							</Dialog.CloseTrigger>
						</Dialog.Content>
					</Dialog.Positioner>
				</Portal>
			</Dialog.Root>
		</>
	);
}
