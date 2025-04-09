import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import MaterialCommunityIcons

const handleIconPress = () => {
  // Display an alert message when the icon is pressed
  Alert.alert(
    "Calculation happens based on those assumptions:",
    `For "High" weed types a backhoe is added if not added by user.
    
For tress a chainsaw is added if not added by user.
    
For stones a excavator breaker is added if not added by user.`,
    
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
    marginRight: 5,
    width: "8%",
    height: "60%",
    marginBottom: 10,
    marginTop: 2,
  },
  iconButton: {
    padding: 0,
  },
});