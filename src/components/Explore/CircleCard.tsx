//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import {COLORS} from '../../constants/color';

// create a component
type CircleCardProps = {
  logo: ImageSourcePropType;
  name: string;
  description: string;
};

const CircleCard = ({logo, name, description}: CircleCardProps) => {
  return (
    <View style={styles.OuterContainer}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
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
    backgroundColor: COLORS.WhiteBG,
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
export default CircleCard;
