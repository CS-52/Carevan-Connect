import React, { Component } from 'react';
import './Resources.css'
import './skeleton.css'

class Item extends Component {
  render() {
    return (
      <li className="item">
        <div className="row vertical-center">
          <div className="one-third column">
            <img class="resourceimg" src={require("" + this.props.icon)} alt="glasses icon" />
          </div>
          <div className="one-third column">
            {this.props.name}
          </div> 
          <div className="one-third column">
            {this.props.count}
          </div>
        </div>
      </li>
    );
  }
}

export default Item;