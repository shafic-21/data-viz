import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useChartDataStore, useYearListStore } from "@/store";
import { toast } from "sonner";

const BubbleChart = ({ data }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const { activeYear } = useYearListStore();

  const {
    activeData,
    updateActiveData,
    compareData,
    addCompareData,
    removeCompareData,
    compareMode,
  } = useChartDataStore();

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const springBack = (selection, targetX, targetY) => {
    selection
      .transition()
      .duration(300)
      .ease(d3.easeElastic)
      .attr("transform", `translate(${targetX},${targetY})`);
  };

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const container = d3.select(containerRef.current);
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const regionValues = data.nodes
      .filter((d) => d.type === "region")
      .map((d) => d.value);

    const regionSizeScale = d3
      .scaleLinear()
      .domain([d3.min(regionValues), d3.max(regionValues)])
      .range([40, 100]);

    const countryValues = data.nodes
      .filter((d) => d.type === "country" && d.value !== -1)
      .map((d) => d.value);

    const countrySizeScale = d3
      .scaleLinear()
      .domain([d3.min(countryValues), d3.max(countryValues)])
      .range([5, 30]);

    const links = data.links.map((d) => ({ ...d }));

    const nodes = data.nodes
      .filter((d) => Number(d.year) === activeYear)
      .map((d) => ({ ...d }));

    // console.log(nodes,data, activeYear);

    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.name)
          .distance(0)
      )
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3
          .forceCollide()
          .radius((d) =>
            d.type === "region"
              ? regionSizeScale(d.value) + 2
              : (d.value === -1 ? 10 : countrySizeScale(d.value)) + 2
          )
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

    node
      .append("circle")
      .attr("r", (d) =>
        d.type === "region"
          ? regionSizeScale(d.value)
          : d.value === -1
          ? 10
          : countrySizeScale(d.value)
      )
      .attr("fill", (d) => (d.type === "region" ? d.color : "lightblue"))
      .attr("opacity", (d) => (d.value === -1 ? 0.2 : 1));

    node
      .filter((d) => d.type === "country")
      .each(function (d) {
        const flagSize = d.value === -1 ? 10 : countrySizeScale(d.value);
        d3.select(this)
          .append("clipPath")
          .attr("id", `clip-${d.code}`)
          .append("circle")
          .attr("r", flagSize);

        d3.select(this)
          .append("image")
          .attr(
            "xlink:href",
            `https://hatscripts.github.io/circle-flags/flags/${d.code}.svg`
          )
          .attr("width", flagSize * 2)
          .attr("height", flagSize * 2)
          .attr("x", -flagSize)
          .attr("y", -flagSize)
          .attr("clip-path", `url(#clip-${d.code})`)
          .attr("opacity", d.value === -1 ? 0.2 : 1);
      });

    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    node.on("click", (event, d) => {
      if (!compareMode) {
        updateActiveData(d.name);
        console.log("clicked Active");
      } else {
        if (compareData.length < 5) {
          addCompareData({ code: d.code, color: d.color, name: d.name });
          console.log("hello");
        } else {
          toast("You can compare a maximum of 5 region", {
            description: "Remove one region to add",
          });
        }
      }
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      const radius =
        event.subject.type === "region"
          ? regionSizeScale(event.subject.value)
          : event.subject.value === -1
          ? 10
          : countrySizeScale(event.subject.value);

      event.subject.fx = clamp(event.x, radius, width - radius);
      event.subject.fy = clamp(event.y, radius, height - radius);
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);

      const radius =
        event.subject.type === "region"
          ? regionSizeScale(event.subject.value)
          : event.subject.value === -1
          ? 10
          : countrySizeScale(event.subject.value);

      const targetX = clamp(event.subject.x, radius, width - radius);
      const targetY = clamp(event.subject.y, radius, height - radius);

      if (targetX !== event.subject.x || targetY !== event.subject.y) {
        springBack(d3.select(this), targetX, targetY);
      }

      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [data, activeYear, updateActiveData, compareMode, compareData]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full max-h-[400px] 2xl:max-h-[600px]"
    >
      <svg ref={svgRef} className="overflow-visible" />
    </div>
  );
};

export default BubbleChart;
