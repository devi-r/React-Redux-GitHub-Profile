import React, { Component } from "react";
import User from '../../components/LeftContent/User.jsx';

export class LeftContent extends Component {
  render() {
    return (
      <div className="content-left-block">
        <User userDetails={this.props.content} />
      </div>
    );
  }
}

export default LeftContent;
