"use client";

import Link from "next/link";
import { Suspense } from "react";
import { Box, Breadcrumb, Container, SimpleGrid, Text } from "@chakra-ui/react";
import { AuthorCard } from "@/components/AuthorCard";
import { AuthorListFilters } from "@/components/AuthorListFilters";
import { useAuthorFilters } from "@/hooks/useAuthorFilters";
import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";

export default function AuthorPage() {
	const { name, department, expertise } = useAuthorFilters();

	const { data } = useGetAllAuthors({ name, department, expertise });

	return (
		<Box>
			<Box minH="100vh">
				<Container maxW={"7xl"} py={8}>
					<Breadcrumb.Root mb={6} fontSize="sm">
						<Breadcrumb.List>
							<Breadcrumb.Item>
								<Link href="/">Home</Link>
							</Breadcrumb.Item>
							<Breadcrumb.Separator />
							<Breadcrumb.CurrentLink>
								<Breadcrumb.Link>Author</Breadcrumb.Link>
							</Breadcrumb.CurrentLink>
						</Breadcrumb.List>
					</Breadcrumb.Root>

					<AuthorListFilters />

					<Box>
						<Suspense fallback={<Text color="black">loading</Text>}>
							<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
								{data?.authors.map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Suspense>
					</Box>
				</Container>
			</Box>
		</Box>
	);
}
