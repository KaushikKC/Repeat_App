import { useNavigation } from '@react-navigation/native';
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

// create a component
const MyComponent = () => {
    var navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Text style={{color:"black"}}> textInComponent </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Bottom')}
         >
          <Text >Create Bottom</Text>
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
});

//make this component available to the app
export default MyComponent;

