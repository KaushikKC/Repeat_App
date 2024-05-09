import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Onboarding from '../screens/Onboarding';
import BottomNavigator from './BottomNavigation';
import JoinChallenge from '../screens/JoinChallenge';

export type StackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Bottom: undefined;
  WebView: undefined;
  JoinChallenge: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const MyStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Bottom" component={BottomNavigator} />
      <Stack.Screen name="JoinChallenge" component={JoinChallenge} />
    </Stack.Navigator>
  );
};

export default MyStack;
