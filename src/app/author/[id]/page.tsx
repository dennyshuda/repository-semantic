import AuthorNetwork from "@/components/AuthorNetwork";
import { getAuthorById } from "@/utils/actions/authors/get-author-id";
import {
	Avatar,
	Badge,
	Box,
	Breadcrumb,
	Container,
	Flex,
	Heading,
	HStack,
	Separator,
	Table,
	Tag,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";

export default async function AuthorPageId({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;

	const data = await getAuthorById(id);

	return (
		<Box as="main">
			<Container maxW={"7xl"} py={8}>
				<Breadcrumb.Root mb={6} fontSize="sm">
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Link href="/">Home</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Link href="/author">Author</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.CurrentLink>
							<Link href={data?.author.id}>Details</Link>
						</Breadcrumb.CurrentLink>
					</Breadcrumb.List>
				</Breadcrumb.Root>

				<Flex justify="space-between" align="center">
					<Flex direction={["column", "row"]} gap={8} paddingY="5">
						<Avatar.Root size="2xl" borderWidth="3px" borderColor="blue.200">
							<Avatar.Fallback name={data?.author?.name} />
							<Avatar.Image src={data.author.image} />
						</Avatar.Root>

						<Box flex="1">
							<Heading as="h1" size="xl" mb={2}>
								{data?.author?.name}
							</Heading>

							<Text fontSize="xl" color="gray.600" mb={4}>
								{data?.author?.nip}
							</Text>

							<HStack gap={2} mb={4}>
								<Badge colorScheme="blue" px={2} py={1}>
									<Link href="/">{data?.author?.email}</Link>
								</Badge>
							</HStack>

							<Flex wrap="wrap" gap={2} mb={4}>
								{data?.author?.expertises?.map((interest: string) => (
									<Tag.Root key={interest} size="md" variant="subtle" colorScheme="blue">
										<Tag.Label key={interest}>{interest}</Tag.Label>
									</Tag.Root>
								))}
							</Flex>
						</Box>
					</Flex>

					<Box width={{ base: "100%", md: "300px" }}>
						<Box bg="blue.50" p={4} borderRadius="md" mb={4}>
							<Heading as="h3" size="sm" mb={2}>
								Major
							</Heading>
							<Text as="span" fontWeight="bold">
								{data?.author.department}
							</Text>
						</Box>
					</Box>
				</Flex>

				<Separator size="md" marginBottom="5" />

				<Box mb={8}>
					<Heading as="h2" size="lg" mb={4}>
						Articles ({data?.author?.articles.length ?? 0})
					</Heading>

					<Box overflowX="auto">
						<Table.Root variant="outline">
							<Table.Header>
								<Table.Row>
									<Table.ColumnHeader>Title</Table.ColumnHeader>
									<Table.ColumnHeader>Year</Table.ColumnHeader>
								</Table.Row>
							</Table.Header>
							{data?.author.articles.length !== 0 ? (
								<Table.Body>
									{data?.author?.articles.map((pub, index: number) => (
										<Table.Row key={index}>
											<Table.Cell textTransform="uppercase">
												<Link href={`/article/${pub.id}`}>{pub.title}</Link>
											</Table.Cell>
											<Table.Cell>{pub.year}</Table.Cell>
										</Table.Row>
									))}
								</Table.Body>
							) : (
								<Table.Body>
									<Table.Row>
										<Table.Cell>No data</Table.Cell>
										<Table.Cell>No data</Table.Cell>
									</Table.Row>
								</Table.Body>
							)}
						</Table.Root>
					</Box>
				</Box>

				<Box>
					<Heading as="h2" size="lg" mb={4}>
						Newtork Collaboration
					</Heading>

					{data.author.collaborators.length !== 0 ? (
						<AuthorNetwork
							author={{
								id: data.author.id,
								name: data.author.name,
								imageUrl: data.author.image,
							}}
							collaborators={data.author.collaborators}
						/>
					) : (
						<Text>No data</Text>
					)}
				</Box>
			</Container>
		</Box>
	);
}
