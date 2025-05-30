import { Box } from "@chakra-ui/react";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box as="main">
			<Navigation />
			{children}
			<Footer />
		</Box>
	);
}
