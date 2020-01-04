import React, { Component } from "react";
import Avatar from '../components/Avatar.jsx';
import Button from '../components/Button.jsx';
import Octicon, {Organization,Location,Mail} from '@primer/octicons-react'


export class User extends Component {
  render() {
    return (
      <div className="user-card">
        <Avatar avatarDetails={this.props.userDetails} />
        <div>
          {this.props.userDetails.login}
        </div>
        <div>
          {this.props.userDetails.bio}
        </div>

        <Button data="Edit bio" />

        <div>
          <Octicon icon={Organization}/>
          {this.props.userDetails.company}
        </div>
        <div>
          <Octicon icon={Location}/>
          {this.props.userDetails.location}
        </div>
        <div>
          <Octicon icon={Mail}/>
          supreetsingh.247@gmail.com
        </div>
      </div>
    );
  }
}

export default User;
