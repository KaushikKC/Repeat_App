//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/color';
import {wp} from '../utils/ScreenDimension';

// create a component
const ClaimPoints = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.badge}
        source={require('../assets/images/Badge.png')}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          Congrats! You just reached your first habit goal!
        </Text>
        <Text style={styles.subTitle}>
          This badge is a symbol of your commitment to yourself. Keep going and
          earn more badges along the way.
        </Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Claim your points</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Yellow,
  },
  createButton: {
    width: wp(100) - 48,
    backgroundColor: COLORS.WhiteBG,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
  badge: {},
  title: {
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
    marginVertical: 16,
    color: COLORS.WhiteBG,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    marginBottom: 40,
    color: COLORS.WhiteBG,
    textAlign: 'center',
  },
  innerContainer: {
    paddingHorizontal: 24,
  },
});

//make this component available to the app
export default ClaimPoints;
