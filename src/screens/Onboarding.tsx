import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {wp} from '../utils/ScreenDimension';
import LinearGradient from 'react-native-linear-gradient';
import apple from '../assests/images/apple.png';
import google from '../assests/images/Google.png';
import facebook from '../assests/images/facebook.png';

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    img: require('../assests/images/Illustration.png'),
    title: 'Make Your Habits Consistent.',
    para: 'Change your life by slowly adding new healty habits and sticking to them.',
  },
  {
    id: '2',
    img: require('../assests/images/Illustration1.png'),
    title: 'Stake & Bet on Your Habits.',
    para: 'Everyday you become one step closer to your goal. Don’t give up!',
  },
  {
    id: '3',
    img: require('../assests/images/Illustration2.png'),
    title: 'Prove Consistency & Earn Tokens.',
    para: 'Find friends to discuss common topics. Complete challenges together.',
  },
];

type slideProps = PropsWithChildren<{
  item: {
    id: string;
    img: ImageSourcePropType;
    title: string;
    para: string;
  };
}>;

// create a component
const MyComponent = () => {
  var navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<FlatList>(null);
  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function Slide({item}: slideProps) {
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
  return (
    <SafeAreaView>
      <LinearGradient
        colors={['#6B73FF', '#000DFF']}
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0.5}}
        style={styles.container}
      />
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={styles.slideContainer}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />

      {/* Render indicators */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && styles.slideIndex,
            ]}
          />
        ))}
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.btn}
          onPress={() => navigation.navigate('Bottom')}>
          <Text style={styles.btnText}>Connect with wallet</Text>
        </TouchableOpacity>
        <View style={styles.bottomSocial}>
          <TouchableOpacity style={styles.btnSocial}>
            <Image source={apple} style={styles.socialImg} />
            <Text style={styles.btnText}>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSocial}>
            <Image source={google} style={styles.socialImg} />
            <Text style={styles.btnText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSocial}>
            <Image source={facebook} style={styles.socialImg} />
            <Text style={styles.btnText}>Facebook</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.terms}>
          By continuing you agree Terms of Services & Privacy Policy{' '}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    padding: 16,
    bottom: -162,
    height: height,
    width: wp(100),
  },
  slideContainer: {
    height: height * 0.6,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 20,
  },
  slide: {
    position: 'static',
    width: wp(100),
  },
  slideIndex: {
    backgroundColor: 'white',
    width: 20,
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    marginHorizontal: 20,
    fontFamily: 'Quicksand-SemiBold',
  },
  para: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 20,
    fontFamily: 'Quicksand',
  },
  imageDiv: {
    alignItems: 'center',
  },
  image: {
    height: 340,
    width: 340,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  indicator: {
    height: 5,
    width: 5,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 10,
  },
  btnContainer: {
    height: 60,
    marginBottom: 8,
    alignItems: 'center',
    marginTop: height - 780,
  },
  btn: {
    flex: 1,
    height: 100,
    width: wp(100) - 32,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#040415',
    fontFamily: 'Quicksand-Regular',
  },
  bottomSocial: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wp(100) - 32,
    height: 40,
  },
  btnSocial: {
    flex: 1,
    height: 36,
    width: 100,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  socialImg: {
    // width: 10,
    marginRight: 5,
  },
  terms: {
    fontSize: 12,
    opacity: 50,
    color: '#AFB4FF',
    marginTop: 10,
  },
});

//make this component available to the app
export default MyComponent;
