import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons

const handleIconPress = () => {
  // Display an alert message when the icon is pressed
  Alert.alert(
    "Important",
    "This is an estimated count for the given details, allowing for a variance of +/- 10 plants from the actual value for flexibility and potential contingencies.",
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
          size={18}
          color="#007BFF"
          
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topSection: {
    flexDirection: "row",
    marginLeft: 15,
    width: "100%",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 0,
    marginTop: -30,
  },
  iconButton: {
    padding: 6,
    paddingLeft: -10,
    paddingRight:12,
  },
});