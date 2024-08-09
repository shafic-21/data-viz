"use client";
import React, { useEffect, useRef, useState } from "react";
import { axisBottom, axisLeft, select, easeElastic } from "d3";
import { scaleLinear, scaleBand, line, max } from "d3";

const dataset = [
  //testing with eastern values
  { name: "Burundi", number: 0.9 },
  { name: "Comoros", number: 0.4 },
  { name: "Djibouti", number: 10 },
  { name: "Eritrea", number: 10 },
  { name: "Ethiopia", number: 39.5 },
  { name: "Kenya", number: 19.9 },
  { name: "Madagascar", number: 3.1 },
  { name: "Malawi", number: 2.4 },
  { name: "Mauritius", number: 0.4 },
  { name: "Mozambique", number: 10 },
  { name: "Rwanda", number: 3.2 },
  { name: "Seychelles", number: 0.1 },
  { name: "Somalia", number: 10 },
  { name: "South Sudan", number: 10 },
  { name: "Tanzania", number: 16.2 },
  { name: "Uganda", number: 10.6 },
  { name: "Zambia", number: 0.9 },
  { name: "Zimbabwe", number: 10 },
];

const DynamicLineGraph = () => {
  const title = "this is a demo title"; //title
  const ylabel = "Values";
  const xlabel = "Countries";
  const svgRef = useRef(null);

  const [data, setData] = useState(dataset); //for changing the dataset passed
  const [selection, setSelection] = useState(null);

  const dimensions = {
    //the actual graph plot
    charWidth: 1000,
    charHeight: 400,
    marginLeft: 50,
  };

  const maxValue = max(data, (d) => d.number); //dynamic height

  let y = scaleLinear().domain([0, maxValue]).range([dimensions.charHeight, 0]); //vertical scale

  let x = scaleBand() //horizontal scale
    .domain(data.map((d) => d.name))
    .range([0, dimensions.charWidth])
    .paddingInner(1);

  const yAxis = axisLeft(y).tickFormat((d) => `${d}K`); //template string for potential units
  const xAxis = axisBottom(x);

  useEffect(() => {
    if (!selection) {
      setSelection(select(svgRef.current));
    } else {
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

      selection
        .append("g")
        .selectAll("dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", (_, i) => (i * dimensions.charWidth) / (dataset.length - 1))
        .attr("cy", (d, i) => y(d.number))
        .attr("r", 5)
        .attr("fill", "orange")
        .attr(
          "transform",
          `translate(${dimensions.marginLeft})`
        );
        

      const Myline = line(
        //plot
        (d) => x(d.name),
        (d) => y(d.number)
      );

      const defaultline = line(
        //line before transition
        (d) => x(d.name),
        (d) => y(d.number * 0)
      );

      selection //line
        .append("path")
        .datum(data)
        .attr("d", defaultline)
        .attr("transform", `translate(${dimensions.marginLeft},0)`)
        .transition()
        .duration(1000)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1)
        .attr("d", Myline)
        .attr("transform", `translate(${dimensions.marginLeft},0)`);
    }
  }, [selection]);

  return (
    <div className="">
      {/* chart title */}
      <h1 className="uppercase text-center mb-20 font-bold text-4xl">
        {title}
      </h1>
      <div className="flex">
        <div className="flex flex-col justify-center">
          <h2 className="-rotate-90 h-fit w-full">{ylabel}</h2>
        </div>
        <div className="">
          <svg
            ref={svgRef}
            width={dimensions.charWidth + 100}
            height={dimensions.charHeight + 20}
          ></svg>
          <h2 className="text-center mt-4">{xlabel}</h2>
        </div>
      </div>
    </div>
  );
};

export default DynamicLineGraph;
