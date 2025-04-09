import React, { useState, useRef,useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from 'react-native-paper';

import {styles} from './FenceFromManualCalStyle';
import CustomButton from "../../../components/CustomButton";
import AxiosInstance from "../../../AxiosInstance";

export default function FenceFromManualCal({route}) {
  const navigation = useNavigation();

  const{perimeter,area} =  route.params;
  const [FenceTypeselectedValue, setFenceTypeSelectedValue] = useState(null);
  const [PostSpaceUnitselectedValue, setPostSpaceUnitSelectedValue1] =useState(null);
  const [inputValueFenceLength, setinputValueFenceLength] = useState("");
  const [inputValueFenceAmount, setinputValueFenceAmount] = useState("");
  const [inputValuePostspace, setinputValuePostspace] = useState("");
  const [fenceLengthsArray, setFenceLengthsArray] = useState([]);
  const [fenceAmountsArray, setFenceAmountsArray] = useState([]);
  const [displayValues, setDisplayValues] = useState([]);
  let inputValueFenceAmountRef = useRef(null);
  const [fenceType, setFenceType] = useState([]);


  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/inputControl/getItems/FenceTypes"
      );
      setFenceType(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
      Alert.alert("Error", "Failed to fetch plants. Please try again.");
    }
  };

  const handleInputPostspaceChange = (text) => {
    setinputValuePostspace(text);
  };
  const handleFenceLengthChange = (text) => {
    setinputValueFenceLength(text);
  };

  const handleFenceAmountChange = (text) => {
    setinputValueFenceAmount(text);
  };

  const handleAdd = () => {
    // Validation part Add button
    if (!inputValueFenceLength.trim() || !inputValueFenceAmount.trim()) {
      Alert.alert("Validation Error", "Both input fields are required.", [
        { text: "OK" },
      ]);
      return;
    }

    if (inputValueFenceLength === null || inputValueFenceLength === '') {
      Alert.alert("Error", "Please enter a valid Length");
      return;
    }
  
    if (inputValueFenceLength.includes(".") && inputValueFenceLength.split(".").length > 2) {
      Alert.alert("Error", "Invalid float number");
      return;
    }
  
    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(inputValueFenceLength)) {
      Alert.alert("Error", "Length must be a float or decimal number");
      return;
    }
  
    if (inputValueFenceAmount === null || inputValueFenceAmount === '') {
      Alert.alert("Error", "Please enter a valid Count");
      return;
    }
  
    if (inputValueFenceAmount.includes(".") && inputValueFenceAmount.split(".").length > 2) {
      Alert.alert("Error", "Invalid decimal number");
      return;
    }
  
    const regex2 = /^\d+$/; // allow only decimal numbers
    if (!regex2.test(inputValueFenceAmount)) {
      Alert.alert("Error", "Count must be a decimal number");
      return;
    }

    // Add values to arrays
    const length = parseFloat(inputValueFenceLength);
    const amount = parseInt(inputValueFenceAmount);
    setFenceLengthsArray([...fenceLengthsArray, length]);
    setFenceAmountsArray([...fenceAmountsArray, amount]);

    // Combine values from arrays
    const combinedValue = length + "m" + " x " + amount;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setinputValueFenceLength("");
    setinputValueFenceAmount("");
  };

  //remove Added values 
  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);

    const newFenceLengthsArray = [...fenceLengthsArray];
    newFenceLengthsArray.splice(index, 1);
    setFenceLengthsArray(newFenceLengthsArray);

    const newFenceAmountsArray = [...fenceAmountsArray];
    newFenceAmountsArray.splice(index, 1);
    setFenceAmountsArray(newFenceAmountsArray);
  };

  const placeholderFenceType = {
    label: "Select Type",
    value: null,
    color: "blue",
  };

  const fenceTypeOptions = [
    { label: "Wood", value: "Wood" },
    { label: "Metal", value: "Metal" },
    { label: "Fiber", value: "Fiber" },
  ];

  const placeholderPostSpaceUnit = {
    label: "M",
    value: null,
    color: "blue",
  };

  const lengthUnitOptions = [
    { label: "m", value: "m" },
    { label: "cm", value: "cm" },
  ];

  //calculate button click
  const handleFenceDetails = async () => {
  // Validate the data
  if (!PostSpaceUnitselectedValue ||!FenceTypeselectedValue ||!inputValuePostspace) {
    // Display error message
    Alert.alert("Error", "Please fill in all fields");
    return;
  }

  if (inputValuePostspace === null || inputValuePostspace === '') {
    Alert.alert("Error", "Please enter a valid Post Space");
    return;
  }

  if (inputValuePostspace.includes(".") && inputValuePostspace.split(".").length > 2) {
    Alert.alert("Error", "Invalid float number");
    return;
  }

  const regex = /^\d+(\.\d+)?$/; // allow decimal and float numbers
  if (!regex.test(inputValuePostspace)) {
    Alert.alert("Error", "Please enter a valid Post Space");
    return;
  }

  // If validation is successful, send data to backend
  AxiosInstance.post("/api/fence/fenceFromManualcal", {
    FenceTypeselectedValue,
    inputValuePostspace,
    PostSpaceUnitselectedValue,
    displayValues,
    fenceAmountsArray,
    fenceLengthsArray,
    Perimeter : perimeter,
  })
   .then((response) => {
    const NumberofSticks = response.data.numberOfSticks;
    console.log(response.data);
      // If backend response is successful, navigate to detail page
      navigation.navigate("FencedetailfromManual", {
        FenceTypeselectedValue,
        inputValuePostspace,
        PostSpaceUnitselectedValue,
        displayValues,
        perimeter,
        area,
        NumberofSticks
      });
    })
   .catch((error) => {
      console.error("Error:", error.response.data);
      Alert.alert("Error", "Failed to create fence. Please try again.");
    });
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/*Header section*/}
      <View>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction
          onPress={() => navigation.goBack()}
          color="white"
        />
        <View style={{marginTop:40,left:10,width:"70%"}}>
        <Text style={styles.headerText}>Fence</Text>
        </View>
      </Appbar.Header>
    </View>

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top section */}
        <View style={styles.top}>
          <View style={styles.Box1}>
            <View>
              <Text style={styles.titleText}>Land Info</Text>
              <View style={styles.propertyBox}>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="vector-square"
                    size={36}
                    color="gray"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Perimeter</Text>
                    <Text style={styles.propertyValue}>{parseFloat(perimeter).toFixed(2)} km</Text>
                  </View>
                </View>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="texture-box"
                    size={36}
                    color="gray"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Area</Text>
                    <Text style={styles.propertyValue}>{parseFloat(area).toFixed(2)} perch</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}

          <View style={styles.box2}>
            <View style={styles.box2Property}>
              <MaterialCommunityIcons
                name="gate"
                size={40}
                color="gray"
                style={styles.squareIcon}
              />
              <View style={styles.box2PropertyDetails}>
                <Text style={styles.Box2PropertyLabel}>Fence Type</Text>
              </View>
            </View>
            <View style={styles.box2Property}>
              <View style={styles.Box2DropdownContainer}>
                <RNPickerSelect
                  placeholder={placeholderFenceType}
                  items={fenceType.map((Fence) => ({
                    label: Fence.Name,
                    value: Fence.Name,
                  }))}                  
                  onValueChange={(value) => setFenceTypeSelectedValue(value)}
                  value={FenceTypeselectedValue}
                  style={{
                    inputIOS: {
                      textAlign: "center",
                    },
                    inputAndroid: {
                      textAlign: "center",
                    },
                  }}
                />
              </View>
            </View>
          </View>

          {/* Third section */}

          <View style={styles.box3}>
            <View style={styles.box3Property}>
              <MaterialCommunityIcons
                name="format-line-spacing"
                size={30}
                color="gray"
                rotation={270}
              />
              <View style={styles.box3PropertyDetails}>
                <Text style={styles.Box3PropertyLabel}>Post Space</Text>
              </View>
            </View>
            <View style={styles.box3Property}>
              <View style={styles.box3inputContainer}>
                <TextInput
                  style={styles.box3input}
                  keyboardType="numeric"
                  placeholder="00"
                  value={inputValuePostspace}
                  onChangeText={handleInputPostspaceChange}
                />
                <View style={styles.dropdownContainer}>
                  <RNPickerSelect
                    placeholder={placeholderPostSpaceUnit}
                    items={lengthUnitOptions}
                    onValueChange={(value) =>
                      setPostSpaceUnitSelectedValue1(value)
                    }
                    value={PostSpaceUnitselectedValue}
                    style={{
                      inputIOS: {
                        textAlign: "center",
                      },
                      inputAndroid: {
                        textAlign: "center",
                      },
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Forth section */}

          <View style={styles.box4}>
            <View style={styles.box4innertop}>
              <MaterialCommunityIcons name="boom-gate" size={36} color="gray" />
              <Text style={styles.Box4TopText}>Gates</Text>
            </View>
            <View style={styles.box4InnerCenter}>
              <View style={styles.line}>
                <Text style={styles.linetext}>Length :</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.linetextinput}
                  placeholder="Enter Lenght of Gate"
                  marginLeft={10}
                  borderBottomWidth={1}
                  height={20}
                  borderBottomColor="lightgray"
                  returnKeyType="next"
                  onChangeText={handleFenceLengthChange}
                  value={inputValueFenceLength}
                  onSubmitEditing={() => {
                    // Focus on the next input field
                    inputValueFenceAmountRef.focus();
                  }}
                />
              </View>
              <View style={styles.line}>
                <Text style={styles.linetext}>Count :</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.linetextinput}
                  placeholder="Enter Count of Gate"
                  marginLeft={10}
                  borderBottomWidth={1}
                  alignItems="center"
                  justifyContent="center"
                  height={20}
                  returnKeyType="done"
                  borderBottomColor="lightgray"
                  onChangeText={handleFenceAmountChange}
                  value={inputValueFenceAmount}
                  ref={(input) => {
                    inputValueFenceAmountRef = input;
                  }}
                  onSubmitEditing={handleAdd}
                />
              </View>
            </View>
            <View style={styles.Box4InnerBottom}>
              <TouchableOpacity style={styles.Box4Button} onPress={handleAdd}>
                <Text style={styles.Box4ButtonText}>Add</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.displayValuesContainer}>
              {displayValues.map((value, index) => (
                <View key={index} style={styles.displayValueContainer}>
                  <Text style={styles.displayValueText}>{value}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveValue(index)}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={20}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Bottom section */}

        <View style={styles.bottom}>
          <CustomButton
            onPress={handleFenceDetails}
            text="Calculate"
            iconName="calculator"
            iconColor="white"
            buttonColor="#0866FF"
            style={styles.calculateButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

