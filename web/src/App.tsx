import React from 'react';
import ReactDOM from 'react-dom';
import { GeoLocationMap } from './GeoLocationMap';

class App extends React.Component {
  intervalID: any;

  state = {
    items: {
      latitude: 0,
      longitude: 0
    },
    isLoaded: false,
    error: ''
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  getData = () => {
    fetch('http://localhost:4202/')
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          items: data.items
        });

        this.intervalID = setTimeout(this.getData.bind(this), 15000);
      });
  };

  render() {
    return (
      <div>
        {this.state.error ? (
          this.state.error
        ) : (
          <GeoLocationMap coordinates={this.state.items}></GeoLocationMap>
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
