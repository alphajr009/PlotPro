import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons

const handleIconPress = () => {
  // Display an alert message when the icon is pressed
  Alert.alert(
    "Select to calculate effort for cutting trees",
    `Low: Tree with 0.5m average circumference. Enter tree count as well.
    
Medium: Tree with 1m average circumference. Enter tree count as well.
    
High: Tree with 2m average circumference. Enter tree count as well.

Note : If you only want to cut trees in your land choose only "Plants" options.`,

    
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
    marginLeft: 4,
    width: "5%",
    height: "66%",
    marginBottom: 0,
    marginTop: 1,
  },
  iconButton: {
    padding: 0,
  },
});