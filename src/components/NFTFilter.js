import React, { Component } from "react";

class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <div className="filter-token">
          Sort By
        </div>
        <div className="filter-sort">
          Sort By{" "}
          <select>
            <option value="sale_date"> Most Recent </option>
          </select>
        </div>
      </div>
    );
  }
}

export default Filter;