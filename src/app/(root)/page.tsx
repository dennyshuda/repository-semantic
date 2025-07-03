import { AuthorCard } from "@/app/author/_components/AuthorCard";
import HomeGraph from "@/components/HomeGraph";
import { getAllAuthors } from "@/utils/actions/authors/get-all-authors";
import { getAuthorByDepartment } from "@/utils/actions/authors/get-author-department";
import { expertiseAreas } from "@/utils/constant";
import {
	Box,
	Button,
	Container,
	Grid,
	Heading,
	Input,
	InputGroup,
	SimpleGrid,
	Stack,
	Tabs,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { Suspense } from "react";
import { CiGlobe } from "react-icons/ci";
import { FiBookOpen, FiSearch } from "react-icons/fi";
import { GoPeople } from "react-icons/go";

export default async function Home() {
	const IAuthor = getAuthorByDepartment("informatika");
	const DSAuthor = getAuthorByDepartment("sains_data");
	const ISAuthor = getAuthorByDepartment("sistem_informasi");
	const DBAuthor = getAuthorByDepartment("bisnis_digital");
	const allAuthor = getAllAuthors({ name: "", department: "", expertise: "" });

	const [informatics, dataSciences, informationSystems, digitalBusinsess, authors] =
		await Promise.all([IAuthor, ISAuthor, DSAuthor, DBAuthor, allAuthor]);

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
			<Box as="section" paddingY="28">
				<Container maxW="7xl">
					<Stack gap={6} textAlign="center" maxW="3xl" mx="auto">
						<Heading
							as="h1"
							fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
							fontWeight="bold"
							lineHeight="shorter"
						>
							Discover Research Excellence at FASILKOM
						</Heading>
						<Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl" mx="auto" color="gray.500">
							Discover cutting-edge research and academic publications from our distinguished
							faculty and students. Advancing knowledge in computer science and technology
							innovation.
						</Text>
						<InputGroup
							startElement={<FiSearch color="gray.500" />}
							endElement={<Button>Search</Button>}
							mx="auto"
						>
							<Input
								size="lg"
								width="full"
								borderRadius="lg"
								placeholder="Input your keywords "
								_placeholder={{ color: "gray.500" }}
							/>
						</InputGroup>

						<Grid templateColumns={{ md: "repeat(3, 1fr)" }} gap="5">
							<Button
								asChild
								color="black"
								background="white"
								borderWidth="1px"
								borderColor="black"
								paddingX="10"
							>
								<Link href="/article">
									<FiBookOpen />
									Browse Articles
								</Link>
							</Button>
							<Button
								asChild
								color="black"
								background="white"
								borderWidth="1px"
								borderColor="black"
								paddingX="10"
							>
								<Link href="/author">
									<GoPeople />
									Find Authors
								</Link>
							</Button>
							<Button
								asChild
								color="black"
								background="white"
								borderWidth="1px"
								borderColor="black"
								paddingX="10"
							>
								<Link href="#researchareas">
									<CiGlobe /> Research Areas
								</Link>
							</Button>
						</Grid>
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
						<Tabs.Content
							value="informatics"
							_open={{
								animationName: "fade-in, scale-in",
								animationDuration: "300ms",
							}}
							_closed={{
								animationName: "fade-out, scale-out",
								animationDuration: "120ms",
							}}
						>
							<SimpleGrid columns={{ md: 2, lg: 3 }} gap={8} mt={8}>
								{informatics.authors.slice(0, 6).map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Tabs.Content>
						<Tabs.Content
							value="data-science"
							_open={{
								animationName: "fade-in, scale-in",
								animationDuration: "300ms",
							}}
							_closed={{
								animationName: "fade-out, scale-out",
								animationDuration: "120ms",
							}}
						>
							<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8} mt={8}>
								{dataSciences.authors.slice(0, 6).map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Tabs.Content>
						<Tabs.Content
							value="information-system"
							_open={{
								animationName: "fade-in, scale-in",
								animationDuration: "300ms",
							}}
							_closed={{
								animationName: "fade-out, scale-out",
								animationDuration: "120ms",
							}}
						>
							<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={8} mt={8}>
								{informationSystems.authors.slice(0, 6).map((author) => (
									<AuthorCard key={author.id} author={author} />
								))}
							</SimpleGrid>
						</Tabs.Content>
						<Tabs.Content
							value="digital-business"
							_open={{
								animationName: "fade-in, scale-in",
								animationDuration: "300ms",
							}}
							_closed={{
								animationName: "fade-out, scale-out",
								animationDuration: "120ms",
							}}
						>
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

				<Box my={20} id="researchareas">
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
