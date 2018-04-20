import React, { Component } from 'react';
import './skeleton.css'
import './normalize.css'
import './resourceList.css'

class ResourceList extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      <div className="list-container">
        <div className="row">
          <h2>Resources given</h2>
        </div>
        <div className="row">
          <hr/>
          <nav className="navigation primary">
            <ul className="navbar-list">
              <li className="navbar-item"><a className="navbar-link">Day</a></li>
              <li className="navbar-item"><a className="navbar-link">Month</a></li>
              <li className="navbar-item"><a className="navbar-link">Year</a></li>
              <li className="navbar-item"><a className="navbar-link">All time</a></li>
            </ul>
          </nav>
        </div>
        <div>
          <h1>Stuff</h1>
        </div>
      </div>
    );
  }
}

export default ResourceList;