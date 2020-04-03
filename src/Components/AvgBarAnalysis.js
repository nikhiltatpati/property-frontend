import React from "react";
import AvgBar from "./AvgBar";

export default class AvgBarAnalysis extends React.Component {
  state = {
    filter_length2: "",
    filter_length1: "",
    filter_length3: "",
    filter_length4: ""
  };

  componentDidMount() {
    var res;
    if (!this.props.data) {
      res = [];
    } else {
      res = this.props.data;
    }
    this.setState({
      filter_length1: res.length,
      filter_length2: res.filter(item => {
        return item.bedroom === "1 BHK";
      }).length,
      filter_length3: res.filter(item => {
        return item.bedroom === "2 BHK";
      }).length,

      filter_length4: res.filter(item => {
        return item.bedroom === "3 BHK";
      }).length
    });
  }

  render() {
    var avg1 =
      this.props.data
        .filter(item => {
          return item.bedroom === "1 BHK";
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / this.state.filter_length2;

    var avg2 =
      this.props.data
        .filter(item => {
          return item.bedroom === "2 BHK";
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / this.state.filter_length3;

    var avg3 =
      this.props.data
        .filter(item => {
          return item.bedroom === "3 BHK";
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / this.state.filter_length4;

    return <AvgBar bhk={[avg1, avg2, avg3]} />;
  }
}
