import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {hp, wp} from '../utils/ScreenDimension';
import LinearGradient from 'react-native-linear-gradient';
import apple from '../assets/images/apple.png';
import google from '../assets/images/Google.png';
import facebook from '../assets/images/facebook.png';
import {slides} from '../constants/data';
import {Slide} from '../components/Slide';

import { ConnectButton } from '@mysten/dapp-kit';

import { Web3Auth } from "@web3auth/modal";
import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { assert } from '@mysten/sui.js/utils';
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.OTHER,
  chainId: "35834a8a",
  rpcTarget: "https://fullnode.mainnet.sui.io:443",
  displayName: "Sui Mainnet",
  blockExplorerUrl: "https://suiexplorer.com/",
  ticker: "SUI",
  tickerName: "Sui",
  logo: "https://cryptologos.cc/logos/sui-sui-logo.png?v=029",
};
const privateKeyProvider = new CommonPrivateKeyProvider({
  config: { chainConfig: chainConfig }
});
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io

const web3auth = new Web3Auth({
  // Get it from Web3Auth Dashboard
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProvider,
});




const MyComponent = () => {
  var navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef<FlatList>(null);
  const updateCurrentSlideIndex = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / wp(100));
    setCurrentSlideIndex(currentIndex);
  };


  const test = async() => {
    await web3auth.initModal();
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
          
          onPress={() => navigation.navigate('CreateAccount')}>
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
    height: hp(100),
    width: wp(100),
  },
  slideContainer: {
    height: hp(100) * 0.6,
    justifyContent: 'center',
    marginTop: 20,
  },
  slideIndex: {
    backgroundColor: 'white',
    width: 20,
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
    marginTop: hp(10),
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
    marginRight: 5,
  },
  terms: {
    fontSize: 12,
    opacity: 50,
    color: '#AFB4FF',
    marginTop: 10,
    fontFamily: 'Quicksand-Regular',
  },
});

export default MyComponent;
