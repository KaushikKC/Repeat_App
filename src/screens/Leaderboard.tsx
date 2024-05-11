//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {COLORS} from '../constants/color';
import {hp, wp} from '../utils/ScreenDimension';
import LinearGradient from 'react-native-linear-gradient';

// create a component
const Leaderboard = () => {
  const [selected, setSelected] = useState('Daily');
  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>LeaderBoard</Text>

        <View style={styles.HeaderMenu}>
          <TouchableOpacity
            style={
              selected === 'Daily'
                ? styles.HeaderMenuTitleActive
                : styles.HeaderMenuTitle
            }
            onPress={() => setSelected('Daily')}>
            <Text style={selected === 'Daily' && {color: COLORS.primary}}>
              Daily
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selected === 'Weekly'
                ? styles.HeaderMenuTitleActive
                : styles.HeaderMenuTitle
            }
            onPress={() => setSelected('Weekly')}>
            <Text style={selected === 'Weekly' && {color: COLORS.primary}}>
              Weekly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selected === 'Monthly'
                ? styles.HeaderMenuTitleActive
                : styles.HeaderMenuTitle
            }
            onPress={() => setSelected('Monthly')}>
            <Text style={selected === 'Monthly' && {color: COLORS.primary}}>
              Monthly
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <LinearGradient
          colors={['#6B73FF', '#000DFF']}
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0.5}}
          style={styles.InnerContainer}
        />
        <View style={styles.outerContainer}>
          <View style={styles.topthreeContainer}>
            <View style={styles.secondPlaceContainer}>
              <Image
                style={styles.profileImg}
                source={require('../assets/images/Avatar.png')}
              />
              <Text style={styles.name}>Kaushik</Text>
              <View style={styles.secondPlacePointsContainer}>
                <Text style={styles.positionText}>2nd</Text>
                <View style={styles.userPointsContainer}>
                  <Image source={require('../assets/images/Medal.png')} />
                  <Text style={styles.userPoints}>1452</Text>
                </View>
              </View>
            </View>
            <View style={styles.firstPlaceContainer}>
              <Image
                style={styles.profileImg}
                source={require('../assets/images/Avatar.png')}
              />
              <Text style={styles.name}>Thiru</Text>
              <View style={styles.firstPlacePointsContainer}>
                <Text style={styles.positionText}>1st</Text>
                <View style={styles.userPointsContainer}>
                  <Image source={require('../assets/images/Medal.png')} />
                  <Text style={styles.userPoints}>1452</Text>
                </View>
              </View>
            </View>
            <View style={styles.thirdPlaceContainer}>
              <Image
                style={styles.profileImg}
                source={require('../assets/images/Avatar.png')}
              />
              <Text style={styles.name}>Kaushik</Text>
              <View style={styles.thirdPlacePointsContainer}>
                <Text style={styles.positionText}>3rd</Text>
                <View style={styles.userPointsContainer}>
                  <Image source={require('../assets/images/Medal.png')} />
                  <Text style={styles.userPoints}>1452</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topHeader: {
    height: 183,
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
  HeaderMenu: {
    height: 36,
    width: wp(100) - 48,
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
    width: wp(28),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
  },
  HeaderMenuTitleActive: {
    height: 28,
    width: wp(28),
    backgroundColor: COLORS.WhiteBG,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    color: COLORS.primary,
  },
  InnerContainer: {
    flex: 1,
    position: 'absolute',
    padding: 16,
    height: hp(100) - 183,
    width: wp(100),
  },
  userPointsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF3DA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    marginVertical: 5,
  },
  userPoints: {
    color: '#FEA800',
    marginRight: 3,
  },
  outerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  topthreeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  secondPlaceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
  },
  profileImg: {
    width: 64,
    height: 64,
    borderRadius: 64,
    borderWidth: 2,
    borderColor: COLORS.WhiteBG,
  },
  name: {
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
    color: COLORS.WhiteBG,
    marginVertical: 10,
  },
  positionText: {
    color: COLORS.primary,
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  secondPlacePointsContainer: {
    backgroundColor: COLORS.WhiteBG,
    flexDirection: 'column',
    paddingVertical: 16,
    width: wp(22),
    borderRadius: 80,
    height: 112,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstPlaceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstPlacePointsContainer: {
    backgroundColor: COLORS.WhiteBG,
    flexDirection: 'column',
    paddingVertical: 16,
    width: wp(22),
    borderRadius: 80,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thirdPlaceContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 35,
  },
  thirdPlacePointsContainer: {
    backgroundColor: COLORS.WhiteBG,
    flexDirection: 'column',
    paddingVertical: 16,
    width: wp(22),
    borderRadius: 80,
    height: 102,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Leaderboard;
