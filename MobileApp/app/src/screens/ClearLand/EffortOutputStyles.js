import { StyleSheet } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
  } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
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
    card2: {
      height: responsiveHeight(10),
      marginTop: responsiveHeight(1.5),
      backgroundColor: "#fff",
      width: "87%",
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
    bottom: {
      flexDirection:"column",
      alignItems: "center",
      justifyContent:  "center",
      marginTop: responsiveHeight(20),
    },

    buttonContainer: {
      flexDirection: 'row',
      width: '86%',
      justifyContent: 'space-between',      
    },
    buttonWrapper: {
      width: '48%',
    },

    // new content 
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
      width: "70%",
      height: responsiveHeight(8.5),
      backgroundColor: "white",
    },
    Box2PropertyLabel: {
      fontSize: responsiveFontSize(1.6),
      paddingTop: responsiveWidth(3),
      
    },
    Box2PropertyValue: {
      fontSize: responsiveFontSize(1.6),
      fontWeight: "bold",
    },
  
    /*Third Section*/
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

    box4Inner: {
      marginLeft: 15,
      marginTop: responsiveHeight(-1),
      height:responsiveHeight(5),
    },
  
    box3: {
      width: "87%",
      height: "max-content",
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
    box4Text:{
      marginTop: responsiveHeight(1),
      marginBottom: responsiveHeight(1)
    },
    box4Text2: {
      marginTop: responsiveHeight(1),
      marginBottom: responsiveHeight(-100),
    },
  
    inner: {
      width: "90%",
      height: "max-content",
      // backgroundColor: "pink",
      marginBottom: responsiveHeight(5),
      marginTop: responsiveHeight(1),
    },
  
    innertopText: {
      fontSize: responsiveFontSize(1.8),
      fontWeight: "bold",
    },
  
    center: {
      marginTop: responsiveHeight(2),
    },
  
    innercenter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      backgroundColor: "white",
      marginVertical: 1,
      marginTop: 12,
      height:"auto",
    },
  
    innersquareleft: {
      display: "flex",
      width: "55%",
      flexDirection: "row",
      alignItems: "left",
      // justifyContent: "space-between",
      backgroundColor: "white",
      // height: 10,
    },
  
    innersquareright: {
      display: "flex",
      width: "50%",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
      marginTop: 0,
      
    },
  
    innersquareright1: {
      display: "flex",
      width: "50%",
      height: "auto",
      marginTop: 0,
      paddinhTop: 0,
      marginLeft: 0,
      marginBottom: 0,
      justifyContent: "flex-start",
      backgroundColor: "white",
      flexDirection: "column",
    },
  
    RightText: {
      fontSize: responsiveFontSize(1.7),
      marginLeft: responsiveWidth(1.5),
    },
  
    LeftText: {
      paddingLeft: responsiveWidth(2),
      fontSize: responsiveFontSize(1.7),
    },
  
    /* bottom section */
  
    bottom: {
      flexDirection:"column",
      alignItems: "center",
      justifyContent:  "center",
      top: responsiveHeight(-10),
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
  