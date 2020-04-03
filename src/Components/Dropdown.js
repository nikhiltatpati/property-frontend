import React, { Component } from "react";

class Dropdown extends Component {
  constructor() {
    super();

    this.state = {
      showMenu: false,
      property: []
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    this.setState({
      property: this.props.plist
    });
  }

  filterProperty(val) {
    if (val === "") {
      this.setState({ property: this.props.plist });
    } else {
      this.setState({
        property: this.props.plist.filter(item => {
          return item.bedroom === val;
        })
      });
    }
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener("click", this.closeMenu);
      });
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.showMenu}>Select BHK</button>
        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <button onClick={() => this.filterProperty("")}>ALL</button>
            <button onClick={() => this.filterProperty("1 BHK")}>1 BHK</button>
            <button onClick={() => this.filterProperty("2 BHK")}>2 BHK</button>
            <button onClick={() => this.filterProperty("3 BHK")}>3 BHK</button>
          </div>
        ) : null}
        <div>
          {console.log(this.state.property)}
          {!this.props.plist ? (
            <div></div>
          ) : (
            // <PropertyList
            //   property={
            //     !this.state.property ? this.props.state.selected_area_property_list : this.state.property
            //   }
            //   bhk={[
            //     this.state.filter_length2,
            //     this.state.filter_length3,
            //     this.state.filter_length4
            //   ]}
            // />
            <div></div>
          )}
        </div>
      </div>
    );
  }
}

export default Dropdown;
