import { Container, Skeleton, SkeletonText } from "@chakra-ui/react";

export default function Loading() {
	return (
		<Container maxW="7xl" py={10}>
			<Skeleton height="40px" mb={6} />
			<Skeleton height="20px" mb={6} />
			<Skeleton height="50px" mb={6} />
			<SkeletonText noOfLines={5} gap={4} />
		</Container>
	);
}
