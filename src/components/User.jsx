import React, { Component } from "react";
import Button from '../components/Button.jsx';
import Octicon, {Organization,Location,Mail} from '@primer/octicons-react';



export class User extends Component {
  render() {
    return (
      <div className="user-card">
        <div className="user-card-top">
          <div className="user-image">
            <img src={this.props.userDetails.avatar_url} alt={this.props.userDetails.name} />
          </div>
          <div className="user-info">
            <div className="user-name-block">
              <div className="user-name">
                {this.props.userDetails.name}
              </div>

              <div className="user-login">
                {this.props.userDetails.login}
              </div>
            </div>

            <Button data="Edit bio"/>
          </div>
        </div>
        <div className="user-card-bottom">
          <div>
            {this.props.userDetails.bio}
          </div>
          <div>
            <span className="icon"><Octicon icon={Organization}/></span>
            <span className="icon-text">{this.props.userDetails.company}</span>
          </div>
          <div>
            <span className="icon"><Octicon icon={Location}/></span>
            <span className="icon-text">{this.props.userDetails.location}</span>
          </div>
          <div>
            <span className="icon"><Octicon icon={Mail}/></span>
            <span className="icon-text"><a className="user-email" href="mailto:supreetsingh.247@gmail.com" target="blank">supreetsingh.247@gmail.com</a></span>
          </div>
        </div>
      </div>
      
    );
  }
}

export default User;
