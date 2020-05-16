import React from 'react';
import ReactDOM from 'react-dom';
import { GeoLocationMap } from './GeoLocationMap';

class App extends React.Component {
  state = {
    items: {
      latitude: 0,
      longitude: 0
    },
    isLoaded: false,
    error: ''
  };

  componentDidMount() {
    fetch('http://localhost:4202/')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

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
