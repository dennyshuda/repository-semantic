"use client";

import { AuthorListFilters } from "@/app/author/_components/AuthorListFilters";
import { AuthorCard } from "@/app/author/_components/AuthorCard";
import { useAuthorFilters } from "@/hooks/useAuthorFilters";
import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import { Box, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { AuthorNotFound } from "@/app/author/_components/AuthorNotFound";

export default function AuthorPage() {
	const { name, department, expertise, clearFilter } = useAuthorFilters();
	const { data } = useGetAllAuthors({ name, department, expertise });

	return (
		<Box minH="100vh">
			<Container maxW="7xl" py="8">
				<AuthorListFilters />

				<Box>
					<Text marginBottom="8">
						Found{" "}
						<Text as="span" fontWeight="bold">
							{data?.authors.length}
						</Text>{" "}
						faculty members
					</Text>
					{data?.authors.length !== 0 ? (
						<SimpleGrid columns={3} gap="8">
							{data?.authors.map((author) => (
								<AuthorCard key={author.id} author={author} />
							))}
						</SimpleGrid>
					) : (
						<AuthorNotFound clearFilter={clearFilter} />
					)}
				</Box>
			</Container>
		</Box>
	);
}
