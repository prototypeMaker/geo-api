import React from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
import { Geolocation } from '../../api/src/Geolocation'
import { Particle } from '../../api/src/Particle'

export default class MiddleSection extends React.Component {
  state = { latitude: 0.00, longitude: 0.00 }
  componentDidMount()
  {
    const devices = new Particle();
    const location = new Geolocation(devices.deviceIP());
    location.then(
      this.setState({ latitude: location.getLat(), longitude: location.getLong()})
    );
  }  
  
  render()
    {
      return <>
          <MapView style={styles.container}
          InitialRegion={{
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          }}>    
          </MapView>
          </>
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const marker = {
  latlng: {
    latitude: 0,
    longitude: 0
  }
}