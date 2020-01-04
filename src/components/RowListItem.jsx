import React, { Component } from "react";

export class RowListItem extends Component {
  render() {
    return (
      <li className="row-item">
        <div>
          {this.props.children}
        </div>
      </li>
    );
  }
}

export default RowListItem;
