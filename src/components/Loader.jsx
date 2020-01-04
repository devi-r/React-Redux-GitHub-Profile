import React, { Component } from "react";
import loader from "../assets/img/loader.gif";

class Loader extends Component {
  render() {
  
    return (
      <div>
        {this.props.showLoader ?
          <div className="loader-container">
            <div className="loader-title">{this.props.action} ...</div>
            <img src={loader} alt="loader ..."/>
          </div>
        :null}
      </div>
    );
  }
}

export default Loader;
