/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StackParamList} from '.';

// import Marketplace from '../screens/Marketplace';
import {Image, Text} from 'react-native';
import {wp} from '../utils/ScreenDimension';
import Home from '../screens/Home';
import Explore from '../screens/Explore';
import Leaderboard from '../screens/Leaderboard';
import Profile from '../screens/Profile';

type BottomTabNavigatorParamList = {
  Home: StackParamList;
  Explore: undefined;
  Marketplace: undefined;
  LeaderBoard: undefined;
  Profile: undefined;
};

const Bottom = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {backgroundColor: 'blue'},
        headerTintColor: '#000',
        tabBarIconStyle: {
          color: 'white',
        },
        tabBarStyle: {
          height: 69,
          width: wp(100) - 32,
          backgroundColor: 'blue',
          position: 'absolute',
          borderRadius: 16,
          bottom: 24,
          marginHorizontal: 16,
          borderColor: '#000',
          borderWidth: 1,
        },
      }}>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Home',

          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={
                  focused
                    ? require('../assests/images/BottomNavigator/HomeActive.png')
                    : require('../assests/images/BottomNavigator/Home.png')
                }
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={
                  focused
                    ? {
                        borderBottomWidth: 2,
                        width: 15,
                        borderBottomColor: '#fff',
                        marginTop: -14,
                      }
                    : {
                        height: 0,
                      }
                }
              />
            </>
          ),
        }}
      />
      <Bottom.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Explore',
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={
                  focused
                    ? require('../assests/images/BottomNavigator/ExploreActive.png')
                    : require('../assests/images/BottomNavigator/Explore.png')
                }
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={
                  focused
                    ? {
                        borderBottomWidth: 2,
                        width: 15,
                        borderBottomColor: '#fff',
                        marginTop: -14,
                      }
                    : {
                        height: 0,
                      }
                }
              />
            </>
          ),
        }}
      />
      <Bottom.Screen
        name="LeaderBoard"
        component={Leaderboard}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={
                  focused
                    ? require('../assests/images/BottomNavigator/LeaderboardActive.png')
                    : require('../assests/images/BottomNavigator/Leaderboard.png')
                }
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={
                  focused
                    ? {
                        borderBottomWidth: 2,
                        width: 18,
                        borderBottomColor: '#fff',
                        marginTop: -12,
                      }
                    : {
                        height: 0,
                      }
                }
              />
            </>
          ),
        }}
      />
      <Bottom.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarShowLabel: false,
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <>
              <Image
                source={
                  focused
                    ? require('../assests/images/BottomNavigator/ProfileActive.png')
                    : require('../assests/images/BottomNavigator/Profile.png')
                }
                style={{
                  width: 20,
                  height: 20,
                }}
              />
              <Text
                style={
                  focused
                    ? {
                        borderBottomWidth: 2,
                        width: 18,
                        borderBottomColor: '#fff',
                        marginTop: -12,
                      }
                    : {
                        height: 0,
                      }
                }
              />
            </>
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
