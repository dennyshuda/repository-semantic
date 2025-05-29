"use client";

import { useGetAllAuthors } from "@/utils/hooks/useGetAllAuthors";
import { Flex, Heading, Text } from "@chakra-ui/react";

export default function Home() {
	const { data, isLoading } = useGetAllAuthors();
	console.log(data);

	if (isLoading) return <Text>loading...</Text>;

	return (
		<Flex>
			<Heading>Halo damasdn</Heading>
			{/* <Text>{data.results.bindings[0].authorName.value}</Text> */}
			{/* <Box>
				{data?.map((post, idx) => (
					<div key={idx}>{post.title}</div>
				))}
			</Box> */}
		</Flex>
	);
}
