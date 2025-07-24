"use client";

import { useGetAllCollections } from "@/utils/hooks/useGetallCollections";
import {
	Box,
	Button,
	Card,
	CloseButton,
	Dialog,
	HStack,
	IconButton,
	Input,
	InputGroup,
	Portal,
	Table,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import CollectionHeader from "./CollectionHeader";
import { useState } from "react";
import { Article } from "@/utils/interfaces/articles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticleById } from "@/utils/actions/articles/delete-article-id";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

interface CollectionTableProps {
	authorId?: string;
}

export default function CollectionTable({ authorId }: CollectionTableProps) {
	const [deleteArticle, setDeleteArticle] = useState<Article>();
	const [open, setOpen] = useState<boolean>(false);
	const router = useRouter();

	const { data } = useGetAllCollections(authorId);

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: deleteArticleById,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["collections"] });
			toaster.create({
				title: "Successfully removed",
				type: "success",
			});
		},
	});

	const handleClickEdit = (article: Article) => {
		router.push(`/dashboard/collection/edit/${article.id}`);
	};

	const handleClickDelete = async () => {
		mutate({ id: deleteArticle!.id });
		setOpen(false);
	};

	return (
		<Box>
			<Toaster />
			<Card.Root>
				<Card.Header>
					<CollectionHeader />

					<InputGroup startElement={<FiSearch />}>
						<Input placeholder="Search articles..." />
					</InputGroup>

					<Text fontSize="sm" color="gray.500" marginTop="5">
						Showing {data?.articles.length} articles
					</Text>
				</Card.Header>

				<Card.Body>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.ColumnHeader color="gray.500">Title</Table.ColumnHeader>
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
									<Table.Cell>{article.year}</Table.Cell>

									<Table.Cell>
										<HStack gap={1}>
											<Link href={`/article/${article.id}`} target="_blank">
												<IconButton size="sm" variant="outline">
													<FiEye />
												</IconButton>
											</Link>
											<IconButton
												size="sm"
												variant="outline"
												onClick={() => handleClickEdit(article)}
											>
												<FiEdit />
											</IconButton>
											<IconButton
												size="sm"
												variant="outline"
												colorPalette="red"
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
