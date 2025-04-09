import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { IconButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const CalculatorModel = ({
  calculatorSelectModalVisible,
  setCalculatorSelectModalVisible,
  area,
  perimeter,
}) => {
  useEffect(() => {
    return () => {
      setCalculatorSelectModalVisible(false);
    };
  }, [setCalculatorSelectModalVisible]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setCalculatorSelectModalVisible(false);
      };
    }, [])
  );

  const closeModal = () => {
    setCalculatorSelectModalVisible(false);
  };

  const navigation = useNavigation();

  const navigateToPage = (page) => {
    navigation.navigate(page, { area, perimeter });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={calculatorSelectModalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeModal}
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <IconButton
              icon="close"
              iconColor="#000"
              size={30}
              onPress={closeModal}
              style={styles.cancelButton}
            />

            <Text style={styles.headerText}>Manual Calculator</Text>

            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => navigateToPage("ClearLandFromManualCalculator")}
                >
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      name="island"
                      size={responsiveFontSize(3)}
                      color="brown"
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: responsiveWidth(-9),
                    }}
                  >
                    <Text
                      style={{ color: "#FFF", fontSize: responsiveFontSize(1.6) }}
                    >
                      CLEAR LAND
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => navigateToPage("PlantationFromManualCalculator")}
                >
                  <View style={styles.icon}>
                    <MaterialCommunityIcons
                      name="sprout"
                      size={responsiveFontSize(3)}
                      color="green"
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: responsiveWidth(-9),
                    }}
                  >
                    <Text
                      style={{ color: "#FFF", fontSize: responsiveFontSize(1.6) }}
                    >
                      PLANTATION
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.button}>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => navigateToPage("FenceFromManualCal")}
                >
                  <View style={{ ...styles.icon, left: responsiveWidth(-26.6) }}>
                    <MaterialCommunityIcons
                      style={{ marginBottom: responsiveHeight(0.7) }}
                      name="fence"
                      size={responsiveFontSize(3)}
                      color="black"
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      marginLeft: responsiveWidth(-9),
                    }}
                  >
                    <Text
                      style={{ color: "#FFF", fontSize: responsiveFontSize(1.6) }}
                    >
                      FENCE SETUP
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderColor: "#007BFF",
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: "#007BFF",
    width: responsiveWidth(80),
    color: "#fff",
    padding: 5.9,
  },
  buttonContainer: {
    marginTop: "20%",
    flexDirection: "column",
    height: responsiveHeight(40),
  },
  button: {
    marginBottom: responsiveHeight(2),
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    left: responsiveWidth(-27.5),
    borderRadius: 50,
    backgroundColor: "white",
    width: responsiveWidth(10.5),
    height: responsiveHeight(5.1),
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: responsiveFontSize(2),
  },
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderRadius: 25,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    padding: responsiveHeight(1),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 9,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: "100%",
    height: responsiveHeight(45),
  },
  cancelButton: {
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default CalculatorModel;
