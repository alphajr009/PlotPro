import { StyleSheet } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    /*Top Section*/
  
    scrollContent: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },

    topSection: {
      flexDirection: "row",
      marginTop: responsiveHeight(1),
      padding:responsiveWidth(0.6),
      width: "100%",
      justifyContent: "space-between", // Align the items to the right
    },
    iconButton: {
      padding: 6,
    },
  
    top: {
      alignItems: "center",
      width: "100%",
    },
  
    box1: {
      backgroundColor: "white",
      width: responsiveWidth(86),
      height: responsiveHeight(13),
      marginTop: responsiveHeight(6),
      alignItems: "center",
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 8,
    },
  
    titleText: {
        fontSize: responsiveFontSize(1.9),
        fontWeight: "bold",
        marginTop: responsiveHeight(1),
    },
  
    propertyBox: {
      width: "98%",
      height: "70%",
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
  
    property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center", 
      backgroundColor: "white",
      width: "46%",
      padding: responsiveWidth(2),
    },
  
    propertyDetails: {
      flexDirection: "column",
      marginLeft: responsiveWidth(2),
      width: "70%",
      backgroundColor: "white",
    },
  
    propertyLabel: {
        fontSize: responsiveFontSize(1.7),
    },
  
    propertyValue: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
    },
  
    /*Second Section*/
  
    box2: {
      width: "87%",
      height: responsiveHeight(9),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      padding: responsiveWidth(3),
      backgroundColor: "white",
      marginTop: responsiveHeight(2),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 8,
    },
  
    box2Property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      backgroundColor: "white",
      width: "46%",
    },
  
    box2PropertyDetails: {
      flexDirection: "column",
      marginLeft: responsiveWidth(1),
      width: "70%",
      backgroundColor: "white",
    },
    Box2PropertyLabel: {
        fontSize: responsiveFontSize(1.8),
    },
    Box2PropertyValue: {
        fontSize: responsiveFontSize(1.9),
        fontWeight: "bold",
    },
  
    /*Third Section*/
  
    box3: {
      width: "87%",
      // height: "max-content",
      height: responsiveHeight(25),
      backgroundColor: "white",
      marginTop: responsiveHeight(2),
      borderRadius: 11,
      padding: responsiveWidth(7),
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 8,
    },
  
    innertopText: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
    },
  
    innercenter: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      backgroundColor: "white",
      marginVertical: responsiveHeight(1),
    },
  
    innersquareleft: {
      width: "50%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
    },
  
    innersquareright: {
      width: "45%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
    },
  
    innersquareright1: {
      width: "45%",
      height: responsiveHeight(2.7),
      marginTop: responsiveHeight(1),
      justifyContent: "flex-start",
      backgroundColor: "white",
      flexDirection: "column",
    },
  
    /* bottom section */
  
    bottom: {
      alignItems: "center",
      bottom: responsiveHeight(3),
    },
  });
  