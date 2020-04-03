import React from "react";
import { Bar } from "react-chartjs-2";

export default class AvgBar extends React.Component {
  render() {
    return (
      <div style={{ height: 300, width: 500 }}>
        <Bar
          data={{
            labels: ["1 BHK", "2 BHK", "3 BHK"],
            datasets: [
              {
                label: "Avg Price",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: this.props.bhk
              }
            ]
          }}
          options={{
            title: {
              display: true,
              text: "Average Price of houses in current city",
              fontSize: 20
            },
            legend: {
              display: true,
              position: "right"
            }
          }}
        />
      </div>
    );
  }
}
