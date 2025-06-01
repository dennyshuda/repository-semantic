"use client";

import { deleteAuthorById } from "@/utils/actions/authors/delete-author-id";
import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import { Author } from "@/utils/interfaces/authors";
import {
	Avatar,
	Box,
	Button,
	Card,
	CloseButton,
	Dialog,
	Flex,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	Portal,
	Table,
	Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { FiEdit, FiEye, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

export default function DashboardAuthorPage() {
	const [deleteAuthor, setDeleteAuthor] = useState<Author>();
	const [localSearch, setLocalSearch] = useState("");
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const { data } = useGetAllAuthors({ department: "", expertise: "", name: localSearch });

	const debounced = useDebouncedCallback((value: string) => {
		setLocalSearch(value);
	}, 1000);

	const handleClickEdit = (author: Author) => {
		localStorage.setItem("author", JSON.stringify(author));
		router.push(`/dashboard/author/edit/${author.id}`);
	};

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deleteAuthorById,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authors"] });
		},
	});

	const handleClickDelete = async () => {
		mutate({ id: deleteAuthor!.id });
		setOpen(false);
	};

	return (
		<Box>
			<Flex justify="space-between" align="center" mb={6}>
				<Box>
					<Heading size="lg">Authors Management</Heading>
					<Text color="gray.500">Manage all authors in the repository</Text>
				</Box>
				<Link href="/dashboard/author/create">
					<Button colorScheme="primary">
						<FiPlus />
						Create New Author
					</Button>
				</Link>
			</Flex>

			<Card.Root shadow="sm" borderRadius="xl">
				<Card.Header>
					<Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={4}>
						<HStack gap={4} flex="1">
							<InputGroup startElement={<FiSearch />} maxW="300px">
								<Input
									placeholder="Search authors..."
									onChange={(e) => debounced(e.target.value)}
								/>
							</InputGroup>
						</HStack>
					</Flex>

					<Text fontSize="sm" color="gray.500">
						Showing {data?.authors.length} authors
					</Text>
				</Card.Header>

				<Card.Body>
					<Box>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>Author</Table.ColumnHeader>
									<Table.ColumnHeader>Department</Table.ColumnHeader>
									<Table.ColumnHeader>Expertises</Table.ColumnHeader>
									<Table.ColumnHeader>Actions</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Suspense fallback={<p>loading</p>}>
									{data?.authors.map((author) => (
										<Table.Row key={author.id}>
											<Table.Cell>
												<Flex align="center">
													<Avatar.Root size="sm" mr={3} bg="primary.500" color="white">
														<Avatar.Fallback name={author.name} />
														<Avatar.Image src={author.image} />
													</Avatar.Root>
													<Box>
														<Text fontWeight="medium">{author.name}</Text>
														<Text fontSize="xs" color="gray.500">
															{author.email}
														</Text>
													</Box>
												</Flex>
											</Table.Cell>
											<Table.Cell>
												<Text fontSize="sm" maxW="200px">
													{author.department}
												</Text>
											</Table.Cell>
											<Table.Cell>
												<Text fontSize="sm" color="gray.600" maxW="200px">
													{author.expertises.slice(0, 2).join(", ")}
													{author.expertises.length > 2 && ` +${author.expertises.length - 2}`}
												</Text>
											</Table.Cell>
											<Table.Cell>
												<HStack gap={1}>
													<IconButton size="sm" variant="ghost" aria-label="View journal">
														<FiEye />
													</IconButton>
													<IconButton
														onClick={() => handleClickEdit(author)}
														size="sm"
														variant="ghost"
														aria-label="Edit journal"
													>
														<FiEdit />
													</IconButton>
													<IconButton
														size="sm"
														variant="ghost"
														colorScheme="red"
														aria-label="Delete journal"
														onClick={() => {
															setOpen(true);
															setDeleteAuthor(author);
														}}
													>
														<FiTrash2 />
													</IconButton>
												</HStack>
											</Table.Cell>
										</Table.Row>
									))}
								</Suspense>
							</Table.Body>
						</Table.Root>
					</Box>

					{/* {filteredAuthors.length === 0 && (
						<Flex justify="center" align="center" py={8}>
							<Text color="gray.500">
								{searchQuery || affiliationFilter
									? "No authors found matching your criteria"
									: "No authors found"}
							</Text>
						</Flex>
					)} */}
				</Card.Body>
			</Card.Root>

			<Dialog.Root role="alertdialog" lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Delete Author</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								Are you sure you want to delete{" "}
								<Text as="span" fontWeight="bold">
									{deleteAuthor?.name}
								</Text>
								? This action cannot be undone.
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
		</Box>
	);
}
