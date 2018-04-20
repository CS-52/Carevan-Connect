import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div><h1>{text}</h1></div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.75,
      lng: -122.44
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
          <AnyReactComponent
            lat={37.8}
            lng={-122.45}
            text={''} 
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;

//'Hello from Carevan Connect'