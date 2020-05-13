import React from "react";
import ReactDOM from "react-dom";
import { GeoLocationMap } from "./GeoLocationMap";

const coordinates = {
  latitude: 36.214151845703125,
  longitude: -81.67890930175781,
};

class App extends React.Component {
  render() {
    return <GeoLocationMap coordinates={coordinates}></GeoLocationMap>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
