import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { Appbar, Button, TextInput } from "react-native-paper";
import AxiosInstance from "../../AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ForgotPassword({ route }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const { email } = route.params;
  const [passwordError, setPasswordError] = useState("");

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(
        "Password must be 8+ character with uppercase, lowercase, digit, and special character."
      );
      return;
    }

    if (!(newPassword === confirmPassword)) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }


    const token = await AsyncStorage.getItem("token");
    
    AxiosInstance.post("/api/users/change-password", { email, newPassword })
      .then((response) => {
        if (response.status === 200) {
          Alert.alert(
            "Password Changed Successfully",
            "Your password has been changed successfully.",
            [
              {
                text: "OK",
                onPress: () => {
                  if (token != null) {
                    navigation.navigate("ProfileManagement");
                  } else {
                    navigation.navigate("Login");
                  }
                },
              },
            ],
            { cancelable: false }
          );
        }
      })
      .catch((err) => {
        const data = err.response.data;
        Alert.alert("Error", "An error occurred while changing password");
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
        </Appbar.Header>

        <View style={styles.Content}>
          <View style={styles.headerContainer}>
            <Text style={styles.head}>Create New Password</Text>
            <Text style={styles.text}>Password must be at least 8 digits</Text>
          </View>

          <View style={styles.field}>
            <View style={{ marginBottom: 10 }}>
              <TextInput
                label="New Password"
                mode="outlined"
                outlineColor="#d9d7d2"
                activeOutlineColor="#007BFF"
                theme={{ roundness: 10 }}
                style={{
                  width: responsiveWidth(87),
                  fontSize: responsiveFontSize(1.9),
                }}
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            <TextInput
              label="confirm Password"
              mode="outlined"
              outlineColor="#d9d7d2"
              activeOutlineColor="#007BFF"
              theme={{ roundness: 10 }}
              style={{
                width: responsiveWidth(87),
                fontSize: responsiveFontSize(1.9),
              }}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
          </View>

          <Button
            mode="contained"
            onPress={handleChangePassword}
            style={styles.button}
          >
            Change Password
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(5),
    paddingBottom: responsiveHeight(3),
    backgroundColor: "#007BFF",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  headerContainer: {
    width: "90%",
  },
  head: {
    fontSize: responsiveFontSize(3),
    fontWeight: "bold",
    marginTop: "3%",
  },
  text: {
    fontSize: responsiveFontSize(1.9),
    marginTop: "1%",
  },
  container: {
    flex: 1,
  },
  staticSection: {
    height:
      Platform.OS === "android" ? responsiveHeight(8) : responsiveHeight(10),
    backgroundColor: "#007BFF",
    justifyContent: "center",
  },
  Content: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  field: {
    marginTop: responsiveHeight(3),
  },
  button: {
    marginTop: responsiveHeight(3),
    backgroundColor: "#007BFF",
    width: responsiveWidth(80),
    padding: responsiveHeight(0),
  },
  errorText: {
    color: "red",
    marginLeft: 10,
  },
});
