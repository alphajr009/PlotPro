import { StyleSheet, Platform, StatusBar } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    /*First section*/
  
    scrollContent: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
  
    top: {
      alignItems: "center",
      width: "100%",
    },

    header: {
      height: 45,
      backgroundColor: "#007BFF",
  
      ...Platform.select({
        android: {
          marginTop: StatusBar.currentHeight,
        },
      }),
    },
    headerText: {
     
      fontSize: 18,
      textAlign: "center",
      color: "white",
      position: "absolute",
      bottom: 7,
      left: 0,
      right: 0,
    },
  
  
    Box1: {
      width: responsiveWidth(86),
      height: responsiveHeight(12),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: responsiveHeight(3),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 6,
      padding: 0,
    },
  
    titleText: {
       fontSize: responsiveFontSize(1.9),
       marginLeft: responsiveWidth(4),
       fontWeight: "bold",
    },
  
    propertyBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: responsiveHeight(5.6),
      width: "100%",
      backgroundColor: "white",
      marginTop: responsiveHeight(1),
    },
  
    property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      backgroundColor: "white",
      width: "46%",
      height: responsiveHeight(5.6),
    },
  
    propertyDetails: {
      flexDirection: "column",
      marginLeft: responsiveWidth(2),
      width: "70%",
      height: responsiveHeight(4.6),
      backgroundColor: "white",
    },
  
    propertyLabel: {
      fontSize: responsiveFontSize(1.6),
    },
  
    propertyValue: {
        fontSize: responsiveFontSize(1.8),
        fontWeight: "bold",
    },
  
    /* Second section */
  
    box2: {
      width: "92%",
      height: responsiveHeight(8.5),
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      backgroundColor: "white",
      marginTop: responsiveHeight(3),
      borderRadius: 11,
      padding: 0,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 6,
    },
  
    box2Property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      width: "46%",
      padding: responsiveWidth(2),
    },
  
    box2PropertyDetails: {
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: responsiveWidth(1),
      width: "70%",
      backgroundColor: "white",
    },
  
    Box2PropertyLabel: {
      fontSize: responsiveFontSize(1.9),
      marginLeft: responsiveWidth(2),
    },
  
    Box2DropdownContainer: {
      backgroundColor: "#F0F2F5",
      borderRadius: 11,
      width: "100%",
      height: responsiveHeight(4.5),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: responsiveWidth(0.2),
      borderColor: "#CED0D4",
    },
  
    /* Third section */
  
    box3: {
      width: "92%",
      height: responsiveHeight(8.5),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      flexDirection: "row",
      marginTop: responsiveHeight(1.5),
      borderRadius: 11,
      padding: 0,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 6,
    },
  
    box3Property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      width: responsiveWidth(42.5),
      padding: responsiveWidth(2),
    },
  
    box3inputContainer: {
      flexDirection: "row",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "space-between",
      width: "90%",
      height: "100%",
    },
  
    box3PropertyDetails: {
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: responsiveWidth(2),
      width: "70%",
      backgroundColor: "white",
    },
  
    Box3PropertyLabel: {
      fontSize: responsiveFontSize(1.9),
      marginLeft: responsiveWidth(2),
    },
    box3input: {
      backgroundColor: "white",
      width: "35%",
      borderBottomWidth: 1,
      borderBottomColor: "lightgray",
      justifyContent: "center",
      alignItems: "center",
    },
  
    dropdownContainer: {
      backgroundColor: "#F0F2F5",
      borderRadius: 10,
      borderColor: "black",
      width: responsiveWidth(27),
      height: responsiveHeight(4.5),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#CED0D4",
    },
  
    /* Forth section */
  
    box4: {
      width: "92%",
      height: responsiveHeight(28),
      backgroundColor: "white",
      marginTop: responsiveHeight(2),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 6,
    },
  
    box4innertop: {
      width: "40%",
      height: "17%",
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      marginLeft: responsiveWidth(5),
      marginTop: responsiveHeight(1),
    },
  
    Box4TopText: {
      fontSize: responsiveFontSize(1.9),
      marginLeft: responsiveWidth(2),
    },
  
    box4InnerCenter: {
      width: "100%",
      backgroundColor: "white",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  
    line: {
      width: "80%",
      height:responsiveHeight(3.3),
      backgroundColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: responsiveHeight(0.5),
    },
  
    linetext: {
        fontSize: responsiveFontSize(1.7),
        textAlign: "right",
        width: responsiveWidth(17),
    },
  
    linetextinput: {
      width: responsiveWidth(32),
    },
  
    Box4InnerBottom: {
      alignItems: "center",
      justifyContent: "center",
    },
  
    Box4Button: {
      width: responsiveWidth(28),
      height: responsiveHeight(4),
      backgroundColor: "#0866FF",
      alignItems: "center",
      justifyContent: "center",
      marginTop: responsiveHeight(2.5),
      borderRadius: 11,
    },
  
    Box4ButtonText: {
      color: "white",
      fontSize: responsiveFontSize(1.9),
    },
  
    displayValuesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: responsiveHeight(1),
      alignItems: "center",
      backgroundColor: "white",
      height: "max-content",
      borderRadius: 11,
      width: "100%",
    },
    displayValueContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      backgroundColor: "white",
      marginRight: responsiveWidth(1.2),
      marginLeft:  responsiveWidth(1.2),
      marginBottom: responsiveHeight(1),
      borderRadius: 8,
      padding: responsiveWidth(0.6),
      width: "22%",
      borderWidth: 1,
      borderColor: "#007BFF",
    },
    displayValueText: {
      fontSize: responsiveFontSize(1.4),
      marginRight: responsiveWidth(1),
      color: "#007BFF",
    },
    closeButton: {},
    closeButtonText: {
      color: "white",
      
    },
  
    /* bottom section */
  
    bottom: {
      alignItems: "center",
      bottom: responsiveHeight(3),
    },
  });
  