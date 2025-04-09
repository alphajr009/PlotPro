// src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const GoogleButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    borderRadius: 11,
    width: windowWidth * 0.85, // Adjusted to 80% of the screen width
    height: Dimensions.get('window').height * 0.05, // Adjusted to 5% of the screen height
    marginBottom: Dimensions.get('window').height * 0.02, // Adjusted to 1.5% of the screen height
  },
  buttonText: {
    color: '#fff',
    fontSize: windowWidth * 0.04, // Adjusted font size based on screen width
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GoogleButton;
