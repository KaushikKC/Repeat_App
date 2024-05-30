//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  LogBox,
} from 'react-native';
import {COLORS} from '../constants/color';
import {hp, wp} from '../utils/ScreenDimension';
import PeopleCard from '../components/Profile/PeopleCard';
import {AchievementData, Activitydata, Peopledata} from '../constants/data';
import AchievementCard from '../components/Profile/AchievementCard';
import ActivityCard from '../components/Profile/ActivityCard';
import {getFaucetHost, requestSuiFromFaucetV0} from '@mysten/sui.js/faucet';
import {CoinBalance, SuiClient, getFullnodeUrl} from '@mysten/sui.js/client';
import {MIST_PER_SUI} from '@mysten/sui.js/utils';
import Clipboard from '@react-native-clipboard/clipboard';
import {useAddress} from '../../Context/AddressContext';
import axios from 'axios';
import {useHabitude} from '../../Context/HabbitudeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

// create a component
const Profile = () => {
  const [balanceAddress, setBalance] = useState(0);
  const {address, keypair, setAddress, setKeypair} = useAddress();
  const [selected, setSelected] = useState('Activity');
  const rpcUrl = getFullnodeUrl('testnet');
  const {setHabitudeId} = useHabitude();
  const suiClient = new SuiClient({url: rpcUrl});
  var navigation = useNavigation();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    getBalances();
  }, []);
  const getTokens = async () => {
    try {
      await requestSuiFromFaucetV0({
        // connect to Devnet
        host: getFaucetHost('testnet'),
        recipient: address,
      });
      getBalances();
    } catch (e: any) {
      console.error(e.message);
    }
  };

  const initialize = async () => {
    const serverUrl = 'http://localhost:3000/initialize'; // Replace with your local IP address
    Toast.show({
      type: 'info',
      text1: 'Request was sent',
    });
    try {
      const response = await axios.post(
        serverUrl,
        {
          keypair: {
            keypair: {
              publicKey: Array.from(keypair.keypair.publicKey), // Convert to array
              secretKey: Array.from(keypair.keypair.secretKey), // Include secretKey if needed
            },
          },
          address,
        },
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          transformResponse: res => {
            // Do your own parsing here if needed ie JSON.parse(res);
            return res;
          },
          responseType: 'json',
        },
      );
      const responseData = response.data;
      if (typeof responseData === 'string') {
        console.log('Parsed data:', JSON.parse(responseData));
        const parsedData = JSON.parse(responseData);
        setHabitudeId(parsedData.habitudeId);
        Toast.show({
          type: 'success',
          text1: 'Transaction Successfull!!',
        });
      } else {
        console.log('Habitude ID:', responseData.habitudeId);
        console.log('Transaction Digest:', responseData.transactionDigest);
        console.log('Execution Status:', responseData.executionStatus);
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        // Request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };
  const getBalances = async () => {
    const balanceResponse = await suiClient.getBalance({owner: address});
    const suiBalance = balance(balanceResponse);
    setBalance(suiBalance);
  };
  const balance = (balance: CoinBalance) => {
    const rawBalance =
      Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
    return Number(rawBalance.toFixed(2));
  };
  const copyToClipboard = () => {
    Clipboard.setString(address);
  };
  const acountHumanReadable = () => {
    if (!address) {
      return '';
    }

    const firstChars = address.slice(0, 5);
    const lastChars = address.slice(address.length - 3, address.length);

    return `${firstChars}...${lastChars}`;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userAddress');
      await AsyncStorage.removeItem('userPrivateKey');
      setKeypair(null);
      setAddress(null);

      // Optionally navigate to the login screen
      navigation.navigate('Onboarding');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View>
      <View style={styles.topHeader}>
        <View style={styles.profileContainer}>
          <Text style={styles.headerTitle}>Your Profile</Text>
          <View>
            <TouchableOpacity
              style={styles.depositButton}
              onPress={() => logout()}>
              <Text style={styles.depositButtonText}>Log out</Text>
            </TouchableOpacity>
            {/* <Image source={require('../assets/images/Settings.png')} /> */}
          </View>
        </View>
        <View style={styles.usercontainer}>
          <Image
            style={styles.userImage}
            source={require('../assets/images/profile.webp')}
          />
          <View>
            <Text style={styles.userName}>Kaushik</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.addressTxt}>{acountHumanReadable()}</Text>
              <TouchableOpacity onPress={() => copyToClipboard()}>
                <Text>📄</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.userPointsContainer}>
              <Image
                style={styles.userBadgeImage}
                source={require('../assets/images/Medal.png')}
              />
              <Text style={styles.userPoints}>1452 Points</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => initialize()}>
            <Text>Initialize</Text>
          </TouchableOpacity>
          <View style={styles.profileDetailContainer}>
            <Text style={styles.balanceTxt}>Balance: {balanceAddress}</Text>
            <TouchableOpacity
              onPress={() => getTokens()}
              style={styles.depositButton}>
              <Text style={styles.depositButtonText}>Deposit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.HeaderMenu}>
          <TouchableOpacity
            style={
              selected === 'Activity'
                ? styles.HeaderMenuTitleActive
                : styles.HeaderMenuTitle
            }
            onPress={() => setSelected('Activity')}>
            <Text
              style={
                selected === 'Activity'
                  ? {color: COLORS.primary}
                  : {color: COLORS.Black}
              }>
              Activity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selected === 'People'
                ? styles.HeaderMenuTitleActive
                : styles.HeaderMenuTitle
            }
            onPress={() => setSelected('People')}>
            <Text
              style={
                selected === 'People'
                  ? {color: COLORS.primary}
                  : {color: COLORS.Black}
              }>
              People
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              selected === 'Achievements'
                ? styles.HeaderMenuTitleActive
                : styles.HeaderMenuTitle
            }
            onPress={() => setSelected('Achievements')}>
            <Text
              style={
                selected === 'Achievements'
                  ? {color: COLORS.primary}
                  : {color: COLORS.Black}
              }>
              Achievements
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {selected === 'Activity' ? (
        <ScrollView style={styles.Container}>
          <Text style={styles.connectedText}>Activity</Text>
          <FlatList
            data={Activitydata}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ActivityCard
                name={item.name}
                desc={item.desc}
                image={item.image}
              />
            )}
          />
          <View style={styles.emptyContainer}></View>
        </ScrollView>
      ) : selected === 'People' ? (
        <ScrollView style={styles.Container}>
          <Text style={styles.connectedText}>261 Connected</Text>
          <FlatList
            data={Peopledata}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <PeopleCard
                name={item.name}
                points={item.points}
                image={item.image}
              />
            )}
          />
          <View style={styles.emptyContainer}></View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.Container}>
          <Text style={styles.connectedText}>2 Achievements</Text>
          <FlatList
            data={AchievementData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <AchievementCard
                name={item.name}
                desc={item.desc}
                emoji={item.emoji}
                color={item.color}
              />
            )}
          />
          <View style={styles.emptyContainer}></View>
        </ScrollView>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  emptyContainer: {
    height: 350,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  topHeader: {
    height: 251,
    backgroundColor: COLORS.WhiteBG,
    paddingTop: 75,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: COLORS.Gray,
  },
  headerTitle: {
    color: COLORS.Black,
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
  },
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  usercontainer: {
    flexDirection: 'row',
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 56,
    marginRight: 10,
  },
  userName: {
    color: COLORS.Black,
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
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
  userBadgeImage: {},
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
  Container: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  connectedText: {
    color: COLORS.Black,
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
  },
  depositButton: {
    marginTop: 5,
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  depositButtonText: {
    color: COLORS.WhiteBG,
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
  },
  profileDetailContainer: {
    flexDirection: 'column',
    marginLeft: 'auto',
  },
  balanceTxt: {
    color: COLORS.Black,
  },
  addressTxt: {
    color: COLORS.Black,
  },
});

//make this component available to the app
export default Profile;
