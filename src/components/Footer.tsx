import {
	Box,
	Container,
	Stack,
	SimpleGrid,
	Text,
	Link,
	Heading,
	Input,
	IconButton,
	Flex,
	Image,
} from "@chakra-ui/react";
import { FaTwitter, FaYoutube, FaInstagram, FaGithub, FaArrowRight } from "react-icons/fa";

export function Footer() {
	return (
		<Box borderTopWidth={1} borderStyle={"solid"}>
			<Container as={Stack} maxW={"7xl"} py={10}>
				<SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap={8}>
					<Stack gap={6}>
						<Flex align="center">
							<Image src="/placeholder.svg?height=30&width=30" alt="Logo" h="30px" mr={3} />
							<Text fontSize={"lg"} fontWeight="bold">
								FASILKOM Repository
							</Text>
						</Flex>
						<Text fontSize={"sm"}>
							The official academic repository of the Faculty of Computer Science, providing access
							to research papers, journals, and scholarly works.
						</Text>
						<Stack direction={"row"} gap={6}>
							<IconButton
								aria-label={"Twitter"}
								rounded="full"
								size="sm"
								color={"white"}
								bg={"brand.500"}
								_hover={{ bg: "brand.600" }}
							>
								<FaTwitter />
							</IconButton>
							<IconButton
								aria-label={"YouTube"}
								rounded="full"
								size="sm"
								color={"white"}
								bg={"brand.500"}
								_hover={{ bg: "brand.600" }}
							>
								<FaYoutube />
							</IconButton>
							<IconButton
								aria-label={"Instagram"}
								rounded="full"
								size="sm"
								color={"white"}
								bg={"brand.500"}
								_hover={{ bg: "brand.600" }}
							>
								<FaInstagram />
							</IconButton>
							<IconButton
								aria-label={"GitHub"}
								rounded="full"
								size="sm"
								color={"white"}
								bg={"brand.500"}
								_hover={{ bg: "brand.600" }}
							>
								<FaGithub />
							</IconButton>
						</Stack>
					</Stack>
					<Stack align={"flex-start"}>
						<Heading as="h5" fontSize="md" mb={2}>
							Resources
						</Heading>
						<Link href={"#"}>Journals</Link>
						<Link href={"#"}>Research Papers</Link>
						<Link href={"#"}>Conference Proceedings</Link>
						<Link href={"#"}>Theses & Dissertations</Link>
						<Link href={"#"}>Open Access</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<Heading as="h5" fontSize="md" mb={2}>
							Support
						</Heading>
						<Link href={"#"}>Help Center</Link>
						<Link href={"#"}>Author Guidelines</Link>
						<Link href={"#"}>Submission Process</Link>
						<Link href={"#"}>Copyright Policy</Link>
						<Link href={"#"}>Contact Us</Link>
					</Stack>
					<Stack align={"flex-start"}>
						<Heading as="h5" fontSize="md" mb={2}>
							Stay Updated
						</Heading>
						<Text>
							Subscribe to our newsletter for the latest publications and research updates.
						</Text>
						<Stack direction={"row"} width="full">
							<Input
								placeholder={"Your email address"}
								border={1}
								_focus={{
									bg: "whiteAlpha.300",
								}}
							/>
							<IconButton
								bg={"brand.500"}
								color={"white"}
								_hover={{
									bg: "brand.600",
								}}
								aria-label="Subscribe"
							>
								<FaArrowRight />
							</IconButton>
						</Stack>
					</Stack>
				</SimpleGrid>
			</Container>

			<Box borderTopWidth={1} borderStyle={"solid"}>
				<Stack
					maxW={"7xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					gap={4}
					justify={{ md: "space-between" }}
					align={{ md: "center" }}
				>
					<Text>© {new Date().getFullYear()} Faculty of Computer Science. All rights reserved</Text>
					<Stack direction={"row"} gap={6}>
						<Link href={"#"}>Privacy Policy</Link>
						<Link href={"#"}>Terms of Use</Link>
						<Link href={"#"}>Accessibility</Link>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
}
