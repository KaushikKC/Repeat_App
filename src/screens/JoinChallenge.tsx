//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {hp, wp} from '../utils/ScreenDimension';
import {COLORS} from '../constants/color';
import HabitsCard from '../components/Home/HabitsCard';

// create a component
const JoinChallenge = () => {
  return (
    <ScrollView>
      <LinearGradient
        colors={['#6B73FF', '#000DFF']}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0.5}}
        style={styles.container}
      />
      <View style={styles.outerContainer}>
        <Text style={styles.emoji}>🏃🏻‍</Text>
        <Text style={styles.title}>Daily Fit Routine!</Text>
        <Text style={styles.subTitle}>Feb 12 to Mar 8</Text>
        <Text style={styles.description}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatu. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatu.
        </Text>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Join the Challenge</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.habitContainer}>
        <View>
          <Text style={styles.habitTitle}>Habits</Text>
        </View>
        <HabitsCard
          name="Drink the water"
          description="500/2000 ML"
          logo={require('../assets/images/Water.png')}
        />
        <HabitsCard
          name="Walk"
          description="0/10000 Steps"
          logo={require('../assets/images/Walking.png')}
        />
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    padding: 16,
    height: hp(100),
    width: wp(100),
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
  outerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 100,
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
    color: COLORS.WhiteBG,
    marginVertical: 8,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: COLORS.WhiteBG,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    color: COLORS.WhiteBG,
    marginVertical: 25,
    textAlign: 'center',
  },
  habitContainer: {
    paddingHorizontal: 24,
  },
  habitTitle: {
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
    color: COLORS.WhiteBG,
    marginRight: 'auto',
    marginTop: 24,
    marginBottom: 5,
  },
});

//make this component available to the app
export default JoinChallenge;
