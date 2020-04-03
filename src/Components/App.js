import React from "react";
import PieChartAnalysis from "./PieChartAnalysis";
import SearchBar from "./SearchBar";
import AvgBarAnalysis from "./AvgBarAnalysis";
import ComBarAnalysis from "./ComBarAnalysis";
import Dropdown from "./Dropdown";

export default class App extends React.Component {
  state = {
    selected_property_area: "",
    selected_property_area_list: "",
    property_list_bangalore: "",
    property_list_chennai: "",
    property_list_mumbai: "",
    property_list_kolkata: ""
  };

  onSubmitCall = term => {
    this.setState({
      selected_property_area: term
    });
    this.findProperty(term);
  };

  async findProperty(location) {
    try {
      const url = "http://127.0.0.1:5000/api?location=" + location;
      const res1 = await fetch(url); // fetching the data from api, before the page loaded
      const selected_property_area_list = await res1.json();
      console.log(selected_property_area_list);
      this.setState({
        selected_property_area_list
      });
      const res2 = await fetch("http://127.0.0.1:5000/api?location=bangalore"); // fetching the data from api, before the page loaded
      const property_list_bangalore = await res2.json();
      console.log(property_list_bangalore);
      this.setState({
        property_list_bangalore
      });
      const res3 = await fetch("http://127.0.0.1:5000/api?location=mumbai"); // fetching the data from api, before the page loaded
      const property_list_mumbai = await res3.json();
      console.log(property_list_mumbai);
      this.setState({
        property_list_mumbai
      });
      const res4 = await fetch("http://127.0.0.1:5000/api?location=chennai"); // fetching the data from api, before the page loaded
      const property_list_chennai = await res4.json();
      console.log(property_list_chennai);
      this.setState({
        property_list_chennai
      });
      const res5 = await fetch("http://127.0.0.1:5000/api?location=kolkata"); // fetching the data from api, before the page loaded
      const property_list_kolkata = await res5.json();
      console.log(property_list_kolkata);
      this.setState({
        property_list_kolkata
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div>
        <SearchBar onChange={this.onSubmitCall} />
        {!this.state.property_list_kolkata ? (
          <div>Loading.....</div>
        ) : (
          <div style={{ height: 600, width: 1000 }}>
            <PieChartAnalysis data={this.state.selected_property_area_list} />
            <AvgBarAnalysis data={this.state.selected_property_area_list} />
            <ComBarAnalysis />
          </div>
        )}
      </div>
    );
  }
}
