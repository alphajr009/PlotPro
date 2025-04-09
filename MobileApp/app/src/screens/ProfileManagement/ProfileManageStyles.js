import { StyleSheet, StatusBar, Platform } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(6),
    backgroundColor: "#007BFF",
    zIndex: 1,
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  appbarText: {
    alignItems: "center",
    marginRight: responsiveWidth(12),
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  section1: {
    flex: 1,
    borderRadius: 30,
    marginTop: responsiveHeight(3),
    alignItems: "center",
    justifyContent: "center",
  },
  section2: {
    flex: 2,
  },
  text1: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(8),
  },
  inputContainer: {
    marginTop: responsiveHeight(3),
    alignItems: "center",
  },
  inputField: {
    width: responsiveWidth(82),
    height: responsiveHeight(6),
    fontSize: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(2),
    borderRadius: 15,
  },
  button1: {
    marginTop: responsiveHeight(1),
    width: responsiveWidth(82),
    height: responsiveHeight(5.7),
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#007BFF",
  },
  button: {
    marginTop: responsiveHeight(5),
    backgroundColor: "#007BFF",
    width: responsiveWidth(60),
    padding: responsiveHeight(0),
    alignSelf: "center",
  },
  editIcon: {
    top: responsiveHeight(-2.9),
    right: responsiveWidth(-30),
  },
  avtarTxt: {
    fontSize: responsiveFontSize(3),
    marginTop: responsiveHeight(-2),
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default styles;