import React, { Component } from 'react';
import logo from './logo.svg';
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
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Carevan Connect</h1>
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
