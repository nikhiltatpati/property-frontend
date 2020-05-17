import React from "react";
export default class RangeSlider extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 1,
    };
    this.handleChange = this.handleChange.bind(this);
  }

    

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.props.currentValue(event.target.value);
  }

  render() {
    return (
      <div>
        <input
          style={{ marginRight: 10 }}
          id="typeinp"
          type="range"
          min="1"
          max="3"
          value={this.state.value}
          onChange={this.handleChange}
          step="1"
        />
      </div>
    );
  }
}
