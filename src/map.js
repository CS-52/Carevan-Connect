import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ReactHoverObserver from 'react-hover-observer';
import './map.css'

const CarevanMarker = ({ locationSet, resources, isHovering = false }) => 
  <div>
    <img src={require("./imgs/caravan.png")} alt="carevan marker" 
         style={{width: "50px", visibility: locationSet ? "visible" : "hidden" }}/>
    {isHovering ? 
      <div className="popup-box">
        <h6>Resources Available</h6>
        {resources.filter(item => !item.outOfStock)
                  .map(item => 
            <p>{item.name}</p>
        )}
      </div>
      : null
    }
  </div>


class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.765,
      lng: -122.44
    },

    carevan: {
      location: {
        lat: 37.7791,
        lng: -122.4158,
      } 
    },
    zoom: 13
  };

  render() {
    console.log(this.props.resources);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '70vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDHn-dZxlUhkA6nOqLGRDCi2hTr7Zkno9s" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <ReactHoverObserver 
            lat={this.props.carevan.location.lat}
            lng={this.props.carevan.location.lng}>
            
            <CarevanMarker    
              locationSet={this.props.carevan.location != ""}
              resources={this.props.resources}
            />
          </ReactHoverObserver>
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;