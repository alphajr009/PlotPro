import { StyleSheet } from "react-native";
/* import responsive library */
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff8a",
    padding: 20,
    borderRadius: 10,
    responsivWidth: responsiveWidth(100),
  },
  top_Text_Styling: {
    color: "white",
    fontSize: responsiveFontSize(2),
  },
  top_Bar_View: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: responsiveWidth(5),
  },
  top_Bar_Whole: {
    backgroundColor: "#0866FF",
    marginTop: 0,
  },
  inner_view_text_style: {
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
  inner_View_01: {
    justifyContent: "center",
    alignItems: "center",
    height: responsiveHeight(20),
  },
  inner_View_01_inner: {
    borderRadius: 10,
    marginHorizontal: 10,
    top: responsiveHeight(0.7),
    width: "90%",
    padding: 10,
    borderColor: "black",
    backgroundColor: "white",
    height: responsiveHeight(14),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  land_Info_Inner: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  perimeter_col_01: {
    borderWidth: 1,
    borderColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  bold_text: {
    fontWeight: "bold",
  },
  row_02: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: responsiveHeight(1),
  },
  row_01: {
    /*  */
  },
  low_outer: {
    flex: 0.5,
  },
  low_outer_02: {
    flex: 1,
    backgroundColor: "#ffffff8a",
    height: responsiveHeight(100),
  },
  row_02_col_01: {
    flexDirection: "row",
  },
  row_02_col_02: {
    flexDirection: "row",
  },
  col_02_col_01: {
    /*  */
  },
  area_col_styling: {
    justifyContent: "space-evenly",
    marginLeft: responsiveWidth(3),
  },
  area_text_styling: {
    marginLeft: 4,
  },
  inner_view_02_inner: {
    justifyContent: "flex-start",
  },
  input_view: {
    backgroundColor: "white",
    flexDirection: "row",
    marginHorizontal: responsiveWidth(5),
    borderRadius: 7,
    marginVertical: responsiveHeight(1),
    shadowColor: "#000",
    paddingVertical: responsiveHeight(1.2),
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    paddingHorizontal: responsiveWidth(3),
    justifyContent: "space-between", // Add this line
    alignItems: "center", // Add this line
  },
  input_text: {
    height: responsiveHeight(4),
    width: responsiveWidth(56),
    backgroundColor: "white",
    textAlign: "left", // Add this line
  },
  inner_view_03: {
    marginHorizontal: 20,
    paddingVertical: 20,
  },
  description_input: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: -10,
  },
  base64Image: {
    width: 100,
    height: 100,
  },
});
