import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo'
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Container } from 'native-base';
import TopSection from './components/TopSection'
import BottomSection from './components/BottomSection'
import MiddleSection from './components/MiddleSection'


export default function App() {

  return (
    <Container>
      <TopSection />
      <MiddleSection />
      <BottomSection />
    </Container>
  );
}

