import React from "react";
import ReactDOM from "react-dom";
import { GeoLocationMap } from "./GeoLocationMap";

const coordinates = {
  latitude: 36.214151845703125,
  longitude: -81.67890930175781,
};

type Props = {};

type State = {
  isLoaded: boolean;
  items: [];
  error: string;
};

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.setState({
      isLoaded: false,
      items: [],
      error: "",
    });
  }

  componentDidMount() {
    fetch("http://localhost:4202/")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return this.state && this.state.items;
    // return <GeoLocationMap coordinates={coordinates}></GeoLocationMap>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
