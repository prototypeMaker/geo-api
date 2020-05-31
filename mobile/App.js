import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

export default function App() {
  return (
<MapView style={styles.container}
initialRegion={{
  latitude: 36.205958,
  longitude: -81.671442,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}}
/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
