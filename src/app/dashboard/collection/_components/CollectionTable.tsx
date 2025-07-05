"use client";

import { useGetAllCollections } from "@/utils/hooks/useGetallCollections";
import { Card, HStack, IconButton, Input, InputGroup, Table, Text } from "@chakra-ui/react";
import Link from "next/link";
import { FiEdit, FiEye, FiSearch, FiTrash2 } from "react-icons/fi";
import CollectionHeader from "./CollectionHeader";

interface CollectionTableProps {
	authorId?: string;
}

export default function CollectionTable({ authorId }: CollectionTableProps) {
	const { data } = useGetAllCollections(authorId);
	console.log(data);

	return (
		<Card.Root>
			<Card.Header>
				<CollectionHeader />

				<InputGroup startElement={<FiSearch />} maxW="300px">
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
										<IconButton size="sm" variant="outline">
											<FiEdit />
										</IconButton>
										<IconButton size="sm" variant="outline" colorPalette="red">
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
	);
}
