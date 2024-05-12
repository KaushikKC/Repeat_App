//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image, Platform} from 'react-native';
import {COLORS} from '../../constants/color';
import {wp} from '../../utils/ScreenDimension';

type ChallengesCardProps = {
  name: string;
  description: string;
  people: string;
};
// create a component
const ChallengesCard = ({name, description, people}: ChallengesCardProps) => {
  return (
    <View style={styles.OuterContainer}>
      <View style={styles.InnerContainer}>
        <View style={styles.NameContainer}>
          <Image
            style={styles.timerLogo}
            source={require('../../assets/images/TimeCircle.png')}
          />
          <View>
            <Text style={styles.Name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
        <View style={styles.peopleContainer}>
          <Image source={require('../../assets/images/Avatar.png')} />
          <Text style={styles.people}>{people} people joined</Text>
        </View>
      </View>
      <Image
        style={styles.progressBar}
        source={require('../../assets/images/ProgresBar.png')}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  OuterContainer: {
    width: wp(100) - 48,
    height: 72,
    borderRadius: 10,
    backgroundColor: COLORS.WhiteBG,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  InnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  NameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Name: {
    color: COLORS.Black,
    fontSize: 14,
    fontFamily: 'Quicksand-semiBold',
  },
  description: {
    fontSize: 12,
    color: COLORS.Grey,
    fontFamily: 'Quicksand-Regular',
  },
  people: {
    fontSize: 12,
    color: COLORS.Grey,
    fontFamily: 'Quicksand-Regular',
  },
  timerLogo: {
    marginRight: 6,
  },
  peopleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  progressBar: {
    width: wp(100) - 80,
  },
});

//make this component available to the app
export default ChallengesCard;
