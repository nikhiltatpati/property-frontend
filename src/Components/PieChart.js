import React from "react";
import { Pie } from "react-chartjs-2";

export default class PieChart extends React.Component {
  render() {
    return (
      <div style={{ height: 300, width: 500 }}>
        <Pie
          data={{
            labels: ["1 BHK", "2 BHK", "3 BHK"],
            datasets: [
              {
                label: "BHK",
                backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00"],
                hoverBackgroundColor: ["#501800", "#4B5000", "#175000"],
                data: this.props.bhk
              }
            ]
          }}
          options={{
            title: {
              display: true,
              text: "Total no. of houses fetched",
              fontSize: 15
            },
            legend: {
              display: true,
              position: "bottom"
            }
          }}
        />
      </div>
    );
  }
}
