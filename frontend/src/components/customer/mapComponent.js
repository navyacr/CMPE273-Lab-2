import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

const mapStyles = {
  width: '100%',
  height: '100%'
};

Geocode.setApiKey("AIzaSyAXlNf-MoO09CftUsjp5UiMHaZWvc2ydwE");

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    // this.state = {};
    this.initialise();
  } 

  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},   
    data: []     // Shows the InfoWindow to the selected place upon a marker
  };

  initialise = () => {
    var addresses = ["Burj Khalifa", "Eiffel tower", "1235 wildwood avenue sunnyvale"]
    for (let address of addresses) {
      let name = "Check"
    Geocode.fromAddress(address).then(
      response => {
           
            const { lat, lng } = response.results[0].geometry.location;
            this.state.data.push( <Marker position={{lat: lat, lng: lng}} 
              onClick={this.onMarkerClick}
              name={name}  
            />)
            this.forceUpdate()
          },
          error => {
            console.error(error);
          }
        )
    }
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        initialCenter={
        {
            lat: 48.85837009999999,
            lng: 2.2944813
          }
        }
      >
      {this.state.data}
      {/* <Marker position={this.state.position} 
              onClick={this.onMarkerClick}
              name={'Works!!!'}
      /> */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAXlNf-MoO09CftUsjp5UiMHaZWvc2ydwE'
})(MapContainer);