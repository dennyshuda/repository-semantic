"use client";

import { useToggle } from "@/hooks/useToggle";
import {
	Box,
	Button,
	CloseButton,
	Container,
	Drawer,
	Flex,
	IconButton,
	Image,
	Portal,
	Stack,
	Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export function Navigation() {
	const { value: open, toggle: setOpen } = useToggle();

	const links = [
		{ label: "Home", href: "/" },
		{ label: "Article", href: "/article" },
		{ label: "Author", href: "/author" },
	];

	return (
		<Box position="sticky" top="0" zIndex="1000" shadow="sm" background="white">
			<Container maxW="7xl">
				<Flex minH="80px" py={{ base: 2 }} align="center" justify="space-between">
					<Link href="/">
						<Flex align="center">
							<Image src="/FASILKOM.png" alt="Logo" h="20px" mr={3} />
							<Box>
								<Text fontWeight="bold" color="orange.500">
									FASILKOM Repository
								</Text>
								<Text fontSize="xs" color="gray.500">
									UPN &quot;Veteran&quot; East Java
								</Text>
							</Box>
						</Flex>
					</Link>

					<Flex display={{ base: "none", md: "flex" }} gap={4}>
						<Stack direction={"row"} gap={4}>
							{links.map(({ label, href }, index) => (
								<Box key={index} p={2} fontSize="md" fontWeight={500}>
									<Link href={href}>{label}</Link>
								</Box>
							))}
						</Stack>
						<Button asChild>
							<Link href="/login">Sign In</Link>
						</Button>
					</Flex>

					<IconButton onClick={setOpen} display={{ md: "none", lg: "none", xl: "none" }}>
						<GiHamburgerMenu />
					</IconButton>
				</Flex>

				<Drawer.Root open={open} onOpenChange={setOpen}>
					<Portal>
						<Drawer.Backdrop />
						<Drawer.Positioner>
							<Drawer.Content>
								<Drawer.Header>
									<Drawer.Title></Drawer.Title>
								</Drawer.Header>
								<Drawer.Body>
									<Stack gap={4} mt={4}>
										{links.map(({ label, href }, index) => (
											<Link key={index} href={href} passHref>
												<Box fontSize="lg" fontWeight="semibold">
													{label}
												</Box>
											</Link>
										))}
										<Button asChild colorScheme="blue">
											<Link href="/login">Sign In</Link>
										</Button>
									</Stack>
								</Drawer.Body>
								<Drawer.CloseTrigger asChild>
									<CloseButton size="sm" />
								</Drawer.CloseTrigger>
							</Drawer.Content>
						</Drawer.Positioner>
					</Portal>
				</Drawer.Root>
			</Container>
		</Box>
	);
}
