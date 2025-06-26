import { AuthorCard } from "@/components/AuthorCard";
import HomeGraph from "@/components/HomeGraph";
import { getAllAuthors } from "@/utils/actions/authors/get-all-authors";
import { getAuthorByDepartment } from "@/utils/actions/authors/get-author-department";
import { departments, expertiseAreas } from "@/utils/constant";
import {
	Badge,
	Box,
	Container,
	Heading,
	HStack,
	Input,
	InputGroup,
	SimpleGrid,
	Stack,
	Tabs,
	Text,
} from "@chakra-ui/react";
import { Suspense } from "react";
import { FiSearch } from "react-icons/fi";

export default async function Home() {
	const IAuthor = getAuthorByDepartment("informatika");
	const DSAuthor = getAuthorByDepartment("sains_data");
	const ISAuthor = getAuthorByDepartment("sistem_informasi");
	const DBAuthor = getAuthorByDepartment("bisnis_digital");
	const allAuthor = getAllAuthors({ name: "", department: "", expertise: "" });

	const [informatics, dataSciences, informationSystems, digitalBusinsess, authors] =
		await Promise.all([IAuthor, ISAuthor, DSAuthor, DBAuthor, allAuthor]);

	// const nodes = [
	// 	{ id: "1", name: "Alice", imageUrl: "/images/alice.jpg" },
	// 	{ id: "2", name: "Bob", imageUrl: "/images/bob.jpg" },
	// 	{ id: "3", name: "Charlie", imageUrl: "/images/charlie.jpg" },
	// 	{ id: "4", name: "Diana", imageUrl: "/images/diana.jpg" },
	// 	{ id: "5", name: "Eve", imageUrl: "/images/eve.jpg" },
	// 	{ id: "6", name: "Frank", imageUrl: "/images/frank.jpg" },
	// 	{ id: "7", name: "Grace", imageUrl: "/images/grace.jpg" },
	// 	{ id: "8", name: "Heidi", imageUrl: "/images/heidi.jpg" },
	// 	{ id: "9", name: "Ivan", imageUrl: "/images/ivan.jpg" },
	// 	{ id: "10", name: "Judy", imageUrl: "/images/judy.jpg" },
	// 	{ id: "11", name: "Mallory", imageUrl: "/images/mallory.jpg" },
	// 	{ id: "12", name: "Oscar", imageUrl: "/images/oscar.jpg" },
	// 	{ id: "13", name: "Peggy", imageUrl: "/images/peggy.jpg" },
	// 	{ id: "14", name: "Quinn", imageUrl: "/images/quinn.jpg" },
	// 	{ id: "15", name: "Ruth", imageUrl: "/images/ruth.jpg" },
	// 	{ id: "16", name: "Sybil", imageUrl: "/images/sybil.jpg" },
	// 	{ id: "17", name: "Trent", imageUrl: "/images/trent.jpg" },
	// 	{ id: "18", name: "Victor", imageUrl: "/images/victor.jpg" },
	// 	{ id: "19", name: "Wendy", imageUrl: "/images/wendy.jpg" },
	// 	{ id: "20", name: "Zara", imageUrl: "/images/zara.jpg" },
	// ];

	const generateFullyConnectedGraph = (
		nodes: {
			id: string;
			name: string;
			image: string;
		}[]
	) => {
		const links = [];
		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				links.push({ source: nodes[i].id, target: nodes[j].id });
			}
		}
		return { nodes, links };
	};

	const graphData = generateFullyConnectedGraph(authors.authors);

	return (
		<Box as="main">
			<Box bg="black" color="white" py={20} position="relative" overflow="hidden">
				<Box
					position="absolute"
					top="0"
					left="0"
					right="0"
					bottom="0"
					bgAttachment="fixed"
					bgImage="url(https://if.upnjatim.ac.id/bima/data/carousel/210120202218011579619881708.jpg)"
					opacity="0.5"
					backgroundSize="cover"
					backgroundPosition="center"
				/>
				<Container maxW="7xl" position="relative" zIndex="1">
					<Stack gap={6} textAlign="center" maxW="3xl" mx="auto">
						<Heading
							as="h1"
							fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
							fontWeight="bold"
							lineHeight="shorter"
						>
							Discover Research Excellence at FASILKOM
						</Heading>
						<Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl" mx="auto">
							Explore cutting-edge research, academic journals, and scholarly works from our faculty
							and researchers in computer science and information technology.
						</Text>

						<InputGroup color="white" startElement={<FiSearch color="white" />}>
							<Input
								size="lg"
								w="full"
								borderRadius="full"
								placeholder="Input your keywords "
								_placeholder={{ color: "white" }}
							/>
						</InputGroup>

						<HStack justify="center" gap={4} wrap="wrap">
							{departments.map((department, index) => (
								<Badge
									key={`department-${index}`}
									px={3}
									py={2}
									bg="white"
									color="brand.600"
									fontSize="sm"
									fontWeight="medium"
									rounded="full"
									_hover={{ bg: "gray.100", cursor: "pointer" }}
								>
									{department}
								</Badge>
							))}
						</HStack>
					</Stack>
				</Container>
			</Box>

			<Container maxW="7xl">
				<Tabs.Root
					defaultValue="informatics"
					variant="outline"
					colorScheme="primary"
					size="lg"
					marginTop="5"
					justify="center"
				>
					<Tabs.List>
						<Tabs.Trigger value="informatics" fontWeight="medium">
							Informatics Researchers
						</Tabs.Trigger>
						<Tabs.Trigger value="data-science" fontWeight="medium">
							Data Science Researchers
						</Tabs.Trigger>
						<Tabs.Trigger value="information-system" fontWeight="medium">
							Information System Researchers
						</Tabs.Trigger>
						<Tabs.Trigger value="digital-business" fontWeight="medium">
							Digital Business Researchers
						</Tabs.Trigger>
					</Tabs.List>

					<Suspense fallback={<div>loading..</div>}>
						<Tabs.Content value="informatics">
							<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8} mt={8}>
								{informatics.authors.slice(0, 6).map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Tabs.Content>
						<Tabs.Content value="data-science">
							<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8} mt={8}>
								{dataSciences.authors.slice(0, 6).map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Tabs.Content>
						<Tabs.Content value="information-system">
							<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8} mt={8}>
								{informationSystems.authors.slice(0, 6).map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Tabs.Content>
						<Tabs.Content value="digital-business">
							<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8} mt={8}>
								{digitalBusinsess.authors.slice(0, 6).map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Tabs.Content>
					</Suspense>
				</Tabs.Root>

				<Box mt={20}>
					<Container>
						<Heading textAlign="center" fontSize={{ base: "2xl", md: "3xl" }}>
							Faculty Of Computer Science Researchers
						</Heading>

						<HomeGraph graphData={graphData} />
					</Container>
				</Box>

				<Box my={20}>
					<Heading textAlign="center" mb={12} fontSize={{ base: "2xl", md: "3xl" }}>
						Research Areas
					</Heading>

					<SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={8}>
						{expertiseAreas.map((area, index) => (
							<Box
								key={`area-${index}`}
								p={6}
								borderRadius="xl"
								boxShadow="sm"
								borderWidth="1px"
								transition="all 0.3s"
								_hover={{
									transform: "translateY(-5px)",
									boxShadow: "md",
									borderColor: "brand.200",
								}}
							>
								<Heading fontSize="lg" mb={3}>
									{area.name}
								</Heading>
								<Text fontSize="sm" color="gray.500">
									{area.description}
								</Text>
							</Box>
						))}
					</SimpleGrid>
				</Box>
			</Container>
		</Box>
	);
}
