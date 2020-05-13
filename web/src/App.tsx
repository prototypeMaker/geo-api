import React from "react";
import ReactDOM from "react-dom";
import { withGoogleMap, GoogleMap } from "react-google-maps";

class App extends React.Component {
  render() {
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap
        defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
        defaultZoom={13}
      ></GoogleMap>
    ));
    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px" }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
