import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/color';
import {hp, wp} from '../utils/ScreenDimension'; // Import wp from utils
import ChooseContainer from '../components/ChooseContainer';
import {useNavigation} from '@react-navigation/native';

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
        onPress={() => navigation.navigate('Bottom')}
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
    fontSize: 18,
    fontFamily: 'Quicksand-SemiBold',
  },
  headerSubTitle: {
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
