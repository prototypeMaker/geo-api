import React from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';
const Geolocation = require('../../api/src/Geolocation')

export default class MiddleSection extends React.Component {
  state = { latitude: 0.00, longitude: 0.00 }
  componentDidMount()
  {
    Geolocation();
  }  
  
  render()
    {
      return <>
          <MapView style={styles.container}
          InitialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
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