import { useArticlesFilters } from "@/hooks/useArticleFilter";
import { Box, Button, Flex, Heading, Input, InputGroup, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { useDebouncedCallback } from "use-debounce";

export function ArticleListFilters() {
	const { setFilters } = useArticlesFilters();
	const router = useRouter();
	const pathname = usePathname();

	const debounced = useDebouncedCallback((value: string) => {
		router.push(pathname + "?" + setFilters({ query: value }));
	}, 1000);

	return (
		<Box borderRadius="xl" mb="8">
			<Heading as="h1" size="3xl" fontWeight="bold" mb="2">
				Browse Articles
			</Heading>
			<Text color="gray.500" mb={6}>
				Discover research publications from our faculty
			</Text>

			<Flex align="center" gap="5" borderWidth="2px" padding="5" rounded="md">
				<Box width="full">
					<InputGroup color="black" startElement={<FiSearch color="gray.500" />}>
						<Input
							size="lg"
							w="full"
							borderRadius="md"
							placeholder="Search..."
							onChange={(e) => debounced(e.target.value)}
						/>
					</InputGroup>
				</Box>

				<Box px={4} py={2}>
					<Button size="sm" colorScheme="brand" width="full">
						Clear Filters
					</Button>
				</Box>
			</Flex>
		</Box>
	);
}
