/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

interface AuthorNode {
	id: string;
	name: string;
	type: string;
	imageUrl: string;
}

interface Link {
	source: string;
	target: string;
}

interface GraphData {
	nodes: AuthorNode[];
	links: Link[];
}

interface AuthorNetworkProps {
	author: {
		id: string;
		name: string;
		imageUrl: string;
	};

	collaborators: {
		id: string;
		name: string;
		image: string;
	}[];
}

const AuthorNetwork = ({ author, collaborators }: AuthorNetworkProps) => {
	const svgRef = useRef<SVGSVGElement>(null);

	const graphData: GraphData = {
		nodes: [
			{ id: author.id, name: author.name, imageUrl: author.imageUrl, type: "main" },
			...collaborators
				.filter((item) => item.id !== author.id)
				.map((c) => ({
					id: c.id,
					name: c.name,
					imageUrl: c.image,
					type: "collaborator",
				})),
		],
		links: collaborators?.map((c) => ({
			source: author.id,
			target: c.id,
		})),
	};

	useEffect(() => {
		if (!svgRef.current) return;

		const svg = d3.select(svgRef.current);
		const width = 600;
		const height = 400;

		// Clear previous render
		svg.selectAll("*").remove();

		// Create simulation
		const simulation = d3
			.forceSimulation(graphData?.nodes as d3.SimulationNodeDatum[])
			.force(
				"link",
				d3
					.forceLink(graphData.links)
					.id((d: any) => d.id)
					.distance(100)
			)
			.force("charge", d3.forceManyBody().strength(-500))
			.force("center", d3.forceCenter(width / 2, height / 2));

		// Draw links
		const link = svg
			.append("g")
			.selectAll("line")
			.data(graphData.links)
			.enter()
			.append("line")
			.attr("stroke", "#999")
			.attr("stroke-width", 2);

		// Draw nodes
		const node = svg
			.append("g")
			.selectAll("circle")
			.data(graphData.nodes)
			.enter()
			.append("g")
			.call(
				d3
					.drag<SVGGElement, AuthorNode>()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended)
			);

		node
			.append("circle")
			.attr("r", (d) => (d.type === "main" ? 40 : 25))
			.attr("fill", (d) => (d.type === "main" ? "#805AD5" : "#3182CE"));

		node
			.append("clipPath")
			.attr("id", (d) => `clip-${d.id}`)
			.append("circle")
			.attr("r", (d) => (d.type === "main" ? 40 : 25));

		node
			.append("image")
			.attr("xlink:href", (d) => d.imageUrl)
			.attr("width", (d) => (d.type === "main" ? 80 : 50))
			.attr("height", (d) => (d.type === "main" ? 80 : 50))
			.attr("x", (d) => (d.type === "main" ? -40 : -25))
			.attr("y", (d) => (d.type === "main" ? -40 : -25))
			.attr("clip-path", (d) => `url(#clip-${d.id})`)
			.attr("preserveAspectRatio", "xMidYMid slice");

		node
			.append("text")
			.text((d) => d.name)
			.attr("dy", (d) => (d.type === "main" ? 55 : 35))
			.attr("text-anchor", "middle")
			.attr("fill", "black")
			.style("font-size", "10px");

		// Update positions
		simulation.on("tick", () => {
			link
				.attr("x1", (d: any) => d.source.x)
				.attr("y1", (d: any) => d.source.y)
				.attr("x2", (d: any) => d.target.x)
				.attr("y2", (d: any) => d.target.y);

			node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
		});

		// Drag functions
		function dragstarted(event: any, d: any) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event: any, d: any) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event: any, d: any) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		return () => {
			simulation.stop();
		};
	}, [graphData.links, graphData.nodes]);

	return (
		<svg
			ref={svgRef}
			width="100%"
			height="400px"
			viewBox="0 0 600 400"
			style={{ border: "1px solid #eee", borderRadius: "8px" }}
		/>
	);
};

export default AuthorNetwork;
