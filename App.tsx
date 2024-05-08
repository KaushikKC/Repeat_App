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
import {COLORS} from './src/constants/color';

function App(): React.JSX.Element {
  return (
    // <SafeAreaView style={{backgroundColor:"#fff"}}>
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WhiteBG}}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
    //      <Text>Hello</Text>
    //  </SafeAreaView>
  );
}

export default App;
