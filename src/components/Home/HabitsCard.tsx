//import liraries
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {COLORS} from '../../constants/color';
import {wp} from '../../utils/ScreenDimension';
import * as Progress from 'react-native-progress';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

type HabitsCardProps = {
  emoji: string;
  name: string;
  description: string;
  progress: number;
  akey:"string";
  email: string;
  onclick:any;
  decidedFrequency:string;
  currentProgress:string;
};
// create a component
const HabitsCard = ({emoji, name, description, progress, akey, email, onclick,decidedFrequency, currentProgress}: HabitsCardProps) => {
  const handlePlusClick = async() => {
    console.log(akey);
    console.log(email);
    try {
      onclick(akey,email,name)
      } catch (error) {
      console.log(error);
      
    }
  };


  var navigation = useNavigation();
  const completeHabbit = () => {
    console.log('Here in complete habbit');
  };
  const claimPoints = () => {
    if (progress === 1) {
      completeHabbit();
      navigation.navigate('ClaimPoints');
    }
  };
  return (
    <TouchableOpacity
      onPress={() => claimPoints()}
      style={styles.OuterContainer}>
      <View style={styles.InnerContainer}>
        <View style={styles.NameContainer}>
          <Progress.Circle
            size={32}
            progress={progress}
            indeterminate={false}
            color={COLORS.primary}
            thickness={2}
          />
          <View style={styles.logo}>
            <Text>{emoji}</Text>
          </View>

          <View>
            <Text style={styles.Name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
   {currentProgress !== decidedFrequency &&      <TouchableOpacity style={styles.plus} onPress={handlePlusClick}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>}
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  OuterContainer: {
    width: wp(100) - 48,
    height: 68,
    borderRadius: 10,
    backgroundColor: COLORS.WhiteBG,
    padding: 16,
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
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
    alignItems: 'center',
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
  logo: {
    //
    position: 'relative',
    right: 25,
  },
  plus: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: COLORS.Grey,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 18,
    color: '#000',
  },
});

//make this component available to the app
export default HabitsCard;
