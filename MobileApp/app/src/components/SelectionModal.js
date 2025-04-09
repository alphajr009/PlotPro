import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation} from "@react-navigation/native";
import CalculatorInput from "./calculator/calculatorInput";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const SelectionModal = ({ modalVisible, setModalVisible, options  }) => {
  const closeModal = () => {
    setModalVisible(false);
  };
  const [calculatorModalVisible, setCalculatorModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleOptionClick = (option, index) => {
    if (index === 0) {
      navigation.navigate('WalkaroundLand');
    } else if (index === 1) {
      navigation.navigate('PointAddingScreen');
    }
    else { 
        setCalculatorModalVisible(true);
    }
    closeModal();
  };

  return (
    <View>
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1} 
          onPress={closeModal}
        />


        <View style={styles.centeredView}>
          <IconButton
            icon="close"
            iconColor="black"
            size={responsiveFontSize(3)}
            onPress={closeModal}
            style={styles.cancelButton}
          />
          <View style={styles.modalView}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.modalOption}
                onPress={() => handleOptionClick(option, index)}
              >
                <View style={styles.innerView1}>
                  <IconButton icon={option.icon} iconColor='white' size={responsiveFontSize(4.7)} />
                </View>
                <View style={styles.innerView2}>
                  <Text style={styles.modelHeader}>{option.Header}</Text>
                  <Text style={styles.modelText}>{option.Text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    
    </Modal>
    <CalculatorInput
    calculatorModalVisible={calculatorModalVisible} 
    setCalculatorModalVisible={setCalculatorModalVisible} 
  />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7 )', // Semi-transparent overlay color
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(5),
  },
  modalView: {
    borderRadius: 20,
    padding: responsiveHeight(2),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 9,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: responsiveWidth(80),
    height: responsiveHeight(45),
  },
  modalOption: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: responsiveHeight(1),
    padding: responsiveHeight(1),
    backgroundColor: '#007BFF',
    borderRadius: 11,
  },
  modelHeader: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  },
  modelText: {
    marginTop:responsiveHeight(1),
    color: 'white',
    fontSize: responsiveFontSize(1.6),
  },

  innerView1: {
    alignItems: 'center',
    flex: 1.2,
    height: '100%',
  },
  innerView2: {
    flex: 4,
    height: '100%',
  },
  cancelButton: {
    position: "absolute",
    top: responsiveHeight(20),
    right: responsiveWidth(5),
    width: responsiveWidth(8.3),
    height: responsiveHeight(4),
    backgroundColor: "#fff",
  },
});

export default SelectionModal;
