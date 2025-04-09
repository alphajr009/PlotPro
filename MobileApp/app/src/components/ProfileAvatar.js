import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ProfileAvatar = ({ userData, textSize , image }) => {

  const getEmailColor = (email) => {
    if (!email) {
      return "#000000"; // Return a default color if email is undefined
    }
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ("00" + value.toString(16)).substr(-2);
    }
    return color;
  };

  const getInitials = (fname, lname) => {
    return `${(fname ? fname[0] : "").toUpperCase()}${(lname ? lname[0] : "").toUpperCase()}`;
  };

  const getImageSource = () => {
    if (image) {
      return { uri: image };
    } else if (userData && userData.imageUrl) {
      return { uri: userData.imageUrl };
    }
    return null;
  };

  return (
    <View>
      {userData ? (
        getImageSource() ? (
          <Avatar.Image
            size={responsiveFontSize(textSize)}
            source={getImageSource()}
          />
        ) : (
          <Avatar.Text
            size={responsiveFontSize(textSize)}
            label={getInitials(userData.fname, userData.lname)}
            backgroundColor={getEmailColor(userData.email)}
          />
        )
      ) : null}
    </View>
  );
};

export default ProfileAvatar;