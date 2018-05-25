import React, { Component } from 'react';
import './skeleton.css'
import './normalize.css'
import './resourceList.css'
import Resources from './resources'

class ResourceList extends Component {
  static defaultProps = {
    items: [
      {
        name: "glasses",
        count: 15,
        icon: "./imgs/glasses_icon.svg"
      }, 
      {
        name: "socks",
        count: 9,
        icon: "./imgs/socks_icon.png"
      }, 
      {
        name: "blankets",
        count: 7,
        icon: "./imgs/blanket_icon.png"
      },
      {
        name: "haircut vouchers",
        count: 13,
        icon: "./imgs/haircut_icon.png"
      },
      {
        name: "hygiene kits",
        count: 17,
        icon: "./imgs/hygiene_icon.png"
      },
      {
        name: "feminine products",
        count: 21,
        icon: "./imgs/feminine_icon.png"
      }
    ]
  };

  render() {
    return (

      <div className="list-container">
      
        <div className="row">
          <h2 className="resources-given">resources given</h2>
        </div>
      

        <div className = "bigbuttonsandicannotlie">
              <button class="bts" id="today">today</button>
              <button class="bts" id="month">month</button>
              <button class="bts" id="year">year</button>
              <button class="bts" id="allTime">all time</button>
        </div>

          <Resources items={this.props.items} />
      </div>

    );
  }
}

export default ResourceList;