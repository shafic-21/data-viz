import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const BubbleChart = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  // const [width, setWidth] = useState(null);
  // const [height, setHeight] = useState(null);

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const container = d3.select(containerRef.current);
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const innerCountryNodes = data.nodes
      .filter((n) => n.type != "region")
      .map((d) => d.data.nodes);
    const innerCountryLinks = data.nodes
      .filter((n) => n.type != "region")
      .map((d) => d.data.links);
   
    const links = [...innerCountryLinks, ...data.links.map((d) => ({ ...d }))];
    const nodes = [
      ...innerCountryNodes.slice(1),
      ...data.nodes.map((d) => ({ ...d })),
    ];

     console.log(links);

    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-100))
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(0)
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius(({ type }) => (type == "region" ? 50 : 20))
          .iterations(3)
      )
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      // .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", Math.sqrt(2));

    const node = svg.append("g").selectAll("g").data(nodes).join("g");

    node
      .append("circle")
      .attr("r", ({ type }) => (type == "region" ? 40 :type=="country"? 10:5))
      .attr("fill", ({ type }) =>
        type == "region" ? "white" : type == "country" ? "yellow" : "lightgreen"
      )
      .attr("opacity", ({ type }) => (type == "region" ? 0.5 : 1));

    node.each(function (d) {
      d.group = this;
    });
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

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <svg ref={svgRef} />
    </div>
  );
};

export default BubbleChart;
