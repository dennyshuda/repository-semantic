"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface GraphNode {
	id: string;
	name: string;
	image: string;
	x?: number;
	y?: number;
	fx?: number | null;
	fy?: number | null;
}

interface GraphLink {
	source: string;
	target: string;
}

interface GraphData {
	nodes: GraphNode[];
	links: GraphLink[];
}

interface HomeGraphProps {
	graphData: GraphData;
}

const HomeGraph: React.FC<HomeGraphProps> = ({ graphData }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!svgRef.current) return;

		const svg = d3.select(svgRef.current);
		const width = svgRef.current.clientWidth;
		const height = svgRef.current.clientHeight;

		// Clear previous graph
		svg.selectAll("*").remove();

		// Create simulation
		const simulation = d3
			.forceSimulation<GraphNode>(graphData.nodes)
			.force(
				"link",
				d3
					.forceLink<GraphNode, GraphLink>(graphData.links)
					.id((d) => d.id)
					.distance(150)
			)
			.force("charge", d3.forceManyBody().strength(-500))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force("x", d3.forceX(width / 2).strength(0.05))
			.force("y", d3.forceY(height / 2).strength(0.05))
			.force("collision", d3.forceCollide(50));

		// Create links
		const link = svg
			.append("g")
			.attr("stroke", "#ddd")
			.attr("stroke-opacity", 0.8)
			.attr("stroke-width", 1.5)
			.selectAll("line")
			.data(graphData.links)
			.enter()
			.append("line");

		// Create nodes
		const node = svg
			.append("g")
			.selectAll("g")
			.data(graphData.nodes)
			.enter()
			.append("g")
			.call(
				d3
					.drag<SVGGElement, GraphNode>()
					.on("start", (event, d) => {
						if (!event.active) simulation.alphaTarget(0.3).restart();
						d.fx = d.x;
						d.fy = d.y;
					})
					.on("drag", (event, d) => {
						d.fx = event.x;
						d.fy = event.y;
					})
					.on("end", (event, d) => {
						if (!event.active) simulation.alphaTarget(0);
						d.fx = null;
						d.fy = null;
					})
			);

		// Append circular images
		node
			.append("defs")
			.append("clipPath")
			.attr("id", (d) => `clip-${d.id}`)
			.append("circle")
			.attr("r", 30);

		node
			.append("circle")
			.attr("r", 35)
			.attr("fill", "#ddd")
			.attr("stroke", "#666")
			.attr("stroke-width", 1.5);

		node
			.append("image")
			.attr("xlink:href", (d) => d.image)
			.attr("x", -30)
			.attr("y", -30)
			.attr("width", 60)
			.attr("height", 60)
			.attr("clip-path", (d) => `url(#clip-${d.id})`);

		// Append names
		node
			.append("text")
			.text((d) => d.name)
			.attr("dy", 50)
			.attr("text-anchor", "middle")
			.style("font-size", "12px")
			.style("fill", "#444");

		// Tick simulation
		simulation.on("tick", () => {
			link
				.attr("x1", (d) => (d.source as unknown as GraphNode).x!)
				.attr("y1", (d) => (d.source as unknown as GraphNode).y!)
				.attr("x2", (d) => (d.target as unknown as GraphNode).x!)
				.attr("y2", (d) => (d.target as unknown as GraphNode).y!);

			node.attr("transform", (d) => `translate(${d.x},${d.y})`);
		});

		return () => {
			simulation.stop();
		};
	}, [graphData]);

	return <svg ref={svgRef} width="100%" height="100vh"></svg>;
};

export default HomeGraph;
