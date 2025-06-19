"use client";

import { useGetAllCollections } from "@/utils/hooks/useGetallCollections";
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
import Link from "next/link";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";

interface CollectionTableProps {
	authorId?: string;
}

export default function CollectionTable({ authorId }: CollectionTableProps) {
	const { data } = useGetAllCollections(authorId);

	console.log(data, authorId);

	return (
		<Card.Root shadow="sm" borderRadius="xl">
			<Card.Header>
				<Flex justify="space-between" align="center" mb={4} flexWrap="wrap" gap={4}>
					<HStack gap={4} flex="1">
						<InputGroup startElement={<FiSearch />} maxW="300px">
							<Input placeholder="Search articles..." />
						</InputGroup>
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
												aria-label="Delete Article"
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
	);
}
