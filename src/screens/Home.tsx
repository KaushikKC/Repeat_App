//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// create a component
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerDiv}>
        <View>
          <View>
            <View>
              <Text>Hi, Kaushik</Text>
              <Text>Let’s make habits together!</Text>
            </View>
            <Image source={require('../assests/images/Mood.png')} />
          </View>
          <View>
            <Text>Today</Text>
            <Text>Circles</Text>
          </View>
        </View>
      </View>
      <Text>Home</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerDiv: {
    height: 180,
    backgroundColor: '#FFFFFF',
  },
});

//make this component available to the app
export default Home;
