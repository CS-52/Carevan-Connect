import React, { Component } from 'react';
import socks_icon from './imgs/socks_icon.png'
import phc_logo from './phc_logo.png'
import circlelogo from './circlelogo.png'
import './App.css';
import './skeleton.css'
import './map.css'
import './Resources.css'
import SimpleMap from './map'
import ResourceList from './resourceList'
import CurrLocBar from './currLocBar'
import 'react-skeleton-css/styles/skeleton.2.0.4.css'


class App extends Component {
  render() {
    return (
      <div className="App">

        <div className="row">
        <img src={phc_logo} className="phc-logo" />
          <header className="App-header">
              <div className="navbar-it" id="first-link"><a href="www.projecthomelessconnect.org/about/" className="nav-link"> About Us <div className="arrow-down"></div> </a> </div> 
              <div className="navbar-it"><a href="www.projecthomelessconnect.org/programs/" className="nav-link">Programs <div className="arrow-down"></div> </a> </div>
              <div className="navbar-it"><a href="www.projecthomelessconnect.org/volunteer/" className="nav-link">Volunteer <div className="arrow-down"></div> </a></div>
              <div className="navbar-it" id="last-link"><a href="www.projecthomelessconnect.org/donate/" className="nav-link">Donate <div className="arrow-down"></div> </a></div>
           
          </header>
        </div> 


        <div class="titlebannerlogo">
          <img src={circlelogo} className="circlelogo"/> 
          <div class="bannertext">Launched in early 2017, the PHC CareVan - a 
          five-passenger van with supplies for a pop-up service event - 
          provides valuable resources and support for people experiencing homelessness 
          in San Francisco.</div> 
        </div>


        <div>
          <div className="one-third column">
            <ResourceList/>
          </div>
          <div className="two-thirds column">

            <div className="current-location-bar">
              <CurrLocBar/>
            </div>

            <div className="map">
              <SimpleMap/>
            </div>

            <div className="Donate">
              A $5 donation = 
              <img class="resourceimg" src={socks_icon}/> 
              <img class="resourceimg" src={socks_icon}/> 
              <img class="resourceimg" src={socks_icon}/> 
              <img class="resourceimg" src={socks_icon}/> 
              <img class="resourceimg" src={socks_icon}/> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button class="donatebutton">DONATE</button>
            </div>


          </div>
        </div>
      </div>
    );
  }
}

export default App;
