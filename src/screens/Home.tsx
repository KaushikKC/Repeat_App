//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,FlatList} from 'react-native';
import {COLORS} from '../constants/color';
import {hp, wp} from '../utils/ScreenDimension';
import ChallengesCard from '../components/Home/ChallegengesCard';
import HabitsCard from '../components/Home/HabitsCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// create a component
const Home = () => {
  const [selected, setSelected] = useState('Today');
  const [Name, setName] = useState("")
  const [Challenges, setChallenges] = useState({})
  const [habits, setHabits] = useState([])
  const [email, setEmail] = useState("")
  const getter = async() => {
    const res = await AsyncStorage.getItem("alldata");
    console.log("res",res);

    const js = JSON.parse(res)
    console.log(js);

    console.log(js.name);

    try {
      const res = await axios.post("http://192.168.0.100:3001/api/users/login",{
        email:"thirumurugan82003@gmail.com"
      })
      console.log(res.data)
      console.log(res.data.name)
      console.log(res.data.habits)
      setName(res.data.name)
      setEmail(res.data.email)

      setHabits(res.data.habits)
    } catch (error) {
      
    }
    
    


    
  }
  useEffect( ()=>{
getter();
  },[])

  const handlePlusClick = async(akey:any, email:any, name:any) => {
    console.log(akey);
    console.log(email);
    try {
      const res = await axios.post("http://192.168.0.100:3001/api/users/update",{
        email:email, habitId: akey, name
      })

if(res.status == 200)
{
  console.log(res.data)
  getter()

}    } catch (error) {
      console.log(error);
      
    }
  };



  return (
    <View style={styles.container}>
      <View style={styles.headerDiv}>
        <View style={styles.headerContainer}>
          <View style={styles.HeaderTitleContainer}>
            <View>
              <Text style={styles.Headertitle}>Hi, {Name} 👋🏻</Text>
              <Text style={styles.HeaderSubTitle}>
                Let’s make habits together!
              </Text>
            </View>
            <Image source={require('../assets/images/Mood.png')} />
          </View>
          <View style={styles.HeaderMenu}>
            <TouchableOpacity
              style={
                selected === 'Today'
                  ? styles.HeaderMenuTitleActive
                  : styles.HeaderMenuTitle
              }
              onPress={() => setSelected('Today')}>
              <Text
                style={
                  selected === 'Today'
                    ? {color: COLORS.primary}
                    : {color: COLORS.Black}
                }>
                Today
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selected === 'Circles'
                  ? styles.HeaderMenuTitleActive
                  : styles.HeaderMenuTitle
              }
              onPress={() => setSelected('Circles')}>
              <Text
                style={
                  selected === 'Circles'
                    ? {color: COLORS.primary}
                    : {color: COLORS.Black}
                }>
                Circles
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {selected === 'Today' ? (
        <View style={styles.HomeContent}>
          <View>
            <View style={styles.SectionHeading}>
              <Text style={styles.SectionTitle}>Challenges</Text>
              <Text style={styles.SectionView} onPress={getter}>VIEW ALL</Text>
            </View>
            <ChallengesCard
              name="Daily Fit Challenge!"
              description="5 days left"
              people="4"
              progress={0.8}
            />
          </View>
          <View>
            <View style={styles.SectionHeading}>
              <Text style={styles.SectionTitle}>Habits</Text>
              <Text style={styles.SectionView}>VIEW ALL</Text>
            </View>
            <FlatList
              data={habits}
              keyExtractor={habit => habit._id}
              renderItem={({ item }) => (
                <HabitsCard
                  key={item._id}
                  akey={item._id}
                  name={item.name}
                  email={email}
                  currentProgress={item.currentProgress}
                  decidedFrequency={item.decidedFrequency}
                  description={`${item.currentProgress}/${item.decidedFrequency}`}
                  emoji={item.name === 'Drink water' ? '💧' : item.name === 'Walk' ? '🚶‍♂️' : '🌿'}
                  progress={item.currentProgress / item.decidedFrequency}
                  onclick={handlePlusClick}
                />
              )}
            />
          </View>
        </View>
      ) : (
        <View style={styles.commingSoonContainer}>
          <Text style={styles.commingSoonText}>Coming Soon...</Text>
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerDiv: {
    height: 180,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    marginTop: 60,
    paddingHorizontal: 24,
  },
  Headertitle: {
    color: COLORS.Black,
    fontSize: 18,
    fontFamily: 'Quicksand-semiBold',
  },
  HeaderSubTitle: {
    color: COLORS.Grey,
    fontSize: 14,
    fontFamily: 'Quicksand-Regular',
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
    width: wp(43),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    borderRadius: 10,
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
  },
  HomeContent: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  SectionHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  SectionTitle: {
    color: COLORS.Black,
    fontSize: 14,
    fontFamily: 'Quicksand-semiBold',
  },
  SectionView: {
    color: COLORS.primary,
    fontFamily: 'Quicksand-semiBold',
  },
  commingSoonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(100) - 340,
  },
  commingSoonText: {
    color: COLORS.Black,
  },
});
export default Home;
