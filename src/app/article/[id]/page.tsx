import { getArticleById } from "@/utils/actions/articles/get-article-id";
import {
	Avatar,
	Box,
	Breadcrumb,
	Button,
	Link as ChakraLink,
	Flex,
	HStack,
	Heading,
	Icon,
	Separator,
	Tag,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaFileAlt, FaLink } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";

export default async function ArticlePageId({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const data = await getArticleById(id);

	return (
		<Box as="main">
			<Box maxW="1200px" mx="auto" p={{ base: 4, md: 6, lg: 8 }}>
				<Breadcrumb.Root mb={6} fontSize="sm">
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link>Home</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link>Article</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item fontSize="sm">
							<Link href={data.article.id}>{data.article.id}</Link>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<Heading
					textTransform="uppercase"
					lineHeight={1.2}
					fontWeight={700}
					fontSize={{ base: "xl", sm: "2xl", lg: "4xl" }}
				>
					{data.article.title}
				</Heading>

				<Flex align="center" my={6}>
					<Text color="gray.600" mr={4}>
						<Icon mr={2} color="brand.500">
							<FiCalendar />
						</Icon>
						Published: {data.article.year}
					</Text>

					<ChakraLink
						href={data.article.doi}
						target="_blank"
						display="flex"
						alignItems="center"
						color="blue.600"
					>
						<Icon mr={1}>
							<FaLink />
						</Icon>
						DOI: {data.article.doi}
					</ChakraLink>
				</Flex>
				<Separator my={6} />

				<Flex direction={{ base: "column", md: "row" }} gap={6} mb={8}>
					<Box flex="1">
						<Heading as="h2" size="lg" mb={4}>
							Authors
						</Heading>

						<Flex wrap="wrap" gap={2} mb={6}>
							{data.article.collaborators?.map((author) => (
								<Flex key={author.id} align="center" mr={4} mb={2}>
									<Avatar.Root size="sm" mr={2} borderColor="blue.200">
										<Avatar.Fallback name={author.name} />
										<Avatar.Image src={author.image} />
									</Avatar.Root>

									<Box>
										<Link href={`/author/${author.id}`}>{author.name}</Link>
										<Text fontSize="sm" color="gray.600">
											{author.department}
										</Text>
									</Box>
								</Flex>
							))}
						</Flex>

						<Flex wrap="wrap" gap={2} mb={6}>
							{data?.article?.keywords?.split(",").map((keyword: string) => (
								<Tag.Root key={keyword} colorScheme="blue" size="md" textTransform="capitalize">
									<Tag.Label>{keyword}</Tag.Label>
								</Tag.Root>
							))}
						</Flex>

						<HStack>
							<Button>
								<FaFileAlt />
								<ChakraLink href={data.article.doi} target="_blank" color="white">
									Link Full Text
								</ChakraLink>
							</Button>
						</HStack>
					</Box>

					<Box width={{ base: "100%", md: "300px" }}>
						<Box bg="blue.50" p={4} borderRadius="md" mb={4}>
							<Heading as="h3" size="sm" mb={2}>
								Publisher
							</Heading>
							<Text as="span" fontWeight="bold">
								{data.article.publisher}
							</Text>
						</Box>
					</Box>
				</Flex>

				<Box mb={8}>
					<Heading as="h2" size="lg" mb={4}>
						Abstract
					</Heading>

					<Box
						bg="gray.50"
						textAlign="justify"
						p={4}
						borderRadius="md"
						whiteSpace="pre-line"
						lineHeight="tall"
					>
						{data?.article.abstract}
					</Box>
				</Box>

				<Separator my={8} />
			</Box>
		</Box>
	);
}
