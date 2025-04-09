import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons

const handleIconPress = () => {
  // Display an alert message when the icon is pressed
  Alert.alert(
    "Select to calculate effort for removing weeds",
    `Low: Distributed all over the land in a height below 50cm. Can be removed by laborers. No need machines.
    
Medium: Distributed all over the land in a height below 75cm. Can be removed by laborers. No need machines.
    
High: Distributed all over the land. Can't be removed by laborers. There can be small plants as well.Need machines (Backhoe, Excavator).

Note : If you only want to remove weeds or small plants in your land  choose only "Weeds" options.`,
    
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
    height: "66%",
    backgroundColor: "white",
    marginBottom: 0,
    marginTop: 1,
  },
  iconButton: {
    padding: 0,
  },
});