import React, { Component } from "react";

export class Avatar extends Component {
  render() {
    return (
      <div className="avatar-block">
        <div>
          <img src={this.props.avatarDetails.avatar_url} alt={this.props.avatarDetails.name} />
        </div>
        <div>
          {this.props.avatarDetails.name}
        </div>
      </div>
    );
  }
}

export default Avatar;
