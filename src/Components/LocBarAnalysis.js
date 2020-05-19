import React from "react";
import LocBar from "./LocBar";

export default class LocBarAnalysis extends React.Component {
  constructor(props) {
    super(props);

    this.calculateAvg = this.calculateAvg.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  getLocation() {
    let location_array = [];
    this.props.data.map((item) => {
      if (item.location && !location_array.includes(item.location) && item.location!="3 BHK Apartment") {
        location_array.push(item.location);
      }
    });
    return location_array;
  }

  calculateAvg(location_array, range) {
    let data_array = [];

    location_array.forEach((element) => {
      const len = this.props.data
        .filter((elem) => {
          return elem.bedroom === `${range} BHK`;
        })
        .filter((item) => {
          return item.location === element && item.total_price;
        }).length;

      const avg =
        this.props.data
          .filter((item) => {
            return item.location === element && item.total_price;
          })
          .reduce((acc, val) => {
            return acc + parseInt(val.total_price);
          }, 0) / len;

      data_array.push(avg);
    });

    return data_array;
  }

  render() {
    const location_array = this.getLocation();

    const data_array = this.calculateAvg(location_array, this.props.range);
    return (
      <>
        <LocBar bhk={data_array} location={location_array} />
      </>
    );
  }
}
