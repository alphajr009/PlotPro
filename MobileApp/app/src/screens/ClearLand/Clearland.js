import * as React from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import {
  PaperProvider,
  Appbar,
  Card,
  Button,
  Searchbar,
  TextInput,
} from "react-native-paper";
import {
  responsiveHeight,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./ClearLandStyles";
import Headersection from "../../components/Headersection";
import CustomButton from "../../components/CustomButton";
import WeedAlert from "./AlertButtonWeed";
import PlantAlert from "./AlertButtonPlant";
import StoneAlert from "./AlertButtonStones";
import AxiosInstance from "../../AxiosInstance";

export default function ClearLand({ route }) {
  const navigation = useNavigation();
  const { id, Area ,item,ClearLandData } = route.params;
  const [text, setText] = React.useState("");
  const [pressed, setPressed] = useState(null);
  const [plantTypeSelectedValue, setPlantTypeSelectedValue] = useState(null);
  const [plantCount, setPlantCount] = useState("");
  const [stoneTypeSelectedValue, setStoneTypeSelectedValue] = useState(null);
  const [stonesCount, setStonesCount] = useState("");
  const [laborCount, setLaborCount] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [machineTypeSelectedValue, setMachineTypeSelectedValue] = useState(null);
  const [machineCount, setMachineCount] = useState("");
  const [Machines, SetMachines] = useState([]);

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/inputControl/getItems/Machines"
      );
      SetMachines(response.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
      Alert.alert("Error", "Failed to fetch plants. Please try again.");
    }
  };

  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (ClearLandData) {
      setEditMode(true);
      setPressed(ClearLandData.weedsType);
      setLaborCount(ClearLandData.laborCount);
      setWorkHours(ClearLandData.workHours);
      setDisplayValues(ClearLandData.plantDetails || []);
      setDisplayValues1(ClearLandData.stoneDetails || []);
      setDisplayValues2(ClearLandData.machineDetails || []);
    }
  }, [ClearLandData]);
  const handlePlantCountChange = (text) => {
    setPlantCount(text);
  };

  const handleStoneCountChange = (text) => {
    setStonesCount(text);
  };
  const handleLaborCountChange = (text) => {
    setLaborCount(text);
  };
  const handleWorkHourChange = (text) => {
    setWorkHours(text);
  };
  const handleMachineCountChange = (text) => {
    setMachineCount(text);
  };

  const placeholder1 = {
    label: "Select Type",
    value: null,
    color: "red",
  };

  const options1 = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
  ];

  const placeholder = {
    label: "Select Type",
    value: null,
    color: "red",
  };

  const options = [
    { label: "Small", value: "Small" },
    { label: "Large", value: "Large" },
  ];

  const placeholder2 = {
    label: "Select Machine Type",
    value: null,
    color: "red",
  };

  const options2 = [
    { label: "Excavators", value: "Excavators" },
    { label: "Backhoes", value: "Backhoes" },
    { label: "Chainsaws", value: "Chainsaws" },
    { label: "Excavator breakers", value: "Excavator breakers" },
  ];

  /display/;

  const [displayValues, setDisplayValues] = useState([]);

  const handleAdd = () => {
    if (!plantTypeSelectedValue || !plantCount) {
      Alert.alert("Error","Please fill both input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(plantCount)) {
      Alert.alert("Error","Please enter a valid plant count");
      return;
    }
    //validation part Add button
    const combinedValue = plantCount + " x " + plantTypeSelectedValue;
    const newDisplayValues = [...displayValues, combinedValue].filter(Boolean);
    setDisplayValues(newDisplayValues);
    setPlantTypeSelectedValue("");
    setPlantCount("");
  };

  const handleRemoveValue = (index) => {
    const newDisplayValues = [...displayValues];
    newDisplayValues.splice(index, 1);
    setDisplayValues(newDisplayValues);
  };

  const [displayValues1, setDisplayValues1] = useState([]);

  const handleAdd1 = () => {
    if (!stoneTypeSelectedValue || !stonesCount) {
      Alert.alert("Error","Please fill both input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(stonesCount)) {
      Alert.alert("Error","Please enter a valid stone count");
      return;
    }
    //validation part Add button
    const combinedValue1 = stonesCount + " x " + stoneTypeSelectedValue;
    const newDisplayValues1 = [...displayValues1, combinedValue1].filter(
      Boolean
    );
    setDisplayValues1(newDisplayValues1);
    setStoneTypeSelectedValue("");
    setStonesCount("");
  };

  const handleRemoveValue1 = (index) => {
    const newDisplayValues1 = [...displayValues1];
    newDisplayValues1.splice(index, 1);
    setDisplayValues1(newDisplayValues1);
  };

  const [displayValues2, setDisplayValues2] = useState([]);

  const handleAdd2 = () => {
    if (!machineTypeSelectedValue || !machineCount) {
      Alert.alert("Error","Please fill both input fields");
      return;
    }

    const regex = /^\d+(\.\d+)?$/; // allow float and decimal numbers
    if (!regex.test(machineCount)) {
      Alert.alert("Error","Please enter a valid machine count");
      return;
    }
    //validation part Add button
    const combinedValue2 = machineCount + " x " + machineTypeSelectedValue;
    const newDisplayValues2 = [...displayValues2, combinedValue2].filter(
      Boolean
    );
    setDisplayValues2(newDisplayValues2);
    setMachineTypeSelectedValue("");
    setMachineCount("");
  };

  const handleRemoveValue2 = (index) => {
    const newDisplayValues2 = [...displayValues2];
    newDisplayValues2.splice(index, 1);
    setDisplayValues2(newDisplayValues2);
  };

  const handleClear = async () => {
    if (!laborCount) {
      Alert.alert("Error", "Please enter the Labor Count.");
      return;
    }

    if (!workHours) {
      Alert.alert("Error", "Please enter the Work Hours.");
      return;
    }

    if (displayValues2.length === 0) {
      Alert.alert("Error", "Please add at least one Machinery item.");
      return;
    }

    if (!pressed && displayValues.length === 0 && displayValues1.length === 0) {
      Alert.alert(
        "Error",
        "Please fill in at least one optional field: Weeds, Plants, or Stones."
      );
      return;
    }
    const regex2 = /^\d+$/; // allow only decimal numbers
    if (!regex2.test(laborCount)) {
      Alert.alert("Error","Please enter a valid labor count");
      return;
    }
    const regex = /^\d+$/; // allow only decimal numbers
    if (!regex.test(workHours)) {
      Alert.alert("Error"," Please enter a valid work hour count");
      return;
    }

    const method = editMode ? 'put' : 'post';
    const url = editMode ? `/api/clearLand/clearLand/${id}` : '/api/clearLand/clearLand';
    AxiosInstance[method](url, {
      id,
      pressed,
      displayValues,
      displayValues1,
      laborCount,
      workHours,
      displayValues2,
    })
      .then((response) => {
        
        navigation.navigate("EffortOutput", {
          id: id,
          item: item,
        });

      })
      .catch((error) => {
        console.error("Error:", error.response.data);
        Alert.alert("Error", "Something went wrong");
      });
  };

  return (
    <PaperProvider>
      {/* Status bar section */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/* <Headersection navigation={navigation} title="Clear Land"></Headersection> */}

      {/* Header section */}
      <View>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.navigate("TemplateView", { item: item })}
            color="white"
          />
          <View style={{ marginTop: 40, left: 10, width: "70%" }}>
            <Text style={styles.headerText}>Clear Land</Text>
          </View>
        </Appbar.Header>
      </View>
      {/* ScrollView section */}
      <ScrollView>
        <View style={styles.container2}>
          {/* Weeds box */}
          <Card style={styles.card}>
          
            <Card.Content style={styles.cardContent1}>
              <View style={styles.cardTop}>
              <View style={styles.cardHeader}>
              <MaterialCommunityIcons
                name="sprout-outline"
                size={responsiveFontSize(3)}
                color="#65676B"
              />
                <Text style={styles.cardTopText} variant="titleLarge">
                Weeds
                </Text>
              </View>
              <WeedAlert></WeedAlert>
              </View>
              <PaperProvider>
                <View style={styles.weedButton}>
                  <Button
                    style={[
                      styles.button,
                      pressed === "Low" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "Low" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("Low")}
                  >
                    Low
                  </Button>
                  <Button
                    style={[
                      styles.button,
                      pressed === "Medium" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "Medium" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("Medium")}
                  >
                    Medium
                  </Button>
                  <Button
                    style={[
                      styles.button,
                      pressed === "High" && styles.pressedButton,
                    ]}
                    labelStyle={[
                      styles.text,
                      pressed === "High" && styles.pressedText,
                    ]}
                    mode="contained-tonal"
                    onPress={() => setPressed("High")}
                  >
                    High
                  </Button>
                </View>
              </PaperProvider>
            </Card.Content>
          </Card>

          {/* Plants box */}
          <Card style={styles.card1}>
            <Card.Content style={styles.cardContent}>
            <View style={styles.card1Top}>
              <View style={styles.card1Header}>
              <MaterialCommunityIcons
                name="sprout"
                size={responsiveFontSize(3)}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Trees
              </Text>
              </View>
              <PlantAlert></PlantAlert>
              </View>
              
              <View style={styles.Dropdown1}>
                <RNPickerSelect
                  placeholder={placeholder1}
                  items={options1}
                  onValueChange={(value) => setPlantTypeSelectedValue(value)}
                  value={plantTypeSelectedValue}
                  style={{ cursor: "pointer" }}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: responsiveHeight(3.5),
                }}
              >
                <Text style={styles.countText}>
                  Count :{" "}
                  <View style={{ marginTop: -1 }}>
                    <TextInput
                      style={{
                        backgroundColor: "transparent",
                        height: 20,
                        paddingHorizontal: 0,
                        width: 40,
                      }}
                      keyboardType="numeric"
                      placeholder="Count"
                      placeholderStyles={{ width: 40, paddingHorizontal: 3 }}
                      mode="flat"
                      value={plantCount}
                      onChangeText={handlePlantCountChange}
                      placeholderTextColor={"#838383"}
                      underlineStyle={{ width: 45, marginLeft: 3 }}
                    />
                  </View>
                </Text>
              </View>

              <Button
                style={styles.addButton}
                labelStyle={styles.addButtonText}
                buttonColor="#007BFF"
                mode="contained-tonal"
                onPress={handleAdd}
              >
                Add
              </Button>
            </Card.Content>

            {/* Display values */}
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
                      size={responsiveFontSize(2.7)}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>

          {/* Stones box */}
          <Card style={styles.card1}>
            
            <Card.Content style={styles.cardContent}>
            <View style={styles.card2Top}>
              <View style={styles.card2Header}>
              
              <Image source={require("../../../assets/Stones.png")} />
              <Text style={styles.cardTopText} variant="titleLarge">
                Stones
              </Text>
              </View>
              </View>
              <StoneAlert></StoneAlert>
              
              <View style={styles.Dropdown2}>
                <RNPickerSelect
                  placeholder={placeholder}
                  items={options}
                  onValueChange={(value) => setStoneTypeSelectedValue(value)}
                  value={stoneTypeSelectedValue}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: responsiveHeight(3.5),
                }}
              >
                <Text style={styles.countText}>
                  Count :{" "}
                  <View style={{ marginTop: -1 }}>
                    <TextInput
                      style={{
                        backgroundColor: "transparent",
                        height: 20,
                        paddingHorizontal: 3,
                        width: 40,
                      }}
                      keyboardType="numeric"
                      placeholder="Count"
                      placeholderStyles={{ width: 40, paddingHorizontal: 3 }}
                      mode="flat"
                      value={stonesCount}
                      onChangeText={handleStoneCountChange}
                      placeholderTextColor={"#838383"}
                      underlineStyle={{ width: 45, marginLeft: 5 }}
                    />
                  </View>
                </Text>
              </View>

              <Button
                style={styles.addButton}
                labelStyle={styles.addButtonText}
                buttonColor="#007BFF"
                mode="contained-tonal"
                onPress={handleAdd1}
              >
                Add
              </Button>
            </Card.Content>

            {/* Display values */}
            <View style={styles.displayValuesContainer}>
              {displayValues1.map((value, index) => (
                <View key={index} style={styles.displayValueContainer}>
                  <Text style={styles.displayValueText}>{value}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveValue1(index)}
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
          </Card>

          {/* Labors box */}
          <Card style={styles.card2}>
            <Card.Content style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="account-hard-hat"
                size={20}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Labors :
              </Text>
              <View style={{ marginTop: -5 }}>
                <TextInput
                  style={{
                    backgroundColor: "transparent",
                    height: 24,
                    width: 200,
                    fontSize: 16,
                    paddingHorizontal: 8,
                  }}
                  keyboardType="numeric"
                  placeholder="Enter count of Labors"
                  mode="flat"
                  onChangeText={handleLaborCountChange}
                  value={laborCount}
                  placeholderTextColor={"#838383"}
                  underlineStyle={{ width: 157, marginLeft: 7 }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Work hours box */}
          <Card style={styles.card2}>
            <Card.Content style={{ display: "flex", flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="clock-time-eight-outline"
                size={20}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Work Hours :
              </Text>
              <View style={{ marginTop: -5 }}>
                <TextInput
                  style={{
                    backgroundColor: "transparent",
                    height: 24,
                    width: 200,
                    fontSize: 16,
                    paddingHorizontal: 8,
                  }}
                  keyboardType="numeric"
                  placeholder="Enter hours per day"
                  mode="flat"
                  onChangeText={handleWorkHourChange}
                  value={workHours}
                  placeholderTextColor={"#838383"}
                  underlineStyle={{ width: 155, marginLeft: 6 }}
                />
              </View>
            </Card.Content>
          </Card>

          {/* Machinery box */}
          <Card style={styles.card3}>
            <Card.Content style={styles.cardContent}>
              <MaterialCommunityIcons
                name="excavator"
                size={20}
                color="#65676B"
              />
              <Text style={styles.cardTopText} variant="titleLarge">
                Machinery
              </Text>
              <View
                style={{
                  marginLeft: -45,
                  width: 230,
                  marginTop: 25,
                  alignItems: "center",
                }}
              >
                <View style={styles.Dropdown3}>
                <RNPickerSelect
                  placeholder={placeholder2}
                  items={Machines.map((Machine) => ({
                    label: Machine.Name,
                    value: Machine.Name,
                  }))}                  
                  onValueChange={(value) => setMachineTypeSelectedValue(value)}
                  value={machineTypeSelectedValue}
                />
              </View>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 10,
                    marginLeft: -200,
                  }}
                  variant="titleLarge"
                >
                  Count :
                </Text>
                <View style={{ marginTop: -23 }}>
                  <TextInput
                    style={{
                      backgroundColor: "transparent",
                      height: 24,
                      width: 200,
                      fontSize: 16,
                      paddingHorizontal: 8,
                      marginLeft: 50,
                    }}
                    keyboardType="numeric"
                    placeholder="Enter count of machines"
                    mode="flat"
                    onChangeText={handleMachineCountChange}
                    value={machineCount}
                    placeholderTextColor={"#838383"}
                    underlineStyle={{ width: 180, marginLeft: 7 }}
                  />
                </View>
                <Button
                  style={styles.machineAddButton}
                  labelStyle={styles.addButtonText}
                  buttonColor="#007BFF"
                  mode="contained-tonal"
                  onPress={handleAdd2}
                >
                  Add
                </Button>
              </View>
            </Card.Content>

            {/* Display values */}
            <View style={styles.displayValuesContainer}>
              {displayValues2.map((value, index) => (
                <View key={index} style={styles.displayValueContainer}>
                  <Text style={styles.displayValueText}>{value}</Text>
                  <TouchableOpacity
                    onPress={() => handleRemoveValue2(index)}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons
                      name="close-circle-outline"
                      size={responsiveFontSize(2.7)}
                      color="#007BFF"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </Card>

          {/* Calculate button */}
          <View style={styles.calButtton}>
            <CustomButton
              onPress={handleClear}
              text="Calculate"
              iconName="calculator"
              iconColor="white"
              buttonColor="#007BFF"
            />
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
}
