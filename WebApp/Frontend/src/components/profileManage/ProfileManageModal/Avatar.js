import React from "react";
import { Avatar as MuiAvatar } from "@mui/material";

const Avatar = ({ userData, size = 150, image }) => {
  const getEmailColor = (email) => {
    if (!email) return "#000000";
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
    return `${(fname ? fname[0] : "").toUpperCase()}${(lname
      ? lname[0]
      : ""
    ).toUpperCase()}`;
  };

  const getImageSource = () => {
    if (image) {
      return image;
    } else if (userData && userData.imageUrl) {
      return userData.imageUrl;
    }
    return null;
  };

  return (
    <MuiAvatar
      sx={{
        width: size,
        height: size,
        bgcolor: getEmailColor(userData?.email),
        fontSize: size / 3,
      }}
      src={getImageSource()}
    >
      {!getImageSource() && getInitials(userData?.fname, userData?.lname)}
    </MuiAvatar>
  );
};

export default Avatar;
