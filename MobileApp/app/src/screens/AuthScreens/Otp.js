import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Alert,
  StatusBar,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { Appbar, Button } from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AxiosInstance from "../../AxiosInstance";

const Otp = ({ route }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const inputRefs = Array.from({ length: 6 }, () => React.createRef());
  const { Otp, email } = route.params;
  const [endTime, setEndTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const countdownInterval = useRef(null);
  const [showResendText, setShowResendText] = useState(true);

  // Implement logic to handle OTP verification
  const handleContinue = async () => {
    const enteredOTP = otp.join("");

    
      AxiosInstance.post("/api/mail/verify",{ email, enteredOTP })
      .then((response) => {
      if (response.status === 200) {
        navigation.navigate("NewPassword", { email });
      }
    })
    .catch((error) => {
      if (error.response) {
        Alert.alert(
          "Error",
          error.response.data.error || error.response.data.message
        );
      } else if (error.request) {
        Alert.alert("Error", "No response from server");
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    })
  };

  const handleTryAgain = async () => {
    
      AxiosInstance.post("/api/mail/otp",{ email })
.then(async (response) => {
      if (response.status == 200) {
        const data = await response.data.otp;
        Alert.alert("OTP sent successfully");
      } else {
        Alert.alert("Error", data.error || "Something went wrong");
      }
    }) .catch((error) => {
      Alert.alert("Error", "Internal Server Error");
    })
    setShowResendText(false);
    setTimeout(() => setShowResendText(true), 60000);
    setEndTime(Date.now() + 60000);
  };

  useEffect(() => {
    if (endTime) {
      countdownInterval.current = setInterval(() => {
        const timeLeft = Math.floor((endTime - Date.now()) / 1000);

        if (timeLeft <= 0) {
          clearInterval(countdownInterval.current);
          setEndTime(null);
          setRemainingTime(null);
        } else {
          setRemainingTime(timeLeft);
        }
      }, 1000);
    }

    return () => {
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
    };
  }, [endTime]);

  const handleChangeOtp = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically focus on the next input when a digit is entered
    if (value !== "" && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = (index, key) => {
    // Handle "Backspace" key press to clear the previous input
    if (key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs[index - 1].current.focus();
    }
  };

  useEffect(() => {
    // Reset OTP when the component is focused (navigated to)
    if (isFocused) {
      setOtp(["", "", "", "", "", ""]);
      inputRefs[0].current.focus();
    }
  }, [isFocused]);

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
            <Text style={styles.head}>OTP</Text>
            <Text style={styles.text}>
              Please enter the code that was sent to your email
            </Text>
          </View>

          <View style={styles.field}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={(text) => handleChangeOtp(index, text)}
                maxLength={1}
                keyboardType="numeric"
                ref={inputRefs[index]}
                onSubmitEditing={() => {
                  if (index < 5) {
                    inputRefs[index + 1].current.focus();
                  }
                }}
                onKeyPress={({ nativeEvent: { key } }) =>
                  handleKeyPress(index, key)
                }
              />
            ))}
          </View>

          <View style={styles.resendBtn}>
          <View>
          {showResendText && <Text style={{fontSize: responsiveFontSize(1.9),}}>Didn't receive the code? </Text>}
          </View>
            <View>
            {remainingTime === null ? (
              <TouchableOpacity onPress={handleTryAgain}>
                  <Text style={styles.text2}> Resend OTP</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.text2}>
                  Try again after:
                  <Text style={{ color: "red" }}>{remainingTime} seconds</Text>
                </Text>
              )}
            </View>
          </View>

          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

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
    backgroundColor: "#fff",
    alignItems: "center",
  },
  field: {
    flexDirection: "row",
    marginTop: responsiveHeight(1),
  },
  otpInput: {
    borderBottomWidth: 1,
    borderColor: "#B5C0D0",
    width: responsiveWidth(11),
    height: responsiveHeight(7),
    marginLeft: responsiveWidth(2),
    margin:
      Platform.OS === "android" ? responsiveHeight(0.5) : responsiveHeight(0.5),
    textAlign: "center",
    fontSize: responsiveFontSize(2.5),
  },
  button: {
    marginTop: responsiveHeight(3),
    backgroundColor: "#007BFF",
    width: responsiveWidth(80),
    padding: responsiveHeight(0),
  },
  resendBtn: {
    display : "flex",
    flexDirection: "row",
    marginTop: responsiveHeight(2),
    width: "90%",
  },
  text1: {
    fontSize: responsiveFontSize(1.9),
    marginTop: "1%",
  },
  text2: {
    fontSize: responsiveFontSize(1.9),
    marginTop: "1%",
    color: "#007BFF",
  },
});

export default Otp;
