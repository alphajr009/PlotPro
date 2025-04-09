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
  
    /*Top section*/
  
    scrollContent: {
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
  
    top: {
      alignItems: "center",
      width: "100%",
  
    },
  
    Box1: {
      width: "87%",
      height: responsiveHeight(22),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: responsiveHeight(3),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    innerContainer: {
      width: "100%",
      height: "85%",
      backgroundColor: "white",
    },
    titleText: {
      fontSize: responsiveFontSize(1.9),
      fontWeight: "bold",
      marginLeft: responsiveWidth(4),
    },
    propertyBox: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      height: responsiveHeight(5.6),
      width: "100%",
      backgroundColor: "white",
      marginTop: responsiveHeight(1),
    },
    propertyboxtop: {
      flexDirection: "row",
    },
  
    property: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "left",
      backgroundColor: "white",
      width: "46%",
      height: responsiveHeight(7),
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
  
    /*Second section*/
  
    Box2: {
      width: "95%",
      height:responsiveHeight(12),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      marginTop: responsiveHeight(1.5),
      borderRadius: 11,
      
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    Box2innerContainer: {
      flexDirection: "column",
      height: "85%",
      width: "95%",
      backgroundColor: "white",
    },
  
    TopText: {
      flexDirection: "row",
    },
  
    Box2titleText: {
      fontSize: responsiveFontSize(1.9),
      fontWeight: "bold",
      marginLeft: responsiveHeight(1),
    },
  
    selectbuttonBox: {
      flexDirection: "row",
      width: Platform.OS === "ios" ? "80%" : "90%",
      backgroundColor: "white",
      marginTop: responsiveHeight(1.1),
      height:responsiveHeight(6),
      justifyContent: "space-between",
      alignItems: "center",
      margin: responsiveHeight(0),
      
    },
  
    button: {
      borderColor: "#CED0D4",
      borderWidth: responsiveWidth(0.2),
      backgroundColor: "#fff",
      borderRadius: 8,
      width:responsiveWidth(10),
      height: responsiveHeight(5),
      alignItems: "center",
      justifyContent: "center",
      padding:responsiveWidth(0.1),
      margin:responsiveWidth(0.2),
      


    },
  
    /*Third section*/
  
    Box3: {
      width: "95%",
      flexDirection: "row",
      height:responsiveHeight(7),
      alignItems: "center",
      backgroundColor: "#FFFFFF",
      marginTop: responsiveHeight(1.5),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
      padding: 12,
    },
  
  
    Box3TopText: {
      flexDirection: "row",
    },
  
    Box3titleText: {
      fontSize: responsiveFontSize(1.9),
      fontWeight: "bold",
      marginLeft: responsiveWidth(2),
    },
  
    /*Fifth Section*/
    Box5: {
      width: "95%",
      height:responsiveHeight(12),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      marginTop: responsiveHeight(1.5),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
  
    Box5propertyBox: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "Space-between",
      backgroundColor: "white",
      marginTop: responsiveHeight(0.9),
      width: "100%",
    },
  
    dropdownContainer: {
      backgroundColor: "#F0F2F5",
      borderRadius: 10,
      borderColor: "black",
      width: "36%",
      height:responsiveHeight(4),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#CED0D4",
    },
  
    Box5bottomText: {
      fontSize: responsiveFontSize(0.9),
    },
  
    /* bottom section */
  
    bottom: {
      alignItems: "center",
      bottom: responsiveHeight(3),
    },
  
  });