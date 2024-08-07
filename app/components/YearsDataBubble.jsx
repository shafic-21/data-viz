"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const YearsDataBubble = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef) return;
    setWidth(containerRef.current?.clientWidth);
    setHeight(containerRef.current?.clientHeight);
    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    svg
      .attr("viewBox", [0, 0, width, height])
      // .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

    const yearRadius = 20;
    const dataRadius = 5;

    const colorScale = d3
      .scaleThreshold()
      .domain([0, 5, 7.5, 10, 30, 50])
      .range([
        "#808080", // Gray for no data
        "#E6EFF4", // Lightest blue for 0-5
        "#BDD7E7", // Light blue for 5-7.5
        "#6BAED6", // Medium blue for 10-30
        "#3182BD", // Dark blue for 30-50
        "#08519C", // Darkest blue for 50 or more
      ]);

    const links = data.links.map((d) => ({ ...d }));
    const nodes = data.nodes.map((d) => ({ ...d }));

    const simulation = d3
      .forceSimulation(nodes)
      // .force(
      //   "link",
      //   d3
      //     .forceLink(links)
      //     .id((d) => d.id)
      //     .distance(0)
      // )
      .force("charge", d3.forceManyBody().strength(-15))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) => (d.type === "year" ? yearRadius : dataRadius + 2))
          .iterations(3)
      )
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    // This is a line for each link - this links the countries to the data
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(2));

    const node = svg.append("g").selectAll("g").data(nodes).join("g");

    node
      .append("circle")
      .attr("r", (d) => (d.type === "year" ? yearRadius : dataRadius))
      .attr("fill", (d) => (d.type === "year" ? "white" : colorScale(d.value)));

    node
      .append("text")
      .text((d) => (d.type == "year" ? d.year : ""))
      .attr("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#000");

    node
      .append("title")
      .text((d) => (d.type === "year" ? d.year : `${d.id}: ${d.value}`));

    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // function updateVisualization() {
    //   width = container.clientWidth;
    //   height = container.clientHeight;

    //   svg.attr("viewBox", `0 0 ${width} ${height}`);

    //   simulation
    //     .force("center", d3.forceCenter(width / 2, height / 2))
    //     .force("x", d3.forceX(width / 2).strength(0.1))
    //     .force("y", d3.forceY(height / 2).strength(0.1))
    //     .alpha(0.3)
    //     .restart();
    // }

    //WHen drag starts this fixes the node position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // This updates the dragged node position during drag
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    // updateVisualization();
    // window.addEventListener("resize", updateVisualization);

    return () => {
      simulation.stop();
      // window.removeEventListener("resize", updateVisualization);
    };
  }, [data, width, height]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
      className="flex flex-grow"
    >
      <svg ref={svgRef} />
    </div>
  );
};

export default YearsDataBubble;
