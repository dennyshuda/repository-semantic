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
		<Box p={8} borderRadius="xl" boxShadow="sm" borderWidth="1px" mb={8}>
			<Heading size="lg" mb={2}>
				Search Academic Journals
			</Heading>
			<Text color="gray.500" mb={6}>
				Explore our comprehensive collection of peer-reviewed research papers and academic journals.
			</Text>

			<Flex align="center" gap="5">
				<Box width="full">
					<InputGroup color="black" startElement={<FiSearch color="black" />}>
						<Input
							size="lg"
							w="full"
							borderRadius="full"
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
