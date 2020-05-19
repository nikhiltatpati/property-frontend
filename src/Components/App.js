import React from "react";
import PieChartAnalysis from "./PieChartAnalysis";
import SearchBar from "./SearchBar";
import AvgBarAnalysis from "./AvgBarAnalysis";
import ComBar from "./ComBar";
import Dropdown from "./Dropdown";
import home from "../assets/home.png";
import LocBarAnalysis from "./LocBarAnalysis";

import RangeSlider from "./RangeSlider";
import Select from "react-select";
import Gmap from "./Gmap";

const options = [
  { value: "mumbai", label: "Mumbai" },
  { value: "kolkata", label: "Kolkata" },
  { value: "chennai", label: "Chennai" },
  { value: "bangalore", label: "Bangalore" },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.currentValue = this.currentValue.bind(this);
    this.findProperty = this.findProperty.bind(this);
    this.currentVal = this.currentVal.bind(this);
  }

  state = {
    selected_property_area: "",
    selected_property_bhk_array: "",
    selected_property_area_list: [],
    property_list_bangalore: "",
    property_list_chennai: "",
    property_list_mumbai: "",
    property_list_kolkata: "",
    selectedOption: null,
    bhk_array: [],
    location_array: [],
    value: 1,
    data_array: [],
    val: 1,
  };

  final_bhk_array = [];
  final_location_array = [];

  currentValue(data) {
    this.setState({ value: data });
    const cityDataValue = this.findBHKavg(this.state.bhk_array, data);
    this.setState({ data_array: cityDataValue });
  }

  currentVal(data) {
    this.setState({ val: data });
  }

  onSubmitCall = (term) => {
    this.setState({
      selected_property_area: term,
    });
    this.findProperty(term);
  };

  findingAvg(property_list) {
    var filter_length1 = property_list.filter((item) => {
      return item.bedroom === "1 BHK" && item.total_price;
    }).length;

    var filter_length2 = property_list.filter((item) => {
      return item.bedroom === "2 BHK" && item.total_price;
    }).length;

    var filter_length3 = property_list.filter((item) => {
      return item.bedroom === "3 BHK" && item.total_price;
    }).length;

    var avg1 =
      property_list
        .filter((item) => {
          return item.bedroom === "1 BHK" && item.total_price;
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / filter_length1;

    var avg2 =
      property_list
        .filter((item) => {
          return item.bedroom === "2 BHK" && item.total_price;
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / filter_length2;

    var avg3 =
      property_list
        .filter((item) => {
          return item.bedroom === "3 BHK" && item.total_price;
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / filter_length3;

    return [avg1, avg2, avg3];
  }

  findBHKavg(bhk_array, val) {
    if (val == 1) {
      var data_array = [];
      bhk_array.forEach((element) => {
        data_array.push(element[0]);
      });
    } else if (val == 2) {
      var data_array = [];
      bhk_array.forEach((element) => {
        data_array.push(element[1]);
      });
    } else {
      var data_array = [];
      bhk_array.forEach((element) => {
        data_array.push(element[2]);
      });
    }
    return data_array;
  }

  async fetchingData(location) {
    const url = "http://127.0.0.1:5000/api/multiple?location=" + location;
    const res1 = await fetch(url);
    const property_list = await res1.json();
    var avg_array = this.findingAvg(property_list);
    this.final_bhk_array.push(avg_array);
    this.final_location_array.push(location);
    this.setState({
      bhk_array: [
        this.state.selected_property_bhk_array,
        ...this.final_bhk_array,
      ],
      location_array: [
        this.state.selected_property_area,
        ...this.final_location_array,
      ],
    });
    const cityDataBHK = this.findBHKavg(
      [this.state.selected_property_bhk_array, ...this.final_bhk_array],
      this.state.value
    );
    this.setState({ data_array: cityDataBHK });
  }

  async findProperty(location) {
    try {
      const url = "http://127.0.0.1:5000/api/multiple?location=" + location;
      const res1 = await fetch(url);
      const selected_property_area_list = await res1.json();
      const avg_array = this.findingAvg(selected_property_area_list);
      this.setState({ bhk_array: [avg_array] });
      this.setState({ location_array: [location] });
      this.setState({ selected_property_bhk_array: avg_array });
      const cityDataBHK = this.findBHKavg([avg_array], this.state.value);
      this.setState({ data_array: cityDataBHK });

      this.setState({
        selected_property_area_list,
      });
      const res2 = await fetch(
        "http://127.0.0.1:5000/api/multiple?location=bangalore"
      );
      const property_list_bangalore = await res2.json();
      this.setState({
        property_list_bangalore,
      });
      const res3 = await fetch(
        "http://127.0.0.1:5000/api/multiple?location=mumbai"
      );
      const property_list_mumbai = await res3.json();
      this.setState({
        property_list_mumbai,
      });
      const res4 = await fetch(
        "http://127.0.0.1:5000/api/multiple?location=chennai"
      );
      const property_list_chennai = await res4.json();
      this.setState({
        property_list_chennai,
      });
      const res5 = await fetch(
        "http://127.0.0.1:5000/api/multiple?location=kolkata"
      );
      const property_list_kolkata = await res5.json();
      this.setState({
        property_list_kolkata,
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => {
      if (this.state.selectedOption) {
        this.final_bhk_array.length = 0;
        this.final_location_array.length = 0;
        this.state.selectedOption.forEach((element) => {
          var val = element.value;
          this.fetchingData(val);
        });
      }
    });
  };

  render() {
    const { selectedOption } = this.state;

    var filter_length0 = this.state.selected_property_area_list.length;

    var filter_length1 = this.state.selected_property_area_list.filter(
      (item) => {
        return item.bedroom === "1 BHK";
      }
    ).length;

    var filter_length2 = this.state.selected_property_area_list.filter(
      (item) => {
        return item.bedroom === "2 BHK";
      }
    ).length;

    var filter_length3 = this.state.selected_property_area_list.filter(
      (item) => {
        return item.bedroom === "3 BHK";
      }
    ).length;

    return (
      <div>
        <SearchBar onChange={this.onSubmitCall} />
        {!this.state.property_list_kolkata ? (
          <div
            style={{
              margin: 30,
            }}
          >
            <img
              style={{ display: "block", margin: "auto" }}
              height="600px"
              width="1000px"
              src={home}
            />
          </div>
        ) : (
          <div style={{ background: "#38c172" }}>
            <div className="card">
              <PieChartAnalysis data={this.state.selected_property_area_list} />
            </div>
            <div className="card" style={{ width: 375 }}>
              <div style={{ textAlign: "center" }}>
                <b>Total Houses Fetched</b>
              </div>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                {filter_length0}
              </div>
              <div style={{ textAlign: "center" }}>
                <b>Total 1 BHK fetched</b>
              </div>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                {filter_length1}
              </div>
              <div style={{ textAlign: "center" }}>
                <b>Total 2 BHK fetched</b>
              </div>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                {filter_length2}
              </div>
              <div style={{ textAlign: "center" }}>
                <b>Total 3 BHK fetched</b>
              </div>
              <div style={{ textAlign: "center", marginBottom: "10px" }}>
                {filter_length3}
              </div>
            </div>
            <div className="card" style={{ float: "right" }}>
              <AvgBarAnalysis data={this.state.selected_property_area_list} />
            </div>

            <div className="card">
              <ComBar
                bhk={this.state.data_array}
                city={this.state.location_array}
              />
              <div
                style={{
                  display: "inline-block",
                  marginLeft: "27%",
                }}
              >
                <span>
                  <RangeSlider currentValue={this.currentValue} />
                </span>
                <span
                  style={{ marginLeft: "40%" }}
                >{`${this.state.value} BHK`}</span>
              </div>
              <Select
                closeMenuOnSelect={false}
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                isMulti
              />
            </div>
            <div className="card" style={{ float: "right" }}>
              <LocBarAnalysis
                data={this.state.selected_property_area_list}
                range={this.state.val}
              />
              <div
                style={{
                  display: "inline-block",
                  marginLeft: "27%",
                }}
              >
                <span>
                  <RangeSlider currentValue={this.currentVal} />
                </span>
                <span
                  style={{ marginLeft: "40%" }}
                >{`${this.state.val} BHK`}</span>
              </div>
            </div>

            <div>
              <Gmap data={this.state.selected_property_area_list} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
