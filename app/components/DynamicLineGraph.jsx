"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  axisBottom,
  axisLeft,
  select,
  easeLinear,
  transition,
  curveCatmullRom,
} from "d3";
import { scaleLinear, line, max } from "d3";

import {
  datasets,
  AgrciultureProductionIndexNumber20142016100Int$,
} from "@/constants";

const DynamicLineGraph = () => {
  const title = "agricultural Trend"; //title
  const ylabel = "Values";
  const xlabel = "Years";
  const svgRef = useRef(null);

  const [data, setData] = useState(
    AgrciultureProductionIndexNumber20142016100Int$
  ); //for changing the dataset passed

  const first = Object.values(data[0]).slice(1,42)
  
  const [selection, setSelection] = useState(null);

  const dimensions = {
    //the actual graph plot
    charWidth: 300,
    charHeight: 300,
    marginLeft: 50,
  };

  const maxValue = max(first); //dynamic height

  let y = scaleLinear()//vertical scale
    .domain([0, maxValue * 1.1])
    .range([dimensions.charHeight, 0]); 

  let x = scaleLinear() //horizontal scale
    .domain([1980, 2022])
    .range([0, dimensions.charWidth]);

  const yAxis = axisLeft(y).tickFormat((d) => `${d}K`); //template string for potential units
  const xAxis = axisBottom(x).ticks(42);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
      selection.selectAll("*").remove();
      selection
        .append("g") //x axis
        .call(xAxis)
        .attr(
          "transform",
          `translate(${dimensions.marginLeft}, ${dimensions.charHeight})`
        );
      selection
        .append("g") //yaxis
        .call(yAxis)
        .attr("transform", `translate(${dimensions.marginLeft})`);

      selection//dots
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (_, i) => (i * dimensions.charWidth) / (data.length - 1))
        .attr("cy", (_,i) => y(first[i]))
        .attr("r", 4)
        .attr("transform", `translate(${dimensions.marginLeft})`)
        .attr("fill", "transparent")
        .transition()
        .duration(600)
        .delay((_, i) => i * 100)
        .attr("fill", "orange");

      const Myline = line(
        //plot
        (d) => x(d.Country),
        (d) => y(d.Column2)
      ).curve(curveCatmullRom.alpha(0.5)); //changes rounding of the curve

      const defaultline = line(
        //line before transition
        (d) => x(d.Country),
        (d) => y(d.Column2 * 0)
      );

      selection //line
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("d", Myline)
        .attr("transform", `translate(${dimensions.marginLeft},0)`)
        .attr("stroke-dasharray", dimensions.charWidth * 0)
        .attr("opacity", 0)
        .transition()
        .duration(10000)
        .delay(4000)
        .ease(easeLinear)
        .attr("stroke-dasharray", dimensions.charWidth * 30)

        .attr("opacity", 1);
    }
  }, [selection, data]);

  return (
    <div className="text-slate-400">
      {/* chart title */}
      <h1 className="uppercase text-center mb-10 font-bold text-2xl">
        {data[0].Country}
      </h1>
      <div className="">
        <div className="relative flex">
          <svg
            ref={svgRef}
            width={dimensions.charWidth + 100}
            height={dimensions.charHeight + 20}
            className="ps-6"
          ></svg>
          <div className="absolute -rotate-90 pe-6 text-sm">{ylabel}</div>
        </div>
        <h2 className="text-end me-6 ps-6 text-sm">{xlabel}</h2>{" "}
      </div>
      <div className="flex flex-wrap gap-8 justify-center mt-10 w-40 mx-auto">
        {/* {datasets.map(({ label, value }) => (
          <button
            onClick={() => {
              setData(value);
            }}
            className={`first:mx-16 h-6 w-6 rounded-full hover:bg-slate-300 hover:text-black border text-xs ${
              data == value ? "bg-slate-300" : ""
            }`}
          >
            {label}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default DynamicLineGraph;
