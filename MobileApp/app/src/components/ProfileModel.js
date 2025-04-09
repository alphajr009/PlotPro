// SelectionModal.js
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ProfileAvatar from "../components/ProfileAvatar";
import AxiosInstance from "../AxiosInstance";

const SelectionModal = ({
  profileModalVisible,
  setProfileModalVisible,
  
}) => {
  const [loading, setLoading] = useState(false);
  const [manageLoading, setManageLoading] = useState(false); // New state for manage button loading
  const [user, setUser] = useState({});
  const closeModal = () => {
    setProfileModalVisible(false);
  };
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await AxiosInstance.get("/api/users/details");
      setUser(response.data.user);
    };

    if (profileModalVisible) {
      fetchUser();
    }
  }, [profileModalVisible]);

  const handleManageAccount = () => {
    setManageLoading(true); // Set loading state to true when manage account is clicked
   
      setManageLoading(false); // Set loading state to false after navigating to the profile management page
    setProfileModalVisible(false);
    navigation.navigate("ProfileManagement");
  
  };

  const handleSignOut = async () => {
    setLoading(true);
    await AsyncStorage.removeItem("token");
    // Wait for 2 seconds before navigating to the login page
    setTimeout(() => {
      setLoading(false);
      setProfileModalVisible(false);
      navigation.navigate("Login");
    }, 2000);
  };

 

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={profileModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        />

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              icon="close"
              iconColor="#000"
              size={responsiveFontSize(3.5)}
              onPress={closeModal}
              style={styles.cancelButton}
            />

            <Text style={styles.headerText}>{user.email}</Text>
            <View>
              <ProfileAvatar userData={user} textSize={responsiveFontSize(1.4)} />
            </View>

            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>Hi ,</Text>
              <Text style={styles.nameText}>{user.fname}</Text>
            </View>

            <Button
              mode="outlined"
              onPress={handleManageAccount}
              style={styles.ManageButton}
              textColor="#007BFF"
              loading={manageLoading} // Add loading prop to Button
            >
              Manage your account
            </Button>

            <Button
              mode="contained"
              style={styles.signoutButton}
              buttonColor="#007BFF"
              onPress={handleSignOut}
              loading={loading}
            >
              Sign Out
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  
  bottomText: {
    color: "#65676B",
    fontSize: responsiveFontSize(1.5),
  },

  ManageButton: {
    borderColor: "#007BFF",
    marginTop: responsiveHeight(1.7),
    width: responsiveWidth(60),
    padding: responsiveHeight(0.1),
  },

  signoutButton: {
    marginTop: responsiveHeight(1.9),
    width: responsiveWidth(40),
    padding: responsiveHeight(0.1),
  },
  nameText: {
    fontSize: responsiveFontSize(2.3),
    color: "#000",
    marginLeft: 10,
  },
  nameContainer: {
    marginTop: responsiveHeight(2),
    flexDirection: "row",
  },
  headerText: {
    fontSize: responsiveFontSize(1.5),
    marginBottom: responsiveHeight(2.5),
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7 )",
  },

  centeredView: {
    flex: 1,
    marginTop: responsiveHeight(10),
    alignItems: "center",
  },
  modalView: {
    margin: responsiveHeight(2),
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: responsiveHeight(1),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: responsiveHeight(2),
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: responsiveWidth(80),
    height: responsiveHeight(40),
  },
  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default SelectionModal;

// <Button
// mode="contained"
// style={styles.settingButton}
// buttonColor="#65676B"
// icon="cog-outline"
// >
// Setting
// </Button>

// <View style={styles.bottomContainer}>
// <Text style={styles.bottomText}>Privacy Policy</Text>

// <IconButton icon="circle" size={5} style={styles.dot} />
// <Text style={styles.bottomText}>Terms of Service</Text>
// </View>
