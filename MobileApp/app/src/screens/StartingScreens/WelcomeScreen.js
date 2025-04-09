import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef } from 'react';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {
  responsiveFontSize,
} from "react-native-responsive-dimensions";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);

  useEffect(() => {
    if (isFocused) {
      if (img1Ref.current) {
        img1Ref.current.bounceInDown(3500);
      }
      if (img2Ref.current) {
        img2Ref.current.bounceIn(5000);
      }
    }
  }, [isFocused]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
    >
      <StatusBar barStyle='dark-content' backgroundColor='#fff' />
      <View style={styles.imgSection}>
        <Animatable.Image
          ref={img2Ref}
          source={require('../../images/new.png')}
          style={styles.img2}
          duration={5000}
          animation='bounceIn'
        />
        <Animatable.Image
          ref={img1Ref}
          source={require('../../images/welcome_1.png')}
          style={styles.img1}
          duration={3500}
          animation='bounceInDown'
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.header}>Hello !</Text>
        <Text style={styles.text}>
          Your app for accurate and efficient measurements in the real world.
        </Text>

        <Button
          mode='contained'
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
        >
          SIGN UP
        </Button>

        <Button
          mode='contained'
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        >
          LOGIN
        </Button>
        {/* Switch page button 
        <Button
          mode='contained'
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          SWITCH PAGE
        </Button>
      */}  
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    margin:"2%",
    backgroundColor: '#007BFF',
    width:"85%",
    padding: 0.1,
  },

  imgSection: {
    flex: 1.1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSection: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  img1: {
    resizeMode: 'contain',
    position: 'absolute',
    top: '49%',
    left: '50%',
  },

  img2: {
    resizeMode: 'contain',
    position: 'absolute',
    top: '40%',
    width: '93%',
  },
  header: {
    position: 'absolute',
    top: '-7%',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(4),
  },
  text: {
    position: 'absolute',
    top: '7%',
    width: "95%",
    textAlign: 'center',
    fontSize: responsiveFontSize(1.9),
  },
});
