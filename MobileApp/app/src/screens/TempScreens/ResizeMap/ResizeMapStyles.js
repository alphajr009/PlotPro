import { StyleSheet } from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
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

  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    color: "#fff",
    marginTop: 10,
  },

  buttonContainer: {
    position: "absolute",
    bottom: responsiveHeight(1),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    marginBottom: responsiveHeight(2),
  },
  overlay: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  overlayText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    marginHorizontal: 20,
  },
  btnStyle: {
    backgroundColor: "#0866FF",
    paddingVertical: responsiveHeight(1.5),
    margin: responsiveHeight(1.25),
    borderRadius: 17,
    width: responsiveWidth(32),
    height: responsiveHeight(5.6),
    alignItems: "center",
  },
  cancelBtnStyle: {
    backgroundColor: "#B8222C",
    width: responsiveWidth(32),
    paddingVertical: responsiveHeight(1.5),
    margin: responsiveHeight(1.25),
    borderRadius: 17,
    alignItems: "center",
  },
  sideIconWrap: {
    position: "absolute",
    marginRight: responsiveWidth(2.5),
    bottom: responsiveHeight(17),
    right: responsiveWidth(2.5),
    alignContent: "space-around",
  },
  sideIconStyle: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.2),
    borderRadius: 4,
  },
  btmBtnStyle: {
    color: "white",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: responsiveHeight(12.5),
  },
  dropdownItem: {
    padding: responsiveHeight(1.25),
    color: "#fff",
  },
  dropdownContainer: {
    position: "absolute",
    right: responsiveWidth(13),
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderRadius: responsiveWidth(1.25),
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: responsiveWidth(0),
      height: responsiveHeight(0.25),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  mainMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
  },
  intermediateMarker: {
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  button2: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.25),
    borderRadius: responsiveWidth(1.25),
    top: Platform.OS === "android" ? "15%" : "18%",
    right: responsiveWidth(2.5),
    marginTop: responsiveHeight(0.25),
  },
  clearIconContainer: {
    position: "absolute",
    left: "75%",
    top: "50%",
    transform: [{ translateY: -12 }],
    zIndex: 1,
  },
  layerIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1.25),
    borderRadius: responsiveWidth(1.25),
    right: responsiveWidth(5),
    top: Platform.OS === "android" ? "63%" : "27%",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default styles;
