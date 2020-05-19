import React from "react";
import { Bar } from "react-chartjs-2";

export default class LocBar extends React.Component {
  render() {
    return (
      <div style={{ height: 300, width: 500 }}>
        <Bar
          data={{
            labels: this.props.location,
            datasets: [
              {
                label: "Avg Price per location",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: this.props.bhk,
              },
            ],
          }}
          options={{
            title: {
              display: true,
              text: "Average Price of houses in current city",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}
