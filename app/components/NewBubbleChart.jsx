"use client";
import * as d3 from "d3";

import { CountryData } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

const NewBubbleChart = ({ data }) => {
  const [dataset, setDataset] = useState(data[0].data.slice(0, 20));

  const svgRef = useRef(null);

  const graph = {
    nodes: [...dataset],
    links: [{ source: "Angola", target: "Ghana" }],
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("class", "svg");
    const width = svg.attr("width", 1000);
    const height = svg.attr("height", 1000);

    const link = svg
      .append("g")
      .selectAll("line")
      .data(graph.links)
      .enter()
      .append("line")
      .attr("stroke-width", () => 2)
      .style("stroke", "black");

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(graph.nodes)
      .enter()
      .append("circle")
      .attr("r", (d) => (d.value * 100) / 500)
      .attr("fill", (d) => "pink");
    // .attr("stroke", "yellow");

    const simulation = d3
      .forceSimulation(graph.nodes)
      .force(
        "links",
        d3.forceLink(graph.links).id((d) => d.country)
      )
      .force("charge", d3.forceManyBody().strength(-10))
      .force("center", d3.forceCenter(500 / 2, 500 / 2))
      .on("tick", ticked);

    const drag = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    function dragstarted(e,d) {
      simulation.alphaTarget(0.3).restart();
      d.fx = e.x;
      d.fy = e.y;
    }
    function dragged(e,d) {
      d.fx = e.x;
      d.fy = e.y
    }

    function dragended(e,d) {
      simulation.alphaTarget(0);
      d.fx =null;
      d.fy = null;
    }

    node.call(drag);

    function ticked() {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    }
  }, []);

  return <svg ref={svgRef} />;
};

export default NewBubbleChart;
