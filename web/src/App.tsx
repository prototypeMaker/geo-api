import React from 'react';
import ReactDOM from 'react-dom';
import { GeoLocationMap } from './GeoLocationMap';
import { Home } from './Home';

class App extends React.Component {
  render() {
    return <Home></Home>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
