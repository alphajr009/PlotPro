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
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%",
  },

  top: {
    alignItems: "center",
    width: "100%",
  },

  Box1: {
    width: responsiveWidth(86),
    height: responsiveHeight(12),
    justifyContent: "center",
    backgroundColor: "white",
    marginTop: responsiveHeight(3),
    padding: 0,
    marginBottom: 20,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },

  titleText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "bold",
    marginLeft: responsiveWidth(4),
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
    width: "65%",
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
    width: "93%",
    height: responsiveHeight(12),
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginTop: responsiveHeight(1.5),
    borderRadius: 11,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  Box2Plants: {
    width: "93%",
    height:responsiveHeight(12),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: responsiveHeight(1.5),
    borderRadius: 11,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  dropdownContainerPlants: {
      backgroundColor: "#F0F2F5",
      borderRadius: 10,
      borderColor: "black",
      width: "66%",
      height: responsiveHeight(4.5),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#CED0D4",
    },

  TopText: {
    flexDirection: "row",
  },

  Box2titleText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: "bold",
    marginLeft: responsiveHeight(2),
  },

  Box2input: {},

  /*Third section*/

  Box3propertyBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "Space-between",
    backgroundColor: "white",
    marginTop: responsiveHeight(1.5),
    width: "100%",
  },

  dropdownContainer: {
    backgroundColor: "#F0F2F5",
    borderRadius: 10,
    borderColor: "black",
    width: "36%",
    height: responsiveHeight(4.5),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#CED0D4",
  },

  /* bottom section */

  bottom: {
    alignItems: "center",
    bottom: responsiveHeight(3),
  },
});
