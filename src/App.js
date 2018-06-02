import React, { Component } from 'react';
// import logo from './logo.svg';
import phc_logo from './phc_logo.png'
import './App.css';
import './skeleton.css'
import SimpleMap from './map'
import ResourceList from './resourceList'
import 'react-skeleton-css/styles/skeleton.2.0.4.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <header className="App-header">
            <img src={phc_logo} className="phc-logo" />
            <div className="nav-bar">
                <ul>
                  <li className="navbar-it"><a href="projecthomelessconnect.org" className="nav-link">ABOUT US</a></li>
                  <li className="navbar-it"><a className="nav-link">PROGRAMS</a></li>
                  <li className="navbar-it"><a className="nav-link">VOLUNTEER</a></li>
                  <li className="navbar-it"><a className="nav-link">DONATE</a></li>
                </ul>
            </div>
          </header>
        </div>
        <div>
          <div className="one-third column">
            <ResourceList/>
          </div>
          <div className="two-thirds column">
            <SimpleMap/>
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
