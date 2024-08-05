"use client"

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { CountryData } from "@/types";

const BubbleChart = ({ data }:{data: CountryData[]}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const width = 800;
    const height = 800;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous content
    svg.selectAll("*").remove();

    const bubble = d3.pack().size([width, height]).padding(1.5);

const root = d3
  .hierarchy({ children: data } as { children: CountryData[] })
  .sum((d: CountryData | { children: CountryData[] }) => {
    if ("scores" in d) {
      const validScores = d.scores.filter((s) => s.value !== null);
      return validScores.length > 0
        ? d3.mean(validScores, (s) => s.value as number) || 0
        : 0;
    }
    return 0;
  });

    const nodes = bubble(root).descendants().slice(1);

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .style("fill", (_, i) => d3.schemeCategory10[i % 10]);

    node
      .append("text")
      .attr("dy", ".3em")
      .style("text-anchor", "middle")
      .style("font-size", (d) => `${d.r / 5}px`)
      .text((d) => {
        const countryData = d.data as CountryData;
        return countryData.country;
      });
  }, [data]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <svg ref={svgRef} className="max-w-full max-h-full" />
    </div>
  );
};

export default BubbleChart;
