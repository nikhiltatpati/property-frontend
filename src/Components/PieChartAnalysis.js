import React from "react";
import PieChart from "./PieChart";

export default class PieChartAnalysis extends React.Component {
  state = {
    filter_length2: "",
    filter_length1: "",
    filter_length3: "",
    filter_length4: ""
  };

  componentDidMount() {}

  render() {
    var filter_length2 = this.props.data.filter(item => {
      return item.bedroom === "1 BHK";
    }).length;

    var filter_length3 = this.props.data.filter(item => {
      return item.bedroom === "2 BHK";
    }).length;

    var filter_length4 = this.props.data.filter(item => {
      return item.bedroom === "3 BHK";
    }).length;

    return (
      <div>
        {this.updateData}
        <PieChart bhk={[filter_length2, filter_length3, filter_length4]} />
      </div>
    );
  }
}
