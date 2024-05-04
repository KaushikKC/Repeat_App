import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Onboarding from '../screens/Onboarding';
import BottomNavigator from './BottomNavigation';

export type StackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Result: undefined;
  Bottom: undefined;
  Wallet: undefined;
  BrandsDetails: undefined;
  WebView: undefined;
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
    </Stack.Navigator>
  );
};

export default MyStack
