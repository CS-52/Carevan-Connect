import React, { Component } from 'react';
import firebase from "./firebase";
import './skeleton.css'
import './normalize.css'
import './resourceList.css'
import Item from './Item'

class ResourceList extends Component {
  // static defaultProps = {
  //   items: [
  //     {
  //       name: "glasses",
  //       count: 15,
  //       icon: "./imgs/glasses_icon.svg"
  //     }, 
  //     {
  //       name: "socks",
  //       count: 9,
  //       icon: "./imgs/socks_icon.png"
  //     }, 
  //     {
  //       name: "blankets",
  //       count: 7,
  //       icon: "./imgs/blanket_icon.png"
  //     },
  //     {
  //       name: "haircut vouchers",
  //       count: 13,
  //       icon: "./imgs/haircut_icon.png"
  //     },
  //     {
  //       name: "hygiene kits",
  //       count: 17,
  //       icon: "./imgs/hygiene_icon.png"
  //     },
  //     {
  //       name: "feminine products",
  //       count: 21,
  //       icon: "./imgs/feminine_icon.png"
  //     }
  //   ]
  // };

  constructor() {
    super();
    this.state = {
      //resources: [],
      defaultItems: ["glasses", "socks", "blankets", "haircut", "hygiene", "feminine"]
    }
  }

  getImage = (itemName, itemCategory) => {
    const iconPrefix = itemName.split(" ")[0];
    if (this.state.defaultItems.includes(iconPrefix)) {
      return "./imgs/icons/" + iconPrefix + "_icon.png";
    } else {
      return "./imgs/generics/" + itemCategory + ".png";
    }
  }

  render() {
    return (
      <div className="list-container">
        <div className="row">
          <h2 className="resources-given">resources given</h2>
        </div>

        <div className = "bigbuttonsandicannotlie">
              <button className="bts" id="today">today</button>
              <button className="bts" id="month">month</button>
              <button className="bts" id="year">year</button>
              <button className="bts" id="allTime">all time</button>
        </div>
     
        <ul className="resource-list">
          {this.props.resources.map((item, index) => 
            <Item 
              key={index}
              {...item}
              icon={this.getImage(item.name, item.category)}
            />
          )}
        </ul>
      </div>

    );
  }
}

export default ResourceList;

//<Resources items={this.props.items} />
//icon={this.getImage(item.name, item.category)}