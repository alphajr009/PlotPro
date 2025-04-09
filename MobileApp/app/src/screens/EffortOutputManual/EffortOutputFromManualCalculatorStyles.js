import { StyleSheet } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    topSection: {
      flexDirection: "row",
      marginTop: responsiveHeight(0.5),
      padding:responsiveWidth(0),
      width: "100%",
      justifyContent: "space-between",
    },
    iconButton: {
      padding: 6,
    },
  
    container2: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    card1: {
      height: responsiveHeight(15),
      width: "87%",
      marginTop: responsiveHeight(3.5),
      marginBottom: responsiveHeight(3.5),
      borderRadius: 11,
      backgroundColor: "#fff",
    },
    card1Content: {
      display: "flex",
      flexDirection: "column",
      marginTop: responsiveHeight(0.1),
    },
    card1Text1: {
      fontWeight: "bold",
      fontSize: responsiveFontSize(2.2),
      marginTop: responsiveHeight(-1),
      textAlign: "center",
    },
    card1Text2: {
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
    },
    card1Text3: {
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
      fontWeight: "bold",
    },
    card1Text4: {
      marginTop: responsiveHeight(-5.9),
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(0),
    },
    card1Text5: {
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1.2),
      fontWeight: "bold",
    },
    card1Left: {
      display: "flex",
      flexDirection: "row",
      marginTop: responsiveHeight(3),
    },
    card1Right: {
      display: "flex",
      flexDirection: "row",
      height: responsiveHeight(2.9),
    },
    box4: {
      width: "87%",
      height: responsiveHeight(18),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: responsiveHeight(1),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    box4Header: {
      fontSize: responsiveFontSize(1.8),
      marginLeft:responsiveHeight(4.5),
      marginTop:responsiveHeight(6.5),
      fontWeight: "bold",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: "90%",
    },

    box4inner :{
        width: "80%",
        height: "60%",
        backgroundColor: "white",
        marginBottom: responsiveHeight(8),
        marginTop: responsiveHeight(0),
      },

      innertopText: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "bold",
      },

    box4Inner: {
      marginLeft: 15,
      marginTop: responsiveHeight(-1),
      height:responsiveHeight(5),
    },
    box4Text:{
      marginTop: responsiveHeight(1),
      marginBottom: responsiveHeight(1)
    },
    box4Text2: {
      marginTop: responsiveHeight(1),
      marginBottom: responsiveHeight(-100),
    },
  
    card2: {
      height: responsiveHeight(10),
      marginTop: responsiveHeight(-2.5),
      backgroundColor: "#fff",
      width: "93%",
      borderRadius: 11,
    },
    card2Content: {
      display: "flex",
      flexDirection: "column",
      marginTop: responsiveHeight(-3.6),
    },
    card2Left: { display: "flex", flexDirection: "row" },
    card2Right: {
      display: "flex",
      flexDirection: "row",
      height: responsiveHeight(3),
      alignItems: "right",
      marginLeft:responsiveWidth(-8)
    },
    card2Text1: {
      marginTop: responsiveHeight(3.8),
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
    },
    card2Text2: {
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
      fontWeight: "bold",
    },
    card2Text3: {
      marginTop: responsiveHeight(-5.7),
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
    },
    card2Text4: {
      marginTop: responsiveHeight(-3),
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
      fontWeight: "bold",
    },
    card3: {
      height: "max-content",
      width: "87%",
      borderRadius: 11,
      backgroundColor: "#fff",
      marginTop: responsiveHeight(1.5),
    },
    card3Text1: {
      fontWeight: "bold",
      fontSize: responsiveFontSize(2.2),
      marginTop: responsiveHeight(0),
      marginLeft: responsiveWidth(3),
    },
    card3Text2: {
      marginTop: responsiveHeight(3),
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
      fontWeight: "bold",
    },
    card3Text3: {
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(2),
      marginTop: responsiveHeight(3),
    },
    card3Text4: {
      fontSize: responsiveFontSize(2),
      marginLeft: responsiveWidth(1),
      fontWeight: "bold",
    },
    customButtons: {
      display: "flex",
      flexDirection: "column",
      marginTop: responsiveHeight(10),
      justifyContent: "space-between",
    },
  });
  