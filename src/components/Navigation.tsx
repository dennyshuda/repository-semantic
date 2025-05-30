import { Box, Container, Flex, Image, Stack } from "@chakra-ui/react";
import Link from "next/link";

export function Navigation() {
	return (
		<Box position="sticky" top="0" zIndex="1000" shadow="sm" background="white">
			<Container maxW="7xl">
				<Flex minH={"60px"} py={{ base: 2 }} align={"center"} justify="space-between">
					<Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }} align="center">
						<Link href="/">
							<Flex align="center">
								<Image src="/FASILKOM.png" alt="Logo" h="30px" mr={3} />
							</Flex>
						</Link>

						<Flex display={{ base: "none", md: "flex" }} ml={10}>
							<Stack direction={"row"} gap={4}>
								<Box p={2} fontSize={"sm"} fontWeight={500}>
									<Link href="/">Home</Link>
								</Box>
								<Box p={2} fontSize={"sm"} fontWeight={500}>
									<Link href="/article">Research</Link>
								</Box>
								<Box p={2} fontSize={"sm"} fontWeight={500}>
									<Link href="/author">Author</Link>
								</Box>
							</Stack>
						</Flex>
					</Flex>
				</Flex>
			</Container>
		</Box>
	);
}
