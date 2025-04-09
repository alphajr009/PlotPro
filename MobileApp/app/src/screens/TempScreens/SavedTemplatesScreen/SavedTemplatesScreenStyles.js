import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  header: {
    height: responsiveHeight(6.5),
    backgroundColor: "#007BFF",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007BFF",
    color: "white",
  },
  icon_style: {
    position: "absolute",
    top: responsiveHeight(1),
    right: responsiveWidth(2),
  },
  icon_style1: {
    position: "absolute",
    bottom: responsiveHeight(1),
    right: responsiveWidth(2),
  },
  title_text: {
    color: "white",
    fontSize: responsiveFontSize(2.3),
    marginLeft: responsiveWidth(16.5),
  },
  low_outer: {
    marginTop: 10,
    height: "100%",
  },
  template_style: {
    backgroundColor: "white",
    marginVertical: responsiveHeight(1),
    marginHorizontal: responsiveWidth(3),
    borderRadius: 10,
    flexDirection: "row",
    paddingVertical: responsiveHeight(2),
    //add shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    paddingRight: responsiveWidth(12),
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#007BFF",
  },
  imageLoadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  image_style: {
    width: responsiveWidth(22),
    height: responsiveHeight(11),
    left: responsiveWidth(1),
    borderRadius: 5,
  },
  col_01: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(2),
    marginLeft: responsiveWidth(3),
  },
  col_02: {
    width: "120%",
    paddingLeft: responsiveWidth(2),
    paddingRight: responsiveWidth(2),
    marginLeft: responsiveWidth(3),
  },
  col_03: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: responsiveHeight(1),
  },
  bold_text: {
    fontWeight: "bold",
  },
  sub_text_style: {
    color: "grey",
    top: responsiveHeight(1),
  },
  scrollViewOuterStyle: {
    flex: 1,
    marginBottom: responsiveHeight(13),
  },
});
