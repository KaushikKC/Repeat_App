//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Switch} from 'react-native';
import {COLORS} from '../constants/color';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {wp} from '../utils/ScreenDimension';
import EditableInputContainer from '../components/Create/InputContainer';

// create a component
const CreateScreen = () => {
  const [selected, setSelected] = useState('Habit');
  const [dataselected, setDataSelected] = useState('Mobile');
  const [habitName, setHabitName] = useState('');
  const [goalName, setGoalName] = useState('1 times');
  const [goalDescription, setGoalDescription] = useState('or more per day');
  const [targetName, setTargetName] = useState('5,000 steps');
  const [targetDescription, setTargetDescription] = useState('or more per day');
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);

  const toggleReminder = () => {
    setIsReminderEnabled(previousState => !previousState);
  };

  const handleSave = (label, name, description) => {
    switch (label) {
      case 'Goal':
        // Save the edited goal (name and description) to the appropriate data structure or database
        setGoalName(name);
        setGoalDescription(description);
        break;
      case 'Target':
        // Save the edited target (name and description) to the appropriate data structure or database
        setTargetName(name);
        setTargetDescription(description);
        break;
      case 'Stake':
        // Save the edited stake (name and description) to the appropriate data structure or database
        console.log('Saving edited stake...');
        break;
      // Add additional cases for other input labels if needed
      default:
        console.log('Invalid label:', label);
    }
    // Update the habit name, description, and regular item here if needed
  };

  return (
    <View>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Create Habit</Text>
      </View>
      <ScrollView style={styles.CreateContent}>
        <View>
          <Text>CREATE</Text>
          <View style={styles.HeaderMenu}>
            <TouchableOpacity
              style={
                selected === 'Habit'
                  ? styles.HeaderMenuTitleActive
                  : styles.HeaderMenuTitle
              }
              onPress={() => setSelected('Habit')}>
              <Text style={selected === 'Habit' && {color: COLORS.primary}}>
                Habit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selected === 'Challenge'
                  ? styles.HeaderMenuTitleActive
                  : styles.HeaderMenuTitle
              }
              onPress={() => setSelected('Challenge')}>
              <Text style={selected === 'Challenge' && {color: COLORS.primary}}>
                Challenge
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {selected == 'Habit' ? (
          <>
            <View>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={habitName}
                onChangeText={text => setHabitName(text)}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Goal</Text>
              <EditableInputContainer
                label="Goal"
                initialName={goalName}
                initialDescription={goalDescription}
                onSave={handleSave}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Target</Text>
              <EditableInputContainer
                label="Target"
                initialName={targetName}
                initialDescription={targetDescription}
                onSave={handleSave}
              />
            </View>
            <View>
              <Text style={styles.inputLabel}>Remainder</Text>
              <View style={styles.inputContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.description}>
                    Remember to set off time for a workout today.
                  </Text>
                  <Switch
                    trackColor={{false: '#767577', true: COLORS.Green}}
                    thumbColor={COLORS.WhiteBG}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleReminder}
                    value={isReminderEnabled}
                  />
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.inputLabel}>DATA</Text>
              <View style={styles.HeaderMenu}>
                <TouchableOpacity
                  style={
                    dataselected === 'Mobile'
                      ? styles.HeaderMenuTitleActive
                      : styles.HeaderMenuTitle
                  }
                  onPress={() => setDataSelected('Mobile')}>
                  <Text
                    style={
                      dataselected === 'Mobile' && {color: COLORS.primary}
                    }>
                    Mobile
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    dataselected === 'Device'
                      ? styles.HeaderMenuTitleActive
                      : styles.HeaderMenuTitle
                  }
                  onPress={() => setDataSelected('Device')}>
                  <Text
                    style={
                      dataselected === 'Device' && {color: COLORS.primary}
                    }>
                    Device
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View>
            <Text>Challenge</Text>
          </View>
        )}
        <View style={styles.Container}></View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  Container: {
    height: 230,
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
  HeaderMenu: {
    height: 36,
    width: wp(100) - 48,
    backgroundColor: COLORS.Gray,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 4,
    marginVertical: 12,
  },
  HeaderTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderMenuTitle: {
    height: 28,
    width: wp(43),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    fontFamily: 'Quicksand-Regular',
  },
  HeaderMenuTitleActive: {
    height: 28,
    width: wp(43),
    backgroundColor: COLORS.WhiteBG,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
    color: COLORS.primary,
    fontFamily: 'Quicksand-Regular',
  },
  CreateContent: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    fontFamily: 'Quicksand-Regular',
  },
  inputContainer: {
    width: wp(100) - 48,
    height: 68,
    padding: 16,
    backgroundColor: COLORS.WhiteBG,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  edit: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderColor: COLORS.Grey,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'Quicksand-semiBold',
    fontSize: 14,
  },
  description: {
    fontFamily: 'Quicksand-Regular',
    color: COLORS.Grey,
    width: 250,
  },
  regularBox: {
    height: 32,
    backgroundColor: COLORS.Gray,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  regularItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  regularItemsText: {
    fontFamily: 'Quicksand-Regular',
    marginHorizontal: 4,
  },
  regularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: COLORS.WhiteBG,
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
});

//make this component available to the app
export default CreateScreen;
