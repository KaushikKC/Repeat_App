import {PropsWithChildren} from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {wp} from '../utils/ScreenDimension';

type slideProps = PropsWithChildren<{
  item: {
    id: string;
    img: ImageSourcePropType;
    title: string;
    para: string;
  };
}>;

export function Slide({item}: slideProps) {
  return (
    <View style={styles.slide}>
      <View style={styles.imageDiv}>
        <Image source={item?.img} style={styles.image} />
      </View>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.para}>{item?.para}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    position: 'static',
    width: wp(100),
  },
  para: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 20,
    fontFamily: 'Quicksand-Regular',
  },
  imageDiv: {
    alignItems: 'center',
  },
  image: {
    height: 340,
    width: 340,
    resizeMode: 'contain',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    marginHorizontal: 20,
    fontFamily: 'Quicksand-SemiBold',
  },
});
