import { AuthorFilters, useAuthorFilters } from "@/hooks/useAuthorFilters";
import {
	Box,
	Button,
	createListCollection,
	Flex,
	Heading,
	Input,
	InputGroup,
	Portal,
	Select,
	Text,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "use-debounce";

export function AuthorListFilters() {
	const pathname = usePathname();
	const router = useRouter();
	const { name, department, expertise, setFilters, clearFilter } = useAuthorFilters();

	const [localName, setLocalName] = useState<AuthorFilters["name"] | "">(name ? name : "");

	const [debouncedName] = useDebounce(localName, 1000);

	useEffect(() => {
		router.push(pathname + "?" + setFilters({ name: debouncedName }));
	}, [debouncedName, pathname, router, setFilters]);

	const departments = createListCollection({
		items: [
			{ label: "Informatika", value: "informatika" },
			{ label: "Sistem Informasi", value: "sistem_informasi" },
			{ label: "Bisnis Digital", value: "bisnis_digital" },
			{ label: "Sains Data", value: "sains_data" },
		],
	});

	const expertises = createListCollection({
		items: [
			{ label: "Web Programming", value: "Web Programming" },
			{ label: "Data Mining", value: "Data Mining" },
			{ label: "Computer Vision", value: "Computer Vision" },
			{ label: "Software Engineering", value: "Software Engineering" },
		],
	});

	return (
		<Box p={8} borderRadius="xl" boxShadow="sm" borderWidth="1px" mb={8}>
			<Heading size="lg" mb={2}>
				Find Researchers & Faculty
			</Heading>
			<Text color="gray.500" mb={6}>
				Discover leading researchers, faculty members, and experts in various fields of computer
				science.
			</Text>

			<Flex align="center" gap="5">
				<Box width="full">
					<InputGroup color="black" startElement={<FiSearch color="black" />}>
						<Input
							size="lg"
							w="full"
							borderRadius="full"
							value={localName}
							placeholder="Search author's name"
							onChange={(e) => setLocalName(e.target.value)}
						/>
					</InputGroup>
				</Box>

				<Select.Root
					collection={departments}
					size="sm"
					width="320px"
					value={department ? [department] : []}
					onValueChange={(e) =>
						router.push(pathname + "?" + setFilters({ department: e.value[0] }))
					}
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Department " />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{departments.items.map((department) => (
									<Select.Item item={department} key={department.value}>
										{department.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>

				<Select.Root
					collection={expertises}
					size="sm"
					width="320px"
					value={expertise ? [expertise] : []}
					onValueChange={(e) => router.push(pathname + "?" + setFilters({ expertise: e.value[0] }))}
				>
					<Select.HiddenSelect />
					<Select.Control>
						<Select.Trigger>
							<Select.ValueText placeholder="Expertise " />
						</Select.Trigger>
						<Select.IndicatorGroup>
							<Select.Indicator />
						</Select.IndicatorGroup>
					</Select.Control>
					<Portal>
						<Select.Positioner>
							<Select.Content>
								{expertises.items.map((expertise) => (
									<Select.Item item={expertise} key={expertise.value}>
										{expertise.label}
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
					</Portal>
				</Select.Root>

				<Box px={4} py={2}>
					<Button
						size="sm"
						colorScheme="brand"
						width="full"
						onClick={() => {
							clearFilter();
							setLocalName("");
						}}
					>
						Clear Filters
					</Button>
				</Box>
			</Flex>
		</Box>
	);
}
