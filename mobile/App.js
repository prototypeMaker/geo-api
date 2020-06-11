import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container, Header, Body, Title, Content, Footer, FooterTab, Button, Icon, Left, Right } from 'native-base';
import MapView from 'react-native-maps';
import Marker from 'react-native-maps';

export default function App() {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Right>
          <Icon name='more' />
        </Right>
      </Header>

        {/* <MapView style={styles.container}
        InitialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
        </MapView> */}
        <Marker coordinate={marker.latlng}></Marker>

      <Footer >
        <FooterTab>
          <Button vertical active>
            <Icon name='eye'/>
              <Text>
                  Update 
              </Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
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

const marker = {
  latlng: {
    latitude: 0,
    longitude: 0
  }
}