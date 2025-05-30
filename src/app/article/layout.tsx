import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Box } from "@chakra-ui/react";

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box as="main">
			<Navigation />
			{children}
			<Footer />
		</Box>
	);
}
