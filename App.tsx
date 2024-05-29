/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import MyStack from './src/navigation';
import {COLORS} from './src/constants/color';
import * as WebBrowser from '@toruslabs/react-native-web-browser';
import EncryptedStorage from 'react-native-encrypted-storage';
import Web3Auth, {OPENLOGIN_NETWORK} from '@web3auth/react-native-sdk';
import {CommonPrivateKeyProvider} from '@web3auth/base-provider';
import {CHAIN_NAMESPACES} from '@web3auth/base';
import {AddressProvider} from './Context/AddressContext';
import SplashScreen from 'react-native-splash-screen';
import {HabitudeProvider} from './Context/HabbitudeContext';
import Toast from 'react-native-toast-message';

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.OTHER,
  chainId: '103',
  rpcTarget: 'https://fullnode.testnet.sui.io:443',
  displayName: 'Sui Testnet',
  blockExplorerUrl: 'https://suiexplorer.com/?network=testnet',
  ticker: 'SUI',
  tickerName: 'Sui',
  logo: 'https://cryptologos.cc/logos/sui-sui-logo.png?v=029',
};

const clientId =
  'BDB5MjOF1tXy7h-4pUgNC-JOgQ33xmP4fbkihjuZAbqRRlDAfmCG9UzKEi2lcua5D1DqXJjMqQXc9ELzPKfea-Q';

export const privateKeyProvider = new CommonPrivateKeyProvider({
  config: {chainConfig: chainConfig},
});

export const web3auth = new Web3Auth(WebBrowser, EncryptedStorage, {
  // Get it from Web3Auth Dashboard
  clientId,
  network: OPENLOGIN_NETWORK.SAPPHIRE_DEVNET,
});

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.WhiteBG}}>
      <NavigationContainer>
        <AddressProvider>
          <HabitudeProvider>
            <MyStack />
            <Toast />
          </HabitudeProvider>
        </AddressProvider>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
