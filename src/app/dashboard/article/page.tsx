"use client";

import Link from "next/link";
import {
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
	Menu,
	Portal,
	Table,
	Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiDownload, FiEdit, FiEye, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { useGetAllArticles } from "@/utils/hooks/useGetAllArticles";
import { useDebouncedCallback } from "use-debounce";

export default function DashboardArticlePage() {
	const [localSearch, setLocalSearch] = useState("");
	const [open, setOpen] = useState(false);

	const { data } = useGetAllArticles({ query: localSearch });

	console.log(data);

	const debounced = useDebouncedCallback((value: string) => {
		setLocalSearch(value);
	}, 1000);

	return (
		<Box>
			<Flex justify="space-between" align="center" mb={6}>
				<Box>
					<Heading size="lg">Article Management</Heading>
					<Text color="gray.500">Manage all articles in the repository</Text>
				</Box>
				<Link href="/dashboard/article/create">
					<Button colorScheme="primary">
						<FiPlus />
						Create New Article
					</Button>
				</Link>
			</Flex>

			<Card.Root shadow="sm" borderRadius="xl">
				<Card.Header>
					<Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={4}>
						<HStack gap={4} flex="1">
							<InputGroup startElement={<FiSearch />} maxW="300px">
								<Input
									placeholder="Search articles..."
									onChange={(e) => debounced(e.target.value)}
								/>
							</InputGroup>
						</HStack>

						<HStack>
							<Menu.Root>
								<Menu.Trigger asChild>
									<Button variant="outline" size="sm">
										<FiDownload />
										Export
									</Button>
								</Menu.Trigger>
								<Portal>
									<Menu.Positioner>
										<Menu.Content>
											<Menu.Item value="csv">Export as CSV</Menu.Item>
											<Menu.Item value="pdf">Export as PDF</Menu.Item>
											<Menu.Item value="list">Export contact list</Menu.Item>
										</Menu.Content>
									</Menu.Positioner>
								</Portal>
							</Menu.Root>
						</HStack>
					</Flex>

					<Text fontSize="sm" color="gray.500">
						Showing {data?.articles.length} articles
					</Text>
				</Card.Header>

				<Card.Body>
					<Box>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>Title</Table.ColumnHeader>
									<Table.ColumnHeader>Authors</Table.ColumnHeader>
									<Table.ColumnHeader>Year</Table.ColumnHeader>
									<Table.ColumnHeader>Publisher</Table.ColumnHeader>
									<Table.ColumnHeader>Actions</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{data?.articles.map((article) => (
									<Table.Row key={article.id}>
										<Table.Cell>
											<Text fontWeight="medium" maxW="300px" textTransform="uppercase">
												{article.title}
											</Text>
											{/* {journal.doi && (
												<Text fontSize="xs" color="gray.500" mt={1}>
													DOI: {journal.doi}
												</Text>
											)} */}
										</Table.Cell>
										<Table.Cell>
											<Text fontSize="sm" color="gray.600">
												{article?.authors.split(",").slice(0, 2).join(", ")}
												{article?.authors.split(",").length > 2 &&
													` +${article.authors.split(",").length - 2} more`}
											</Text>
										</Table.Cell>
										<Table.Cell>{article.year}</Table.Cell>
										<Table.Cell>
											<Text fontWeight="medium">{article.publisher}</Text>
										</Table.Cell>
										<Table.Cell>
											<HStack gap={1}>
												<Link href={`/article/${article.id}`} target="_blank">
													<IconButton size="sm" variant="ghost" aria-label="View journal">
														<FiEye />
													</IconButton>
												</Link>
												<IconButton size="sm" variant="ghost" aria-label="Edit journal">
													<FiEdit />
												</IconButton>
												<IconButton
													size="sm"
													variant="ghost"
													colorScheme="red"
													aria-label="Delete journal"
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
					{/* 
					{data?.articles.length === 0 && (
						<Flex justify="center" align="center" py={8}>
							<Text color="gray.500">
								"No authors found matching your criteria" "No authors found"
								{searchQuery || categoryFilter
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
									{/* {deleteArticle} */}
								</Text>
								? This action cannot be undone.
							</Dialog.Body>
							<Dialog.Footer>
								<Dialog.ActionTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Dialog.ActionTrigger>
								<Button colorPalette="red">Delete</Button>
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
