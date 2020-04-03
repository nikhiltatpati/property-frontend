import React from "react";

class SearchBar extends React.Component {
  state = {
    term: ""
  };

  onSubmitCall = event => {
    event.preventDefault();
    this.props.onChange(this.state.term);
  };

  render() {
    return (
<div>
          <nav className="navbar navbar-dark bg-dark">
            <a className="navbar-brand" style={{ color: "white" }}>
              Blacklight
            </a>
            <form class="form-inline" onSubmit={this.onSubmitCall}>
              <div class="input-group">
                <input
                  style={{ marginRight: 20 }}
                  type="text"
                  class="form-control"
                  placeholder="City Name"
                  aria-label="City Name"
                  aria-describedby="basic-addon1"
                  onChange={event => {
                    this.setState({
                      term: event.target.value
                    });
                  }}
                />
              </div>
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
        </div>
      
    );
  }
}
export default SearchBar;
