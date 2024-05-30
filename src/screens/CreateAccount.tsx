//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {COLORS} from '../constants/color';
import {hp, wp} from '../utils/ScreenDimension';
import ChooseContainer from '../components/ChooseContainer';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {useAddress} from '../../Context/AddressContext';
import {web3auth} from '../../App';
import githubUsername from 'github-username';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummyProfilePic = require('../assets/images/profile.webp');

// create a component
const CreateAccount = () => {
  const [name, setName] = useState('');
  const {email, setEmail} = useAddress();
  const [age, setAge] = useState('');
  const [selectedGender, setSelectedGender] = useState('Male');
  const [selectedImage, setSelectedImage] = useState(dummyProfilePic);
  var navigation = useNavigation();
  const uploadImg = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
      compressImageMaxHeight: 300,
      compressImageMaxWidth: 400,
      compressImageQuality: 0.5,
      mediaType: 'photo',
    }).then(image => {
      setSelectedImage({uri: image.path});
    });
  };
  useEffect(() => {
    setEmail(web3auth.userInfo()?.email);
    getUsername();
  }, []);

  const getUsername = async () => {
    console.log(await githubUsername(email));
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Create Account</Text>
      </View>
      <View style={styles.accountContent}>
        {selectedImage && ( // Render the image preview if an image is selected
          <Image
            source={selectedImage}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        )}
        <TouchableOpacity onPress={() => uploadImg()}>
          <Text style={styles.inputImgLabel}>Upload Profile</Text>
        </TouchableOpacity>
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
            placeholder="Enter your age"
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
            editable={false}
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
        // onPress={() => navigation.navigate('SelectHabit')}
        onPress={async () => {
          console.log(name, age, email, selectedGender);
          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('age', age);
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('selectedGender', selectedGender);
          navigation.navigate('SelectHabit');
        }}
        style={styles.createButton}>
        <Text style={styles.createButtonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 30,
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
    bottom: 0, // Adjust as needed to position the button above the bottom navigation
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
  imagePreview: {
    width: 50,
    height: 50,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputImgLabel: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 10,
  },
});

//make this component available to the app
export default CreateAccount;
