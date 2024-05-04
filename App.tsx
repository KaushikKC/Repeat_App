/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import MyStack from './src/navigation';

function App(): React.JSX.Element {
  return (
    // <SafeAreaView style={{backgroundColor:"#fff"}}>
      <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
             <MyStack />
         </NavigationContainer>
         </SafeAreaView>
    //      <Text>Hello</Text>
    //  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
