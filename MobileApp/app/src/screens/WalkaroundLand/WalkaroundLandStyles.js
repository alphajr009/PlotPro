import { StyleSheet, StatusBar, Platform } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
  layerIconContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0, 0.7)",
    padding: responsiveHeight(1),
    borderRadius: 5,
    right: responsiveWidth(4),
    bottom: responsiveHeight(14),
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownContainer: {
    position: "absolute",
   bottom: responsiveHeight(0),
    right: responsiveWidth(12),
    backgroundColor: "rgba(0,0,0, 0.9)",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  overlay: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgb(0,0,0)",
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    padding: 9,
  },
  overlayText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    marginHorizontal: 20,
  },
  dropdownItem: {
    padding: 10,
    color: "#fff",
  },
  markerTouchArea: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
  },
  header: {
    height: responsiveHeight(6.5),
    backgroundColor: "#007BFF",
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight,
      },
    }),
  },
  appbarButton: {
    padding: responsiveWidth(3.5),
  },
  buttonText: {
    color: "white",
    fontSize: responsiveFontSize(2),
  },
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: responsiveHeight(0),
    paddingTop: responsiveWidth(5),
    paddingBottom: responsiveWidth(5),
    backgroundColor: "rgba(0,0,0, 0.7)",
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 7,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    flex: 1,
  },
  undoIcon: {
    position: "absolute",
    bottom: responsiveHeight(21),
    right: responsiveWidth(4),
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: responsiveWidth(1),
    padding: responsiveWidth(2.1),
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
});

export default styles;
