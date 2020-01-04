import React, { Component } from "react";
import Octicon, {Check} from '@primer/octicons-react';


export class DropDownInput extends Component {
  render() {
    return (
      <div className={`dropdown ${this.props.className}`}>
        <details open={this.props.defaultOpen}>
          <summary className="btn">
            <i>{this.props.title}: </i>
            <span>
              {this.props.defaultOption}
            </span>
            <span className="dropdown-caret"></span>
          </summary>

          <details-menu>
            <div className="SelectMenu">
              <div className="SelectMenu-modal">
                <header className="SelectMenu-header">
                  <span className="SelectMenu-title">Select {this.props.title}</span>
                </header>
                <div className="SelectMenu-list">
                	{this.props.options.map((option) => { 
                    return (
                    	<div className="SelectMenu-item" key={option}>
                        <label>
            							<input type="radio" name={this.props.name} id={option} defaultValue={option}  onChange={(e) => this.props.changeEvent(e)} checked={(this.props.defaultOption === option) ? true : false} hidden="hidden" />
            							<Octicon icon={Check} className={`check-icon ${(this.props.defaultOption === option) ? 'xVisible' : 'xInvisible'}`}/>
            							<span className="text-normal">{option}</span>
                        </label>
    	                </div>
    	              )
    	            })}               
                </div>
              </div>
            </div>
          </details-menu>
        </details>
      </div>
    );
  }
}

export default DropDownInput;
