import {useNavigation} from '@react-navigation/native';
import React, {PropsWithChildren} from 'react';
import {
  Dimensions,
  Image,
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

const {width, height} = Dimensions.get('window');

const COLORS = {primary: '#000DFF', white: '#fff'};

const slides = [
  {
    id: '1',
    title: 'Make Your Habits Consistent.',
  },
  {
    id: '2',
    title: 'Stake & Bet on Your Habits.',
  },
  {
    id: '3',
    title: 'Prove Consistency & Earn Tokens.',
  },
];

type slideProps = PropsWithChildren<{
  item: {
    id: string;
    title: string;
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

  console.log(navigation);

  // eslint-disable-next-line react/no-unstable-nested-components
  function Slide({item}: slideProps) {
    return (
      <View style={styles.slide}>
        <Image source={logo} style={styles.image} />
        <Text style={styles.title}>{item?.title}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <Text style={{color: 'black'}}> textInComponent </Text>

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
      <TouchableOpacity onPress={() => navigation.navigate('Bottom')}>
        <Text>Create Bottom</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
  },
  slideContainer: {
    height: height * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  slide: {
    alignItems: 'center',
    width: wp(100) - 32,
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
    fontFamily: 'Quicksand-Bold',
  },
  image: {
    height: 207,
    width: 156,
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
    backgroundColor: '#2D2D30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Quicksand-Regular',
  },
});

//make this component available to the app
export default MyComponent;
