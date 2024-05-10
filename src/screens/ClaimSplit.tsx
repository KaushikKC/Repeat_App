//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../constants/color';
import HabitsCard from '../components/Home/HabitsCard';
import {hp, wp} from '../utils/ScreenDimension';

// create a component
const ClaimSplit = () => {
  const people = [
    {name: 'John Doe', status: 'Completed'},
    {name: 'Jane Smith', status: 'Not Completed'},
    // Add more people as needed
  ];
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Daily Fit Routine</Text>
      </View>
      <ScrollView style={styles.claimContent}>
        <View>
          <Text style={styles.fieldName}>STAKED</Text>
          <Text style={styles.value}>$1000</Text>
        </View>
        <View>
          <Text style={styles.fieldName}>Habits</Text>
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
        <View>
          <Text style={styles.fieldName}>PEOPLE</Text>
          <View style={styles.peopleinputContainer}>
            <View>
              <Text style={styles.description}>
                People habit status will be updated here
              </Text>
              <View style={styles.peopleContainer}>
                {people.map((person, index) => (
                  <View key={index} style={styles.personContainer}>
                    <Text style={styles.personName}>{person.name}</Text>
                    <Text style={styles.personStatus}>{person.status}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.fieldName}>TODAY"S SPLIT</Text>
          <View style={[styles.inputContainer, {height: 95}]}>
            <View>
              <Text style={styles.description}>
                USDC Splitting the staked amount to people
              </Text>
              <View style={styles.regularBox}>
                <View style={styles.limitDiv}>
                  <View style={styles.limitDiv}>
                    <Image
                      style={{marginRight: 5}}
                      source={require('../assets/images/ArrowsClockwise.png')}
                    />
                    <Text>$100</Text>
                  </View>
                  <View style={styles.limitDiv}>
                    <Image
                      style={{marginRight: 5}}
                      source={require('../assets/images/Paper.png')}
                    />
                    <Text>8 people</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.Container}></View>
      </ScrollView>
      <TouchableOpacity style={styles.createButton}>
        <Text style={styles.createButtonText}>Claim your Split</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: hp(100),
  },
  Container: {
    height: 200,
  },
  topHeader: {
    height: 135,
    backgroundColor: COLORS.WhiteBG,
    paddingTop: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: COLORS.Gray,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
  },
  claimContent: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  fieldName: {
    fontSize: 12,
    fontFamily: 'Quicksand-SemiBold',
    marginVertical: 10,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
    marginBottom: 10,
  },
  createButton: {
    position: 'absolute',
    bottom: 100,
    left: 24,
    right: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: COLORS.WhiteBG,
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
  inputContainer: {
    width: wp(100) - 48,
    height: 72,
    padding: 15,
    backgroundColor: COLORS.WhiteBG,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  description: {
    fontFamily: 'Quicksand-Regular',
    color: COLORS.Grey,
    width: 250,
    marginBottom: 5,
  },
  regularBox: {
    height: 32,
    backgroundColor: COLORS.Gray,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  regularItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regularItemsText: {
    fontFamily: 'Quicksand-Regular',
    marginHorizontal: 4,
  },
  regularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  limitDiv: {
    flexDirection: 'row',
    marginRight: 10,
  },
  peopleinputContainer: {
    width: wp(100) - 48,
    padding: 15,
    backgroundColor: COLORS.WhiteBG,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  peopleContainer: {
    // marginVertical: 20,
  },
  personContainer: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.Gray,
    alignItems: 'center',
    marginVertical: 10,
  },
  personName: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 16,
    color: COLORS.Black,
  },
  personStatus: {
    fontFamily: 'Quicksand-Regular',
    fontSize: 14,
    color: COLORS.Black,
  },
});

//make this component available to the app
export default ClaimSplit;
