import React, { Component } from 'react';
import redPin from './imgs/red-map-pin.svg'
import './currLocBar.css'
import './skeleton.css'


class CurrLocBar extends Component {
  render() {
    return (     
      <div className="location-bar">
        <img src={redPin} className="red-pin"/> 
        <div className="location-text">
          <div class="intro-line"> THE CAREVAN IS CURRENTLY AT </div>
          <div class="loc-line"> {this.props.curr.label.split(",")[0]} </div>
          <div class="address-line"> {this.props.curr.label} </div>
          <div className="editable-info">
            <div>
              <span class="from-next-field"> FROM </span>
              <span class="info-field">  {this.props.start} - {this.props.end} </span>
            </div>
            <div>
              <span class="from-next-field"> NEXT STOP </span>
              <span class="info-field">  {this.props.next.label.split(",")[0]} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrLocBar;