import React from "react";
import Plot from "react-plotly.js";

export default function StockChart(props) {
  let xValues = [];
  let yValues = [];
  for (let data of props.priceData.historical) {
    xValues.push(data.date);
    yValues.push(data.close);
  }
  return (
    <Plot
      data={[
        {
          x: xValues,
          y: yValues,
          type: "scatter",
          mode: "lines",
          marker: {
            color:
              props.priceData.historical[0].close >
              props.priceData.historical[1].close
                ? "#00873c"
                : "red",
          },
        },
      ]}
      layout={{
        width: 575,
        height: 400,
        title: `${props.priceData.symbol} One Year Chart`,
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        font: {
          family: "Courier New, monospace",
          size: 16,
          color: "rgb(170 168 177)",
        },
      }}
    />
  );
}
