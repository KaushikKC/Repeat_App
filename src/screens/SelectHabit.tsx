import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/color';
import {hp, wp} from '../utils/ScreenDimension'; // Import wp from utils
import ChooseContainer from '../components/ChooseContainer';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// List of habits (replace with your actual list)
const habits = [
  {id: 1, emoji: '🏋️', name: 'Exercise'},
  {id: 2, emoji: '📖', name: 'Read'},
  {id: 3, emoji: '🧘‍♀️', name: 'Meditate'},
  {id: 4, emoji: '💧', name: 'Drink water'},
  {id: 5, emoji: '🚶', name: 'Walk'},
  // Add more habits as needed
];

const SelectHabit = () => {
  const [selectedHabits, setSelectedHabits] = useState([]);
  var navigation = useNavigation();

  const toggleSelection = (habit): any => {
    const isSelected = selectedHabits.some(h => h.id === habit.id);
    if (isSelected) {
      setSelectedHabits(selectedHabits.filter(h => h.id !== habit.id));
    } else {
      setSelectedHabits([...selectedHabits, habit]);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Select Habit</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle2}>Choose your first habits</Text>
          <Text style={styles.headerSubTitle}>
            You may add more habits later
          </Text>
        </View>
        {habits.map(habit => (
          <ChooseContainer
            key={habit.id}
            emoji={habit.emoji}
            name={habit.name}
            selected={selectedHabits.some(h => h.id === habit.id)}
            onPress={() => toggleSelection(habit)}
            style={styles.chooseContainer} // Add this line
          />
        ))}
      </View>
      <TouchableOpacity
        // onPress={() => navigation.navigate('Bottom')}
        onPress={ async() =>{
          console.log(selectedHabits);
          await AsyncStorage.setItem("habits", JSON.stringify(selectedHabits))

        
          const name = await AsyncStorage.getItem('name');
          const age = await AsyncStorage.getItem('age');
          const email = await AsyncStorage.getItem('email');
          const selectedGender = await AsyncStorage.getItem('selectedGender');
const address =       await AsyncStorage.getItem('userAddress');
const activityNames = selectedHabits.map(selectedHabit => selectedHabit.name);

console.log(activityNames);
          console.log(name,age,email,selectedGender,address)



          try {
            const serverUrl = "http://192.168.0.100:3001/api/users/signup"

            const res = await axios.post(serverUrl,{
              
                name: name,
                dateOfBirth: age,
                gender: selectedGender,
                email: email,
                address: address,
                favoriteHabits: activityNames.map(name => ({
                  name,
                  decidedFrequency: "10",
                  currentProgress: "3",
                  streak: "7"
                }))
              
            },
            {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              transformResponse: res => {
                // Do your own parsing here if needed ie JSON.parse(res);
                return res;
              },
              responseType: 'json',
            })

            if(res.status === 201){
              console.log("success");
                        navigation.navigate('Bottom')

            }
            else{
              console.log("failed");
              
            }
          } catch (error) {
            console.log("error",error);
            
          }

        }}
        style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  container: {
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  chooseContainer: {},
  headerTitleContainer: {
    marginVertical: 10,
    width: wp(100) - 48,
  },
  headerTitle2: {
    color: COLORS.Black,
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
  },
  headerSubTitle: {
    color: COLORS.Black,
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
    marginTop: 5,
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

export default SelectHabit;
