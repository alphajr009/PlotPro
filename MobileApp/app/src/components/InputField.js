// InputField.js
import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const { width } = Dimensions.get("window");

const InputField = ({ placeholder, value, onChangeText, secureTextEntry, icon, showEyeIcon, onPressEye }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
    onPressEye && onPressEye(!isPasswordVisible);
  };

  return (
    <View style={styles.inputContainer}>
      {icon && <FontAwesomeIcon icon={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#C5C7CB"}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
      />
      {showEyeIcon && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.touchableArea}>
            <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: width * 0.1, // Adjusted to 10% of the screen width
   width: width * 0.85, // Adjusted to 80% of the screen width
   borderWidth: 1,
   borderColor: "#CED0D4",
   borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: width * 0.02, // Adjusted to 3% of the screen widt
    position: "relative",
  },
  input: {
    height: width * 0.1, // Adjusted to 10% of the screen width
    flex: 1,
    paddingLeft: 10,
    fontSize: width * 0.04, // Adjusted font size based on screen width
  },
  icon: {
color: "#65676b",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: width * 0.01, // Adjusted to 1% of the screen width
    justifyContent: "center",
    alignItems: "center",
  },
  touchableArea: {
    padding: width * 0.02, // Adjusted to 2% of the screen width
  },
  eyeIcon: {
    color: "#65676b",
  },
});

export default InputField;
