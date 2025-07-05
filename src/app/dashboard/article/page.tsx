"use client";

import { Toaster, toaster } from "@/components/ui/toaster";
import { deleteArticleById } from "@/utils/actions/articles/delete-article-id";
import { useGetAllArticles } from "@/utils/hooks/useGetAllArticles";
import { Article } from "@/utils/interfaces/articles";
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
	Portal,
	Table,
	Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiEdit, FiEye, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

export default function DashboardArticlePage() {
	const [deleteArticle, setDeleteArticle] = useState<Article>();
	const [localSearch, setLocalSearch] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	const router = useRouter();

	const { data } = useGetAllArticles({ query: localSearch });

	const debounced = useDebouncedCallback((value: string) => {
		setLocalSearch(value);
	}, 1000);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deleteArticleById,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["articles"] });
			toaster.create({
				title: "Successfully removed",
				type: "success",
			});
		},
	});

	const handleClickDelete = async () => {
		mutate({ id: deleteArticle!.id });
		setOpen(false);
	};

	const handleClickEdit = (article: Article) => {
		router.push(`/dashboard/article/edit/${article.id}`);
	};

	return (
		<Box>
			<Toaster />
			<Card.Root>
				<Card.Header>
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

					<InputGroup startElement={<FiSearch />}>
						<Input placeholder="Search articles..." onChange={(e) => debounced(e.target.value)} />
					</InputGroup>

					<Text marginTop="5" fontSize="sm" color="gray.500">
						Showing {data?.articles.length} articles
					</Text>
				</Card.Header>

				<Card.Body>
					<Table.Root interactive>
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader color="gray.500">Title</Table.ColumnHeader>
								<Table.ColumnHeader color="gray.500">Authors</Table.ColumnHeader>
								<Table.ColumnHeader color="gray.500">Year</Table.ColumnHeader>
								<Table.ColumnHeader color="gray.500">Actions</Table.ColumnHeader>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{data?.articles.map((article) => (
								<Table.Row key={article.id}>
									<Table.Cell>
										<Text fontWeight="medium" textTransform="uppercase">
											{article.title}
										</Text>
									</Table.Cell>
									<Table.Cell>
										<Text fontSize="sm">
											{article?.authors.split(",").slice(0, 2).join(", ")}
											{article?.authors.split(",").length > 2 &&
												` +${article.authors.split(",").length - 2} more`}
										</Text>
									</Table.Cell>
									<Table.Cell>{article.year}</Table.Cell>
									<Table.Cell>
										<HStack gap={1}>
											<Link href={`/article/${article.id}`} target="_blank">
												<IconButton size="sm" variant="outline" aria-label="View journal">
													<FiEye />
												</IconButton>
											</Link>
											<IconButton
												size="sm"
												variant="outline"
												aria-label="Edit journal"
												onClick={() => handleClickEdit(article)}
											>
												<FiEdit />
											</IconButton>
											<IconButton
												size="sm"
												variant="outline"
												colorPalette="red"
												aria-label="Delete Article"
												onClick={() => {
													setOpen(true);
													setDeleteArticle(article);
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

					{data?.articles.length === 0 && (
						<Flex justify="center" align="center" py={8}>
							<Text color="gray.500">No articles found matching your criteria</Text>
						</Flex>
					)}
				</Card.Body>
			</Card.Root>

			<Dialog.Root role="alertdialog" lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
				<Portal>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Delete Article</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								Are you sure you want to delete article with title{" "}
								<Text as="span" fontWeight="bold">
									&quot;{deleteArticle?.title}&quot;
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
		</Box>
	);
}
