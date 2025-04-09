
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

    loadingScreen: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    dotsWrapper: {
      width: 100,
    },
    top_Bar: {
      justifyContent:"space-between",
      height: responsiveHeight(6.5),
      backgroundColor: '#007BFF',
  
      ...Platform.select({
        android: {
          marginTop: responsiveHeight(3),
        },
      }),
    },
  
    headerText: {
      fontSize: responsiveFontSize(2.3),
      marginRight: responsiveWidth(3.5),
      textAlign: "center",
      color: "white",
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
      flexDirection: "column",
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
      justifyContent: "center", // or remove it for default behavior
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
      padding: responsiveWidth(2),
      backgroundColor: "white",
      marginTop: responsiveHeight(1.5),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 8,
    },
  
    box2Inner: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      height: "80%",
      width: "95%",
      backgroundColor: "white",
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
      marginLeft: 5,
      width: "70%",
      justifyContent: "center",
      height: responsiveHeight(8.5),
      backgroundColor: "white",
    },
    Box2PropertyLabel: {
      fontSize: responsiveFontSize(1.7),
    },
    Box2PropertyValue: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
    },
  
    /*Third Section*/
  
    box3: {
      width: "87%",
      height: responsiveHeight(26),
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      marginTop: responsiveHeight(1.5),
      borderRadius: 11,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 8,
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
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "white",
      marginVertical: responsiveHeight(0.3),
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

    buttonContainer: {
      flexDirection: 'row',
      width: '86%',
      justifyContent: 'space-between',      
    },
    buttonWrapper: {
      width: '48%',
    },
  
  });
  