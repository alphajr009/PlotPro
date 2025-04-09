import { StyleSheet, View, StatusBar} from "react-native";
import React, { useEffect } from "react";
import * as Animatable from 'react-native-animatable';
import { CommonActions } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Reset the navigation stack to "Welcome" screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Welcome" }],
        })
      );
    }, 3000);

    return () => clearTimeout(timer); // Clear the timer if component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Animatable.Image 
        source={require("../../images/logo.png")} 
        style={styles.image} 
        duration={2000}
        animation="zoomIn"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: responsiveWidth(55),
    height: responsiveHeight(35),
    resizeMode: "contain",
  }
});

export default SplashScreen;
