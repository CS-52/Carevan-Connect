import React, { Component } from 'react';
import firebase from './firebase'
import './resourceList.css'
import './skeleton.css'

class Item extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.icon);
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

//<img class="resourceimg" src={require("" + this.props.icon)} alt="glasses icon" />
//<img class="resourceimg" src={ this.state.img } alt={this.props.name + " icon"} />