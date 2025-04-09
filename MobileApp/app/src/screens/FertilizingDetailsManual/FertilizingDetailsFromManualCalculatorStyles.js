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
    Box5bottomText: {
      fontSize: responsiveFontSize(0.9),
    },
    scrollContent: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
  
    top: {
      alignItems: "center",
      width: "100%",
    },
  
    box1: {
      flexDirection: "column",
      backgroundColor: "white",
      width: responsiveWidth(86),
      height: responsiveHeight(15),
      marginTop: responsiveHeight(2),
      alignItems: "center",
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    titleText: {
      fontSize: responsiveFontSize(2),
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
      height: responsiveHeight(8.5),
      padding: responsiveWidth(2),
      
    },
  
    propertyDetails: {
      flexDirection: "column",
      marginLeft: responsiveWidth(2),
      width: "70%",
      height: responsiveHeight(6),
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
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: responsiveHeight(1),
      borderRadius: 11,
      padding: 5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      
    },
  
    box2Property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      backgroundColor: "white",
      width: "46%",
      height: responsiveHeight(8.5),
      marginLeft: responsiveWidth(2),
    },
    box2PropertyDetails: {
      flexDirection: "column",
      marginLeft: responsiveWidth(2),
      width: "65%",
      height: responsiveHeight(8.5),
      backgroundColor: "white",
    },
    Box2PropertyLabel: {
      fontSize: responsiveFontSize(1.7),
      paddingTop: responsiveWidth(3),
      
    },
    Box2PropertyValue: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
    },
  
    /*Third Section*/
  
    box3: {
      width: "87%",
      height: responsiveHeight(30),
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
  
    inner: {
      width: "80%",
      height: "90%",
      backgroundColor: "white",
    },
  
    innertopText: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
    },
  
    center: {
      marginTop: responsiveHeight(2),
    },
  
    innercenter: {
      flexDirection: "row",
      width: "100%",
      height: responsiveHeight(5.5),
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      marginVertical: responsiveHeight(1),
    },
  
    innersquareleft: {
      width: "50%",
      height: responsiveHeight(5.5),
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
    },
  
    innersquareright: {
      width: "45%",
      height: responsiveHeight(2.7),
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
    },
  
    RightText: {
      fontSize: responsiveFontSize(1.7),
    },
  
    LeftText: {
      paddingLeft: responsiveWidth(2),
      fontSize: responsiveFontSize(1.7),
    },
  
    /* bottom section */
  
    bottom: {
      alignItems: "center",
      bottom: responsiveHeight(3),
    },
  
  
  });