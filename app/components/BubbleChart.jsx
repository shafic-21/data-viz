import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BubbleChart = () => {
  const svgRef = useRef();
    const data = [
      { id: 1, radius: 20, color: "#1f77b4" },
      { id: 2, radius: 30, color: "#ff7f0e" },
      { id: 3, radius: 25, color: "#2ca02c" },
      { id: 4, radius: 10, color: "#d62728" },
      { id: 5, radius: 40, color: "#9467bd" },
      // Add more data points as needed
    ];


  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

  
    const simulation = d3
      .forceSimulation(data)
      .force("charge", d3.forceManyBody().strength(5))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.radius + 2)
      )
      .on("tick", ticked);

    function ticked() {
    const u = svg
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("r", (d) => d.radius)
      .attr("cx", (d) => d.x)
      .attr("cy", (d) => d.y)
      .attr("fill", (d) => d.color)
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget)
          .attr("stroke", "#000")
          .attr("stroke-width", 2);
        const tooltip = svg
          .append("text")
          .attr("x", d.x)
          .attr("y", d.y - d.radius - 10)
          .attr("text-anchor", "middle")
          .attr("font-size", "12px")
          .attr("fill", "#000")
          .text(`Radius: ${d.radius}`);
        d.tooltip = tooltip;
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget).attr("stroke", "none");
        d.tooltip.remove();
      })
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }

    simulation.nodes(data);
  }, [data]);

  return <svg ref={svgRef} width={800} height={600}></svg>;
};

export default BubbleChart;
