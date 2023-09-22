import { useEffect } from "react";
import * as d3 from "d3";
import data from "./data.json";
import "./App.css";

function App() {
  useEffect(() => {
    runD3();
  }, []);

  function runD3() {
    let svgElement = document.getElementById("svg");
    let today = new Date().getDay();

    const w = document.getElementById("bar-chart").clientWidth;
    const h = document.getElementById("bar-chart").clientHeight;

    if (!svgElement) {
      // create a tooltip
      var tooltip = d3
        .select("#bar-chart")
        .append("div")
        .append("pre")
        .attr("id", "tooltip");

      //mouse events for the tooltip to show on hover
      let mouseover = function () {
        tooltip.style("opacity", 1);
      };

      let mousemove = function () {
        let amount = d3.select(this).attr("amount");
        let x = d3.select(this).attr("x") - 8;
        let y = d3.select(this).attr("y") - 60;

        tooltip
          .text("$" + amount)
          .style("left", x + "px")
          .style("top", y + "px");
      };

      let mouseleave = function () {
        tooltip.style("opacity", 0);
      };

      let svg = d3
        .select("#bar-chart")
        .append("svg")
        .attr("id", "svg")
        .attr("width", w)
        .attr("height", h);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * (w / data.length) + 5)
        .attr("y", (d) => h - d.amount * 3 - 20)
        .attr("width", w / data.length - 10)
        .attr("height", (d) => d.amount * 3)
        .attr("rx", 5)
        .attr("ry", 5)
        .attr("amount", (d) => d.amount)
        .attr("class", (d, i) => {
          if (i === today - 1) {
            console.log(today, i);
            return "hover";
          }
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);

      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.day)
        .attr("x", (d, i) => {
          let limiter;
          if (w === 510) {
            limiter = 20;
          } else limiter = 5;

          return i * (w / data.length) + limiter;
        })
        .attr("y", h);
    }
  }

  return (
    <>
      <section className="header">
        <div>
          <p>My balance</p>
          <h2>$921.48</h2>
        </div>
        <img src="./images/logo.svg" alt="Logo" />
      </section>
      <section className="barchart-container">
        <h2>Spending - Last 7 days</h2>
        <div id="bar-chart"></div>
        <div className="total">
          <div>
            <p className="total-label">Total this month</p>
            <h1>$478.33</h1>
          </div>
          <p>
            <span>+2.4%</span>
            <br /> from last month
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
