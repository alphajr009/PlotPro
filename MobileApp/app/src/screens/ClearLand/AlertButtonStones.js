import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons

const handleIconPress = () => {
  // Display an alert message when the icon is pressed
  Alert.alert(
    "Select to calculate effort for breaking large stones",
    `Small: 0.5m³ stone. Enter stone count as well.
    
Large: 1m³ stone. Enter stone count as well.

Note : If you only want to break stones in your land choose only "Stones" options.`,
    
    [
      {
        text: "OK",
        onPress: () => console.log("OK Pressed"),
      },
    ],
    { cancelable: false }
  );
};

export default function AlertButton() {
  return (
    <View style={styles.topSection}>
      <TouchableOpacity style={styles.iconButton} onPress={handleIconPress}>
        <MaterialCommunityIcons
          name="alert-circle-outline"
          size={15}
          color="#007BFF"
          
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    marginLeft: 2,
    width: "5%",
    height: "26%",
    marginBottom: 0,
    marginTop: 1,
  },
  iconButton: {
    padding: 0,
  },
});