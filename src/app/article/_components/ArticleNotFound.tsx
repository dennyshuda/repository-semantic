import { Box, Heading, Text, Button } from "@chakra-ui/react";

export function ArticleNotFound() {
	return (
		<Box textAlign="center" py="10" px="6" borderRadius="xl" borderWidth="1px">
			<Heading as="h2" size="xl" mt="6" mb="2">
				No Results Found
			</Heading>
			<Text color={"gray.500"}>
				We couldnt find any articles matching your search criteria. Try adjusting your filters or
				search terms.
			</Text>
			<Button mt="6" colorScheme="brand">
				Clear All Filters
			</Button>
		</Box>
	);
}
