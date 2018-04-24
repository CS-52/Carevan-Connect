import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactHoverObserver from 'react-hover-observer';
import './map.css'

const AnyReactComponent = ({ text }) => <div><h1>{text}</h1></div>;

const CarevanMarker = ({ imgSrc, isHovering = false }) => 
  <div>
    <img src={require("" + imgSrc)} alt="carevan marker" style={{width: "50px"}}/>
    {isHovering ? 
      <div className="popup-box">
        <h6>Resources Available</h6>
        <p>glasses: 5</p>
        <p>socks: 9</p>
        <p>haircut vouchers: 30</p>
      </div>
      : null
    }
  </div>


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.755,
      lng: -122.44
    },

    carevan: {
      lat: 37.7791,
      lng: -122.4158,
      imgSrc: "./imgs/caravan.png"
    },
    zoom: 13
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDHn-dZxlUhkA6nOqLGRDCi2hTr7Zkno9s" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <ReactHoverObserver 
            lat={this.props.carevan.lat}
            lng={this.props.carevan.lng}>
            
            <CarevanMarker    
              imgSrc={this.props.carevan.imgSrc}
            />
          </ReactHoverObserver>
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

//'Hello from Carevan Connect'