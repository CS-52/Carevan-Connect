import React, { Component } from 'react';
import firebase from './firebase'
import socks_icon from './imgs/icons/socks_icon.png'
import phc_logo from './phc_logo.png'
import circlelogo from './circlelogo.png'
import './App.css';
import './skeleton.css'
import './map.css'
import SimpleMap from './map'
import ResourceList from './resourceList'
import CurrLocBar from './currLocBar'
import 'react-skeleton-css/styles/skeleton.2.0.4.css'


class App extends Component {
  constructor() {
    super();
    this.state = {
      resources: [],
      currentLocation: {label: "", location: ""},
      nextLocation: {label: "", location: ""},
      startTime: "",
      endTime: ""
    }
  }

  componentDidMount() {
    // get location from database
    const locationRef = firebase.database().ref("location");
    locationRef.on("value", snapshot => {
      let location = snapshot.val();
      if (location) {
        this.setState({
          currentLocation: JSON.parse(JSON.stringify(location.currentLocation)),
          nextLocation: JSON.parse(JSON.stringify(location.nextLocation)),
          startTime: location.startTime,
          endTime: location.endTime
        });
      }
    });
    //get resources from database
    const resourceRef = firebase.database().ref("resources");
    resourceRef.on("value", snapshot => {
      let items = snapshot.val();
      const resources = [];
      for (let item in items) {
        const resource = {
          id: item,
          name: items[item].name,
          count: items[item].count,
          category: items[item].category,
          outOfStock: items[item].outOfStock
        };
        resources.push(resource);
      }
      this.setState({ resources: resources });
    });
  }


  render() {
    return (
      <div className="App">

        <div className="row header-row">
          <img src={phc_logo} className="phc-logo" />
          <header className="App-header">
            <div className="navbar-it" id="first-link"><a href="http://www.projecthomelessconnect.org/about/" className="nav-link"> About Us <div className="arrow-down"></div> </a> </div> 
            <div className="navbar-it"><a href="http://www.projecthomelessconnect.org/programs/" className="nav-link">Programs <div className="arrow-down"></div> </a> </div>
            <div className="navbar-it"><a href="http://www.projecthomelessconnect.org/volunteer/" className="nav-link">Volunteer <div className="arrow-down"></div> </a></div>
            <div className="navbar-it" id="last-link"><a href="http://www.projecthomelessconnect.org/donate/" className="nav-link">Donate <div className="arrow-down"></div> </a></div>
         
          </header>
        </div> 


        <div className="titlebannerlogo">
          <img src={circlelogo} className="circlelogo"/> 
          <div className="bannertext">Launched in early 2017, the PHC CareVan - a 
          five-passenger van with supplies for a pop-up service event - 
          provides valuable resources and support for people experiencing homelessness 
          in San Francisco.</div> 
        </div>


        <div>
          <div className="one-third column">
            <ResourceList resources={this.state.resources}/>
          </div>
          <div className="two-thirds column">

            <div className="current-location-bar">
              <CurrLocBar curr={this.state.currentLocation}
                          next={this.state.nextLocation}
                          start={this.state.startTime}
                          end={this.state.endTime} />
            </div>

            <div className="map">
              <SimpleMap carevan={this.state.currentLocation}
                         resources={this.state.resources} />
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


// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read, write: if request.auth != null;
//     }
//   }
// }
