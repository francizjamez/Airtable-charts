import React from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ data }) => {
  return (
    <Line
      height={250}
      responsive={true}
      data={data}
      options={{
        hover: {
          mode: "nearest",
          intersect: false,
        },
        maintainAspectRatio: false,
        bezierCurve: false,
        legend: { display: false },
        scales: {
          yAxes: [
            {
              // gridLines: { display: false },
              ticks: {
                fontColor: "#7171A6",
                maxTicksLimit: 5,
                callback: function (value, index, values) {
                  return value.toLocaleString("en-US", {
                    // style: "currency",
                    // currency: "USD",
                    compactDisplay: "short",
                    notation: "compact",
                    minimumSignificantDigits: 3,
                    maximumSignificantDigits: 3,
                  });
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: { display: false },
              ticks: {
                fontColor: "#7171A6",
              },
            },
          ],
        },
      }}
    />
  );
};

export default LineChart;
