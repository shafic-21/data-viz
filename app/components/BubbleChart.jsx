import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { regionColors } from "@/constants";


const BubbleChart = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const regionColorScale = d3
    .scaleOrdinal()
    .domain(Object.keys(regionColors))
    .range(Object.values(regionColors));
  // const [width, setWidth] = useState(null);
  // const [height, setHeight] = useState(null);

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const container = d3.select(containerRef.current);
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const flagSize = 20;

    const links = data.links
      .filter((d) => d.type !== "data-link")
      .map((d) => ({ ...d }));
    const nodes = data.nodes
      .filter((d) => d.type !== "data-point")
      .map((d) => ({ ...d }));
    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-80))
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
          .radius((d) => (d.type == "region" ? 50 :d.type == "country"? 30:10))
          .iterations(3)
      )
      .force("x", d3.forceX())
      .force("y", d3.forceY());

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.selectAll("*").remove();

    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.2)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", Math.sqrt(2));

    const node = svg.append("g").selectAll("g").data(nodes).join("g");

    svg
      .append("defs")
      .append("clipPath")
      .attr("id", "flag-clip")
      .append("circle")
      .attr("r", flagSize);

    node
      .append("circle")
      .attr("r", ({ type }) => (type == "region" ? 50 : type=="country"?flagSize:5))
      .attr(
        "fill",
        (d) => (d.type == "region" ? regionColorScale(d.name) : "lightblue") // Changed to white for better flag visibility
      );

    node
      .filter((d) => d.type === "country")
      .append("image")
      .attr(
        "xlink:href",
        (d) => `https://hatscripts.github.io/circle-flags/flags/${d.code}.svg`
      )
      .attr("width", flagSize * 2) // Double the flag size
      .attr("height", flagSize * 2) // Double the flag size
      .attr("x", -flagSize) // Center the image
      .attr("y", -flagSize) // Center the image
      .attr("clip-path", "url(#flag-clip)");

    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    node
      .on("mouseover", (event, d) => {
        setTooltipData(d);
        setTooltipPosition({ x: event.pageX, y: event.pageY });
      })
      .on("mouseout", () => {
        setTooltipData(null);
      });

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
      {/* {tooltipData && (
      
         
              <div
                style={{
                  position: "absolute",
                  left: tooltipPosition.x,
                  top: tooltipPosition.y,
                  backgroundColor:"#FFF",
                  width: 1,
                  height: 1,
                }}
              >
                <p>
                  <strong>{tooltipData.name}</strong>
                </p>
                <p>Region: {tooltipData.region}</p>
                <p>Value: {tooltipData.value}</p>
              </div>
    
        )} */}
    </div>
  );
};

export default BubbleChart;
