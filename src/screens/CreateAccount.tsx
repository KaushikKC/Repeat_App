//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../constants/color';
import {hp, wp} from '../utils/ScreenDimension';
import ChooseContainer from '../components/ChooseContainer';
import {useNavigation} from '@react-navigation/native';

// create a component
const CreateAccount = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [selectedGender, setSelectedGender] = useState('Male');
  var navigation = useNavigation();
  return (
    <View style={styles.outerContainer}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>
      <View style={styles.accountContent}>
        <View>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter stake amount"
            keyboardType="numeric"
            value={age}
            onChangeText={text => setAge(text)}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address" // Set keyboard type to email
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>
        <View>
          <Text style={styles.inputLabel}>Choose the Gender</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ChooseContainer
              emoji="🤷🏻‍"
              name="Male"
              selected={selectedGender === 'Male'}
              onPress={() => setSelectedGender('Male')}
            />
            <ChooseContainer
              emoji="🙋🏻‍♀️"
              name="Female"
              selected={selectedGender === 'Female'}
              onPress={() => setSelectedGender('Female')}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SelectHabit')}
        style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  outerContainer: {
    height: hp(100),
  },
  topHeader: {
    height: 135,
    backgroundColor: COLORS.WhiteBG,
    paddingTop: 80,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderColor: COLORS.Gray,
  },
  headerTitle: {
    color: COLORS.Black,
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
  },
  inputLabel: {
    color: COLORS.Black,
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
    marginVertical: 8,
  },
  input: {
    color: COLORS.Black,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontFamily: 'Quicksand-Regular',
  },
  accountContent: {
    padding: 24,
  },
  chooseContainer: {
    height: 134,
    backgroundColor: COLORS.WhiteBG,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    width: wp(40),
    borderRadius: 10,
  },
  emoji: {
    fontSize: 40,
  },
  name: {
    color: COLORS.Black,
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },
  createButton: {
    position: 'absolute',
    bottom: 100, // Adjust as needed to position the button above the bottom navigation
    left: 24,
    right: 24,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  createButtonText: {
    color: COLORS.WhiteBG,
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
  },
});

//make this component available to the app
export default CreateAccount;
