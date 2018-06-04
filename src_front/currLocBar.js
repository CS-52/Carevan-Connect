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
          <div class="loc-line"> Martin de Porres House of Hospitality </div>
          <div class="address-line"> 225 Potrero Ave, San Francisco, 94103 </div>
          <div className="editable-info">
            <div>
              <span class="from-next-field"> FROM</span>
              <span class="info-field">  3:00 PM - 5:00 PM </span>
            </div>
            <div>
              <span class="from-next-field"> NEXT STOP</span>
              <span class="info-field">  San Francisco Public Library</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrLocBar;