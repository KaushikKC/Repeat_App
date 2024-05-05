import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {wp} from '../utils/ScreenDimension';
import logo from '../assests/images/Illustration.png';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#000DFF', white: '#fff'};

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

type OnboardingProps = PropsWithChildren<{
  navigation: any;
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
        <Image source={item?.img} style={styles.image} />
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.para}>{item?.para}</Text>
      </View>
    );
  }
  return (
    <LinearGradient
      colors={['#6B73FF', '#000DFF']}
      start={{x: 0, y: 0}}
      end={{x: 0.5, y: 0.5}}
      style={styles.container}>
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
          disabled={!(currentSlideIndex === slides.length - 1)}
          style={styles.btn}
          onPress={() => navigation.navigate('Bottom')}>
          <Text style={styles.btnText}>Connect with wallet</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: COLORS.primary,
    padding: 16,
  },
  slideContainer: {
    height: height * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  slide: {
    // alignItems: 'center',
    position: 'static',
    width: wp(100),
  },
  slideIndex: {
    backgroundColor: 'white',
    width: 45,
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
    fontSize: 16,
    fontWeight: '300',
    marginLeft: 20,
    fontFamily: 'Quicksand',
  },
  image: {
    height: 340,
    width: 340,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
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
  },
  btn: {
    flex: 1,
    height: 60,
    width: wp(100) - 32,
    borderRadius: 8,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    fontSize: 18,
    color: '#040415',
    fontFamily: 'Quicksand-Regular',
  },
});

//make this component available to the app
export default MyComponent;
