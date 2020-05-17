import React from "react";
import PieChartAnalysis from "./PieChartAnalysis";
import SearchBar from "./SearchBar";
import AvgBarAnalysis from "./AvgBarAnalysis";
import ComBar from "./ComBar";
import Dropdown from "./Dropdown";
import home from "../assets/home.png";

import RangeSlider from "./RangeSlider";
import Select from "react-select";

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
  }

  state = {
    selected_property_area: "",
    selected_property_bhk_array: "",
    selected_property_area_list: "",
    property_list_bangalore: "",
    property_list_chennai: "",
    property_list_mumbai: "",
    property_list_kolkata: "",
    selectedOption: null,
    bhk_array: [],
    location_array: [],
    value: 1,
    data_array: [],
  };

  final_bhk_array = [];
  final_location_array = [];

  currentValue(data) {
    this.setState({ value: data });
    const cityDataValue = this.findBHKavg(this.state.bhk_array, data);
    this.setState({ data_array: cityDataValue });
  }

  onSubmitCall = (term) => {
    this.setState({
      selected_property_area: term,
    });
    this.findProperty(term);
  };

  findingAvg(property_list) {
    var filter_length1 = property_list.filter((item) => {
      return item.bedroom === "1 BHK";
    }).length;

    var filter_length2 = property_list.filter((item) => {
      return item.bedroom === "2 BHK";
    }).length;

    var filter_length3 = property_list.filter((item) => {
      return item.bedroom === "3 BHK";
    }).length;

    var avg1 =
      property_list
        .filter((item) => {
          return item.bedroom === "1 BHK";
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / filter_length1;

    var avg2 =
      property_list
        .filter((item) => {
          return item.bedroom === "2 BHK";
        })
        .reduce((acc, val) => {
          return acc + parseInt(val.total_price);
        }, 0) / filter_length2;

    var avg3 =
      property_list
        .filter((item) => {
          return item.bedroom === "3 BHK";
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
    const url = "http://127.0.0.1:5000/api?location=" + location;
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
      const url = "http://127.0.0.1:5000/api?location=" + location;
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
      const res2 = await fetch("http://127.0.0.1:5000/api?location=bangalore"); 
      const property_list_bangalore = await res2.json();
      console.log(property_list_bangalore);
      this.setState({
        property_list_bangalore,
      });
      const res3 = await fetch("http://127.0.0.1:5000/api?location=mumbai"); 
      const property_list_mumbai = await res3.json();
      console.log(property_list_mumbai);
      this.setState({
        property_list_mumbai,
      });
      const res4 = await fetch("http://127.0.0.1:5000/api?location=chennai"); 
      const property_list_chennai = await res4.json();
      console.log(property_list_chennai);
      this.setState({
        property_list_chennai,
      });
      const res5 = await fetch("http://127.0.0.1:5000/api?location=kolkata"); 
      const property_list_kolkata = await res5.json();
      console.log(property_list_kolkata);
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
          <div
            style={{ height: "100vh", width: "100vw"}}
          >
            <div>
              <PieChartAnalysis data={this.state.selected_property_area_list} />
            </div>
            <div>
              <AvgBarAnalysis data={this.state.selected_property_area_list} />
            </div>
            <div>
              <Select
                closeMenuOnSelect={false}
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                isMulti
              />
            </div>
            <div>
              <span>
                <RangeSlider currentValue={this.currentValue} />
              </span>
              {this.state.value}
            </div>
            <div>
              <ComBar
                bhk={this.state.data_array}
                city={this.state.location_array}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
