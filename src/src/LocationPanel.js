import React, { Component } from 'react';
import firebase from "./firebase";
import Geosuggest from 'react-geosuggest';
import './geosuggest.css'
import './Portal.css'

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import Location from './imgs/red-map-pin.svg'
import Resources from './imgs/Resources.png'

const format = 'h:mm a';

class LocationPanel extends Component {
  constructor() {
    super();
    this.state = {
      /* State for location info */
      currentLocation: {},
      nextLocation: {},
      startTime: "",
      endTime: ""
    };
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
  }


  onSuggestSelect = (suggest, current) => {
    if (!suggest) return;
    const {label, location, ...rest} = suggest;
    if (current) {
      this.setState({currentLocation: {label, location}});
    } else {
      this.setState({nextLocation: {label, location}});
    }
    console.log(this.state.currentLocation); 
    console.log(this.state.nextLocation); 
  }

  onTimeChange = (value, start) => {
    if (start) {
      this.setState({startTime: value.format(format)});
    } else {
      this.setState({endTime: value.format(format)});
    }
    console.log(this.state.startTime);
    console.log(this.state.endTime);
  }

  saveLocationInfo = e => {
    const locationRef = firebase.database().ref("location");
    locationRef.update({
      currentLocation: this.state.currentLocation,
      nextLocation: this.state.nextLocation,
      startTime: this.state.startTime,
      endTime: this.state.endTime
    });
  }

  render() {
    var fixtures = [
      {label: 'SFPL Main Library, Larkin Street, San Francisco, CA, USA', location: {lat: 37.7790819, lng: -122.41579609999997}},
      {label: 'Project Homeless Connect, Van Ness Avenue, San Francisco, CA, USA', location: {lat: 37.77562, lng: -122.41995930000002}}
    ];

    return (
      <div className="LocationContainer">

        <div className="lilTitlePic">
        <img src={Location} style={{width: "60px", height: "65px"}}/>
        </div>

        <div className="Redderizer">
          <div className="lilTitle">
          update location
          </div>
        </div>

        <p>Where is the Carevan now?</p>
        <span>
          <Geosuggest 
            initialValue={this.state.currentLocation.label}
            fixtures={fixtures}
            onSuggestSelect={suggest => this.onSuggestSelect(suggest, true)}
          />
        </span>

        <p>How long will it be there?</p>

        <div className="portalButton2">
        <span>From: &nbsp;</span>
        <TimePicker 
          showSecond={false}
          defaultValue={this.state.startTime ? moment(this.state.startTime, format): null}
          className="xxx"
          use12Hours 
          format={format}
          onChange={value => this.onTimeChange(value, true)}
        />

        <span>   &nbsp; To:&nbsp; </span>    
        <TimePicker 
          showSecond={false}
          defaultValue={this.state.endTime ? moment(this.state.endTime, format): null}
          className="xxx"
          use12Hours 
          format={format}
          onChange={value => this.onTimeChange(value, false)}
        />


        </div>

        <p>Where will the Carevan go next?</p>
        <Geosuggest 
          initialValue={this.state.nextLocation.label}
          fixtures={fixtures}
          onSuggestSelect={suggest => this.onSuggestSelect(suggest, false)}
        />

        <button onClick={this.saveLocationInfo}>Save</button>
      </div>
    );
  }
}

export default LocationPanel;
