import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

class Gmap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 },
      ],
    };
  }

  cityMarker() {
    return this.props.data[0].city_coordinates;
  }

  calculateMarkers() {
    let prop_location = [];
    this.props.data.map((item) => {
      if (item.location_coordinates && item.post_link) {
        prop_location.push({
          latitude: item.location_coordinates.lat,
          longitude: item.location_coordinates.lng,
          link: item.post_link,
        });
      }
    });
    return prop_location;
  }

  displayMarkers = () => {
    const markers = this.calculateMarkers();
    return markers.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
          onClick={() => window.open(store.link, "_blank")}
        />
      );
    });
  };

  render() {
    const city_marker = this.cityMarker();

    return (
      <Map
        google={this.props.google}
        zoom={11}
        style={{
          width: "100%",
          height: "100%",
        }}
        initialCenter={city_marker}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD5gN9lDFp22bYRK5U8-2KhgpjkqNoqr7o",
})(Gmap);
