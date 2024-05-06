/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView} from 'react-native';
import MyStack from './src/navigation';

function App(): React.JSX.Element {
  return (
    // <SafeAreaView style={{backgroundColor:"#fff"}}>
    <SafeAreaView style={{flex: 1, backgroundColor: '#F6F9FF'}}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
    //      <Text>Hello</Text>
    //  </SafeAreaView>
  );
}

export default App;
