import React from "react";
import { Bar } from "react-chartjs-2";

export default class AvgCom extends React.Component {
  render() {
    return (
      <div style={{ height: 300, width: 500 }}>
        <Bar
          data={{
            labels: this.props.city,
            datasets: [
              {
                label: "Avg Price",
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
              text: "Comparison between houses of different cities.",
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
