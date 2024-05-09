//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {COLORS} from '../../constants/color';

// create a component
type HabitsCardProps = {
  logo: ImageSourcePropType;
  name: string;
  description: string;
  color: string;
};

const HabitCard = (props: HabitsCardProps) => {
  return (
    <View style={[styles.OuterContainer, {backgroundColor: props.color}]}>
      <Image style={styles.logo} source={props.logo} />
      <Text style={styles.name}>{props.name}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  OuterContainer: {
    width: 128,
    height: 102,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginVertical: 5,
    marginRight: 8,
  },
  name: {
    fontFamily: 'Quicksand-semiBold',
    fontSize: 14,
  },
  description: {
    fontFamily: 'Quicksand-Regular',
    color: COLORS.Grey,
  },
  logo: {
    backgroundColor: COLORS.WhiteBG,
    paddingHorizontal: 6,
    paddingVertical: 3,
    width: 34,
    height: 34,
    borderRadius: 10,
  },
});

//make this component available to the app
export default HabitCard;
