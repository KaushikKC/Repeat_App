//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/color';
import {wp} from '../utils/ScreenDimension';
import ChallengesCard from '../components/ChallegengesCard';

// create a component
const Home = () => {
  const [selected, setSelected] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.headerDiv}>
        <View style={styles.headerContainer}>
          <View style={styles.HeaderTitleContainer}>
            <View>
              <Text style={styles.Headertitle}>Hi, Kaushik 👋🏻</Text>
              <Text style={styles.HeaderSubTitle}>
                Let’s make habits together!
              </Text>
            </View>
            <Image source={require('../assests/images/Mood.png')} />
          </View>
          <View style={styles.HeaderMenu}>
            <TouchableOpacity
              style={
                selected === 'Today'
                  ? styles.HeaderMenuTitleActive
                  : styles.HeaderMenuTitle
              }
              onPress={() => setSelected('Today')}>
              <Text style={selected === 'Today' && {color: COLORS.primary}}>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selected === 'Circles'
                  ? styles.HeaderMenuTitleActive
                  : styles.HeaderMenuTitle
              }
              onPress={() => setSelected('Circles')}>
              <Text style={selected === 'Circles' && {color: COLORS.primary}}>
                Circles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.HomeContent}>
        <View>
          <View style={styles.SectionHeading}>
            <Text style={styles.SectionTitle}>Challenges</Text>
            <Text style={styles.SectionView}>VIEW ALL</Text>
          </View>
          <ChallengesCard
            name="Daily Fit Challenge!"
            description="5 days left"
            people="4"
          />
        </View>
        <View>
          <View style={styles.SectionHeading}>
            <Text style={styles.SectionTitle}>Habits</Text>
            <Text style={styles.SectionView}>VIEW ALL</Text>
          </View>
        </View>
      </View>
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
  headerContainer: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
  Headertitle: {
    fontSize: 18,
    fontWeight: 600,
    fontFamily: 'Quicksand-Bold',
  },
  HeaderSubTitle: {
    color: COLORS.Grey,
    fontSize: 14,
  },
  HeaderMenu: {
    height: 36,
    width: 345,
    backgroundColor: COLORS.Gray,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginTop: 12,
  },
  HeaderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderMenuTitle: {
    height: 28,
    width: 168.5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
  },
  HeaderMenuTitleActive: {
    height: 28,
    width: 168.5,
    backgroundColor: COLORS.WhiteBG,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    color: COLORS.primary,
  },
  HomeContent: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  SectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SectionTitle: {
    fontSize: 14,
  },
  SectionView: {
    color: COLORS.primary,
  },
});

//make this component available to the app
export default Home;
