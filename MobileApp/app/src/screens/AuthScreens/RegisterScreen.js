import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Appbar, TextInput, Button } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AxiosInstance from "../../AxiosInstance";

export default function RegisterScreen() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const handleSignUp = async () => {
    if (!fName || !lName || !email || !password || !confirmPassword) {
      Alert.alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be 8+ character with uppercase, lowercase, digit, and special character."
      );
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Please enter a valid email address");
      return;
    }

    AxiosInstance.post("/api/users/register", { email, password, fName, lName })
      .then((response) => {
        if (response.data.success) {
          Alert.alert(
            "Success",
            "Please verify your email",
            [
              {
                text: "OK",
                onPress: () => navigation.navigate("Login"),
              },
            ],
            { cancelable: false }
          );

          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        if (
          error.response.data.error === "User with this email already exists."
        ) {
          Alert.alert(
            "Registration Error",
            "A user with this email already exists."
          );
        } else {
          Alert.alert("Error", "Something went wrong");
        }
      });
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : " height"}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
        </Appbar.Header>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.textSection}>
            <Text style={styles.head}>Hi!</Text>
            <Text style={styles.text}>Create a new account</Text>
          </View>

          <View style={styles.field}>
            <View style={{ marginBottom: 10 }}>
              <TextInput
                label="First Name"
                mode="outlined"
                outlineColor="#d9d7d2"
                activeOutlineColor="#007BFF"
                style={styles.inputButton}
                value={fName}
                theme={{ roundness: 10 }}
                onChangeText={(text) => setFName(text)}
              />
              <TextInput
                label="Last Name"
                mode="outlined"
                outlineColor="#d9d7d2"
                activeOutlineColor="#007BFF"
                style={styles.inputButton}
                value={lName}
                theme={{ roundness: 10 }}
                onChangeText={(text) => setLName(text)}
              />
              <TextInput
                label="Email"
                mode="outlined"
                outlineColor="#d9d7d2"
                activeOutlineColor="#007BFF"
                style={styles.inputButton}
                value={email}
                theme={{ roundness: 10 }}
                onChangeText={(text) => setEmail(text)}
              />
            </View>

            <View style={{ marginBottom: 10 }}>
              <TextInput
                label="Password"
                mode="outlined"
                outlineColor="#d9d7d2"
                activeOutlineColor="#007BFF"
                style={{
                  width: responsiveWidth(87),
                  fontSize: responsiveFontSize(1.9),
                }}
                theme={{ roundness: 10 }}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                secureTextEntry={!showPassword}
                right={
                  <TextInput.Icon
                    icon={showPassword ? "eye" : "eye-off"}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
            </View>

            <View style={{ marginBottom: 10 }}>
              <TextInput
                label="Confirm Password"
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
                secureTextEntry={!showConfirmPassword}
              />
            </View>

            <Button
              mode="contained"
              onPress={handleSignUp}
              style={styles.button}
            >
              SIGN UP
            </Button>
          </View>

          <View style={styles.loginTextContainer}>
            <Text style={styles.signupText}>Have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={[styles.signupText, styles.signupLink]}>Log in</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privacyTermsContainer}>
            <Text style={styles.privacyText}>
              By clicking "Sign up" you agree to our
            </Text>
            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.link}>Terms of Service</Text>
              </TouchableOpacity>
              <Text style={styles.andText}> and </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  button: {
    marginTop: responsiveHeight(3),
    backgroundColor: "#007BFF",
    width: responsiveWidth(80),
    padding: responsiveHeight(0),
  },

  head: {
    fontSize: responsiveFontSize(5),
    fontWeight: "bold",
    top: responsiveHeight(0.1),
  },
  text: {
    fontSize: responsiveFontSize(2),
  },
  feildText: {
    fontSize: responsiveFontSize(2),
    marginTop: responsiveHeight(1),
    paddingBottom: responsiveHeight(0.1),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },

  textSection: {
    marginLeft: responsiveWidth(5),
  },
  field: {
    width: "100%",
    top: responsiveHeight(3),
    alignItems: "center",
  },

  loginTextContainer: {
    flexDirection: "row",
    marginLeft: responsiveWidth(8),
    top: responsiveHeight(5),
  },

  signupText: {
    color: "#000",
    fontSize: responsiveFontSize(2),
  },

  signupLink: {
    color: "#007BFF",
    marginLeft: 7,
    textDecorationLine: "none",
  },

  privacyTermsContainer: {
    marginBottom: 10,
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },

  privacyText: {
    fontSize: responsiveFontSize(1.5),
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: responsiveHeight(0.5),
  },
  link: {
    color: "#007BFF",
    textDecorationLine: "none",
    fontSize: responsiveFontSize(1.5),
  },
  andText: {
    fontSize: responsiveFontSize(1.5),
  },
  errorText: {
    color: "red",
    fontSize: responsiveFontSize(1.5),
    width: responsiveWidth(87),
  },
  inputButton: {
    width: responsiveWidth(87),
    fontSize: responsiveFontSize(1.9),
    marginBottom: 10,
  },
});
