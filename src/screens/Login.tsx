//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {privateKeyProvider, web3auth} from '../../App';
import {IProvider} from '@web3auth/base';
import {LOGIN_PROVIDER} from '@web3auth/react-native-sdk';
import {Ed25519Keypair} from '@mysten/sui.js/keypairs/ed25519';
import {COLORS} from '../constants/color';
import {requestSuiFromFaucetV0, getFaucetHost} from '@mysten/sui.js/faucet';
import {CoinBalance, getFullnodeUrl, SuiClient} from '@mysten/sui.js/client';
import {MIST_PER_SUI} from '@mysten/sui.js/utils';
import Clipboard from '@react-native-clipboard/clipboard';

// create a component
const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [address, setAddress] = useState('');
  const [balanceAddress, setBalance] = useState(0);
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [console, setConsole] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const scheme = 'web3authrnbareauth0example'; // Or your desired app redirection scheme
  const resolvedRedirectUrl = `${scheme}://openlogin`;
  const rpcUrl = getFullnodeUrl('devnet');
  const suiClient = new SuiClient({url: this.rpcUrl});

  useEffect(() => {
    const init = async () => {
      await web3auth.init();
    };
    init();
  }, []);

  const login = async () => {
    try {
      if (!web3auth.ready) {
        setConsole('Web3auth not initialized');
        return;
      }
      if (!email) {
        setConsole('Enter email first');
        return;
      }
      //   console.log('Logging in');
      setConsole('Logging in');
      await web3auth.login({
        loginProvider: LOGIN_PROVIDER.EMAIL_PASSWORDLESS,
        redirectUrl: resolvedRedirectUrl,
        extraLoginOptions: {
          login_hint: email,
        },
      });

      if (web3auth.privKey) {
        // try {
        //   const privateKey: any = await privateKeyProvider.request({
        //     method: 'private_key',
        //   });
        //   setConsole(privateKey);
        // } catch (e: any) {
        //   setConsole(e.message);
        // }

        // Create a Uint8Arrray from private key which is in hex format
        const privateKeyUint8Array = new Uint8Array(
          web3auth.privKey
            .match(/.{1,2}/g)!
            .map((byte: any) => parseInt(byte, 16)),
        );

        // Create an instance of the Sui local key pair manager
        const keyPair = Ed25519Keypair.fromSecretKey(privateKeyUint8Array);

        const address = keyPair.toSuiAddress();
        // console.log('working');
        setConsole(address);
        setAddress(address);
      }
    } catch (e: any) {
      setConsole(e.message);
    }
  };
  const getBalance = async () => {
    const balanceResponse = await this.suiClient.getBalance({owner: address});
    const suiBalance = balance(balanceResponse);
    setBalance(suiBalance);
  };
  const balance = (balance: CoinBalance) => {
    return Number.parseInt(balance.totalBalance) / Number(MIST_PER_SUI);
  };
  const copyToClipboard = () => {
    Clipboard.setString(address);
  };
  const getTokens = async () => {
    try {
      await requestSuiFromFaucetV0({
        // connect to Devnet
        host: getFaucetHost('devnet'),
        recipient: address,
      });
    } catch (e: any) {
      setConsole(e.message);
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => login()}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      {/* {address && ( */}
      <View>
        <Text>Address: {address}</Text>
      </View>
      {/* )} */}
      <Text>{console}</Text>
      <TouchableOpacity onPress={() => getTokens()}>
        <Text>Get Tokens</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getBalance()}>
        <Text>Get Balance</Text>
      </TouchableOpacity>
      <View>
        <Text>Balance: {balanceAddress}</Text>
      </View>
      <TouchableOpacity onPress={() => copyToClipboard()}>
        <Text>Copy the address</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  input: {
    color: COLORS.Black,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontFamily: 'Quicksand-Regular',
  },
});

//make this component available to the app
export default Login;
