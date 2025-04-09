import React, { useState, useEffect } from "react";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import Headersection from "../../components/Headersection";
import CustomButton from "../../components/CustomButton";
import AxiosInstance from "../../AxiosInstance";
import { styles } from "./FertilizingStyles";

export default function Fertilization({ route }) {
  const { params } = route;
  const { numberOfPlants, PlantationDensity, plantType,area ,perimeter} = params;
  const navigation = useNavigation();

  useEffect(() => {
    console.log("receiving" + numberOfPlants + " " + PlantationDensity + " " + plantType + " " + numberOfPlants);
  }, []);

  const handleFertilizationDetails = async () => {
    if (!textFertilizationType || !textFertilizationNUmberoftime || !textFertilizationAmount || !FertilizerAmountUnitselectedValue || selectedButton === null) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }


    AxiosInstance.post("/api/fertilizer/fertilizer", {
      numberOfPlants,
      textFertilizationType,
      textFertilizationNUmberoftime,
      textFertilizationAmount,
      selectedButton,
      FertilizerAmountUnitselectedValue
    })
      .then(async (response) => {
        if (response.data.status === "ok") {
          const totalAmountForPlantation = response.data.data.totalAmountForPlantation;
          const lmn = response.data.data.totalAmount

          navigation.navigate("FertilizationDetails", {
            plantcount: numberOfPlants,
            count: lmn,
            Total: totalAmountForPlantation,
            area:area,
            perimeter:perimeter,
            FertilizerType: textFertilizationType,
            NumberOfTime: textFertilizationNUmberoftime,
            FertilizerAmount: textFertilizationAmount,
            FertilizerAmountUnit: FertilizerAmountUnitselectedValue,
            SelectedButton: selectedButton !== null ? buttonNames[selectedButton] : null,
          });
        } else {
          console.error(response.data.data);
        }
      }).catch((err) => {
        console.error(error);
        Alert.alert("Error", "Something went wrong");
      })
  };

  /*button bar */
  const [selectedButton, setSelectedButton] = useState(null);

  const [pressedIndex, setPressedIndex] = useState(null);

  const handlePressButtonbar = (index) => {
    setPressedIndex(index === pressedIndex ? null : index);
    setSelectedButton(index === pressedIndex ? null : index);

  };

  const isPressed = (index) => {
    return index === pressedIndex;
  };

  const buttonNames = ["Daily", "Weekly", "Monthly", "Quarter", "Yearly"];

  /*text area */
  const [textFertilizationType, setTextFertilizationType] = useState("");
  const [textFertilizationNUmberoftime, setTextFertilizationNUmberoftime] = useState("");
  const [textFertilizationAmount, setTextFertilizationAmount] = useState("");
  const [FertilizerAmountUnitselectedValue, FertilizerAmountUnitsetSelectedValue] = useState(null);

  const FertilizerAmountUnitplaceholder = {
    label: "KG",
    value: null,
    color: "blue",
  };

  const FertilizerAmountUnitOptions = [
    { label: "Kg", value: "Kg" },
    { label: "g", value: "g" },
    { label: "mg", value: "mg" },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/*Header section*/}
      <Headersection navigation={navigation} title="Fertilizing" />

      {/* Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.top}>
          {/* Top section */}
          <View style={styles.Box1}>
            <View style={styles.innerContainer}>
              <Text style={styles.titleText}>Plantation Info</Text>
              {/* Property boxes */}
              <View style={styles.propertyBox}>
                {/* Row 1 */}
                <View style={styles.propertyboxtop}>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="sprout"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Plant</Text>
                      <Text style={styles.propertyValue}>{plantType}</Text>
                    </View>
                  </View>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="texture-box"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Area</Text>
                      <Text style={styles.propertyValue}>{parseFloat(area).toFixed(2)} Perch</Text>
                    </View>
                  </View>
                </View>
                {/* Row 2 */}
                <View style={styles.propertyboxtop}>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="square-opacity"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Density</Text>
                      <Text style={styles.propertyValue}>{PlantationDensity}</Text>
                    </View>
                  </View>
                  <View style={styles.property}>
                    <MaterialCommunityIcons
                      name="pine-tree"
                      size={36}
                      color="#65676B"
                    />
                    <View style={styles.propertyDetails}>
                      <Text style={styles.propertyLabel}>Total Plants</Text>
                      <Text style={styles.propertyValue}>{numberOfPlants}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}

          <View style={styles.Box2}>

            <View style={styles.Box2innerContainer}>
              <View style={styles.TopText}>
                <MaterialCommunityIcons
                  name="timer-sand"
                  size={22}
                  color="#65676B"
                />
                <Text style={styles.Box2titleText}>Time Period</Text>
              </View>
              <View style={styles.selectbuttonBox}>

                {buttonNames.map((name, index) => (
                  <Button
                    labelStyle={{
                      fontSize: responsiveFontSize(1.5),
                      fontWeight: "400",
                      marginTop: responsiveHeight(1),
                      color: isPressed(index) ? "#007aff" : "#000",
                      width: "80%",
                      height: "60%",
                      margin: responsiveHeight(0.5),

                    }}
                    key={index}
                    mode={isPressed(index) ? "contained-tonal" : "outlined"}
                    color={isPressed(index) ? "#007aff" : "#000"}
                    onPress={() => handlePressButtonbar(index)}
                    style={[
                      styles.button,
                      { borderColor: isPressed(index) ? "#007aff" : "#000" },
                    ]}
                  >
                    {name}
                  </Button>
                ))}

              </View>
            </View>

          </View>

          {/* Third section */}

          <View style={styles.Box3}>
            <View style={styles.Box3TopText}>
              <MaterialCommunityIcons
                name="flask-outline"
                size={20}
                color="#65676B"
              />
              <Text style={styles.Box3titleText}>Fertilizer Type :</Text>
            </View>
            <TextInput

              style={styles.Box2input}
              placeholder="Enter The name"
              value={textFertilizationType}
              onChangeText={setTextFertilizationType}
              placeholderTextColor={"#838383"}
              borderBottomColor="lightgray"
              borderBottomWidth={1}
              width={"36%"}
              height={20}
              marginbottom={10}
              marginLeft={10}
            />
          </View>

          {/* Forth section */}

          <View style={styles.Box3}>
            <View style={styles.Box3TopText}>
              <MaterialCommunityIcons
                name="ticket-confirmation"
                size={20}
                color="#65676B"
              />
              <Text style={styles.Box3titleText}>Number of Times :</Text>
            </View>
            <TextInput
              keyboardType="numeric"
              style={styles.Box2input}
              placeholder="00"
              value={textFertilizationNUmberoftime}
              onChangeText={setTextFertilizationNUmberoftime}
              placeholderTextColor={"#838383"}
              borderBottomColor="lightgray"
              borderBottomWidth={1}
              width={"30%"}
              height={20}
              marginbottom={10}
              marginLeft={10}
            />
          </View>

          {/* Fifth section */}

          <View style={styles.Box5}>
            <View style={styles.Box2innerContainer}>
              <View style={styles.TopText}>
                <MaterialCommunityIcons
                  name="weight-kilogram"
                  size={20}
                  color="#65676B"
                />
                <Text style={styles.Box2titleText}>Amount</Text>
              </View>
              <View style={styles.Box5propertyBox}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.Box2input}
                  placeholder="Enter Fertilization Amount"
                  value={textFertilizationAmount}
                  onChangeText={setTextFertilizationAmount}
                  placeholderTextColor={"#838383"}
                  borderBottomColor="lightgray"
                  borderBottomWidth={1}
                  width={"60%"}
                />
                <View style={styles.dropdownContainer}>
                  <RNPickerSelect
                    placeholder={FertilizerAmountUnitplaceholder}
                    items={FertilizerAmountUnitOptions}
                    onValueChange={(value) => FertilizerAmountUnitsetSelectedValue(value)}
                    value={FertilizerAmountUnitselectedValue}

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
              <Text style={styles.Box5bottomText}>
                *Note that this amount of fertilizer is the amount of fertilizer
                for one tree{" "}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom section */}

        <View style={styles.bottom}>

          <CustomButton
            onPress={handleFertilizationDetails}
            text=" Calculate Fertilizing"
            iconName="calculator"
            iconColor="white"
            buttonColor="#0866FF"
          />


        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

