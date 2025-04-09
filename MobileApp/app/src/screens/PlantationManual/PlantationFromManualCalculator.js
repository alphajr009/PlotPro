import {
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./PlantationFromManualCalculatorStyles";
import Headersection from "../../components/Headersection";
import CustomButton from "../../components/CustomButton";
import AxiosInstance from "../../AxiosInstance";

export default function PlantationFromManualCalculator({ route }) {
  const {area, perimeter } = route.params;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  route = useRoute();
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/inputControl/getItems/Plants"
      );
      setPlants(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
      Alert.alert("Error", "Failed to fetch plants. Please try again.");
    }
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const [textPlant, setTextPlant] = useState("");
  const [textplantspace, setTextPlantSpace] = useState("");
  const [textRowspace, setTextRowSpace] = useState("");
  const navigation = useNavigation();
  const [PlantSpaceUnitselectedValue, PlantSpaceUnitSetSelectedValue] = useState(null);
  const PlantSpaceUnitPlaceholder = {
    label: "M",
    value: null,
    color: "blue",
  };

  const PlantSpaceUnitOptions = [
    { label: "cm", value: "cm" },
    { label: "m", value: "m" },
  ];

  const RowSpacingUnitplaceholder = {
    label: "M",
    value: null,
    color: "blue",
  };

  const RowSpacingUnitOptions = [
    { label: "cm", value: "cm" },
    { label: "m", value: "m" },
  ];
  let plantSpaceInMeters = textplantspace;
  let rowSpaceInMeters = textRowspace;

  // Convert to meters if the selected unit is 'cm'
  if (PlantSpaceUnitselectedValue === "cm") {
    plantSpaceInMeters = parseFloat(textplantspace) / 100;
  }
  if (PlantSpaceUnitselectedValue === "m") {
    plantSpaceInMeters = plantSpaceInMeters;
  }

  if (PlantSpaceUnitselectedValue === "cm") {
    rowSpaceInMeters = parseFloat(textRowspace) / 100;
  }
  if (PlantSpaceUnitselectedValue === "m") {
    rowSpaceInMeters = rowSpaceInMeters ;
;
  }
  const handlePlantationDetailsFromManualCalculator = async () => {
    if (
      !textPlant ||
      !textplantspace ||
      !textRowspace ||
      !PlantSpaceUnitselectedValue
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await AxiosInstance.post(
        "/api/plantation/plantationFromManualCalculator",
        {
          textPlant,
          textplantspace: plantSpaceInMeters,
          textRowspace: rowSpaceInMeters,
          PlantSpaceUnitselectedValue: "m", // Send 'm' as the unit   
          area,
          perimeter
        }
      );

      if (response.data.status === "ok") {
        const { numberOfPlants, calculatedPlantDensity, textPlant } =
          response.data.data;
        console.log(numberOfPlants, calculatedPlantDensity, textPlant);
        navigation.navigate("PlantationDetailsFromManualCalculator", {
          area,
          perimeter,
          numberOfPlants,
          plantDensity: calculatedPlantDensity,
          textPlant,
          textplantspace,
          textRowspace,
          PlantSpaceUnitselectedValue,
        });
      } else {
        Alert.alert("Error", response.data.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      Alert.alert("Error", "Something went wrong");
    }
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
      <Headersection navigation={navigation} title="Plantation" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top section */}
        <View style={styles.top}>
          <View style={styles.Box1}>
            <Text style={styles.titleText}>Land Info</Text>
            <View style={styles.propertyBox}>
              <View style={styles.property}>
                <MaterialCommunityIcons name="grid" size={36} color="gray" />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Type</Text>
                  <Text style={styles.propertyValue}>Flat</Text>
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
                  <Text style={styles.propertyValue}>{area} m{"\u00B2"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}

          <View style={styles.Box2Plants}>
            <View style={styles.TopText}>
              <MaterialCommunityIcons name="sprout" size={20} color="gray" />
              <Text style={styles.Box2titleText}>Plant</Text>
            </View>
            <View style={styles.dropdownContainerPlants}>
              <RNPickerSelect
                placeholder={{ label: "Select a plant", value: null }}
                items={plants.map((plant) => ({
                  label: plant.Name,
                  value: plant.Name,
                }))}
                onValueChange={(value) => setTextPlant(value)}
                value={textPlant}
                style={{
                  inputAndroid: {
                    textAlign: "center",
                  },
                }}
              />
            </View>
          </View>

          {/* Third section */}

          <View style={styles.Box2}>
            <View style={styles.TopText}>
              <MaterialCommunityIcons name="apps" size={20} color="gray" />
              <Text style={styles.Box2titleText}>Column Spacing</Text>
            </View>
            <View style={styles.Box3propertyBox}>
              <TextInput
                keyboardType="numeric"
                style={styles.Box2input}
                placeholder="Enter Plant Space"
                value={textplantspace}
                onChangeText={setTextPlantSpace}
                placeholderTextColor={"#838383"}
                borderBottomColor="lightgray"
                borderBottomWidth={1}
                width={"60%"}
              />
              <View style={styles.dropdownContainer}>
                <RNPickerSelect
                  placeholder={PlantSpaceUnitPlaceholder}
                  items={PlantSpaceUnitOptions}
                  onValueChange={(value) =>
                    PlantSpaceUnitSetSelectedValue(value)
                  }
                  value={PlantSpaceUnitselectedValue}
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

          {/* Forth section */}

          <View style={styles.Box2}>
            <View style={styles.TopText}>
              <MaterialCommunityIcons
                name="format-line-spacing"
                size={20}
                color="gray"
              />
              <Text style={styles.Box2titleText}>Row Spacing</Text>
            </View>
            <View style={styles.Box3propertyBox}>
              <TextInput
                keyboardType="numeric"
                style={styles.Box2input}
                placeholder="Enter Row Space"
                value={textRowspace}
                onChangeText={setTextRowSpace}
                placeholderTextColor={"#838383"}
                borderBottomColor="lightgray"
                borderBottomWidth={1}
                width={"60%"}
              />
              <View style={styles.dropdownContainer}>
                <RNPickerSelect
                  placeholder={RowSpacingUnitplaceholder}
                  items={RowSpacingUnitOptions}
                  onValueChange={(value) =>
                    PlantSpaceUnitSetSelectedValue(value)
                  }
                  value={PlantSpaceUnitselectedValue}
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

        {/* Bottom section */}

        {!isKeyboardVisible && (
          <View style={styles.bottom}>
            <CustomButton
              onPress={handlePlantationDetailsFromManualCalculator}
              text="Calculate Plantation"
              iconName="calculator"
              iconColor="white"
              buttonColor="#0866FF"
            />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
