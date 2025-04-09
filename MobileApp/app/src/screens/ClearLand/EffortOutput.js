import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import {
  PaperProvider,
  Appbar,
  Card,
  Button,
  Searchbar,
  placeholderStyle,
} from "react-native-paper";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { styles } from "./EffortOutputStyles";
import Headersection from "../../components/Headersection";
import AlertButton from "../../components/AlertButton";
import EffortAlert from "./AlertButtonEffort";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import AxiosInstance from "../../AxiosInstance";
import { effortOutputPrint } from "./EffortOutputPrint";

export default function EffortOutput({ route }) {
  const navigation = useNavigation();

  const { id, item } = route.params;
  const [workHours, setworkHours] = useState(null);
  const [laborCount, setlaborCount] = useState(null);
  const [data1, setdata1] = useState([]);
  const [Area, setArea] = useState(null);
  const [Perimeter, setPerimeter] = useState(null);
  const [effortOutput, setEffortOutput] = useState(null);
  const [workDays, setWorkDays] = useState(null);
  const [weedEffort, setWeedEffort] = useState(null);
  const [plantEffort, setPlantEffort] = useState(null);
  const [stoneEffort, setStoneEffort] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [ClearLandData, setClearLandData] = useState(null);
  const [weedsType,setWeedType] = useState(null);
  const [plantDetails,setPlantDetails] = useState(null);
  const [stoneDetails,setStoneDetails] = useState(null);

  //Fetch data from database
  const fetchData = async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/clearLand/effortOutput/${id}`
      );
      setClearLandData(response.data);
      setworkHours(response.data.workHours);
      setlaborCount(response.data.laborCount);
      setdata1(response.data.machineDetails);
      setArea(response.data.Area);
      setPerimeter(response.data.Perimeter);
      setEffortOutput(response.data.effortOutput);
      setWeedEffort(response.data.weedEffort);
      setPlantEffort(response.data.plantEffort);
      setStoneEffort(response.data.stoneEffort);
      setWorkDays(response.data.workDays);
      setWeedType(response.data.weedsType);
      setPlantDetails(response.data.plantDetails);
      setStoneDetails(response.data.stoneDetails);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  //Refresh the screen
  useFocusEffect(
    useCallback(() => {
      fetchData(id);
    }, [id])
  );

  //delete clear land model from the database
  const ClearLandDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/clearLand/deleteClearLand/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      //log the detailed error response
      console.error(
        "Error deleting clear land:",
        error.response ? error.response.data : error.message
      );
      throw error; // Re-throw the error to handle it in the caller function
    }
  };

  //edit button pressed function
  const handleIconPress = () => {
    Alert.alert(
      "Edit Options",
      "What would you like to do?",
      [
        {
          text: "Close",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => handleDelete(),
          style: "destructive"
        },
        {
          text: "Update",
          onPress: () => handleUpdate()
        }
      ],
      { cancelable: false }
    );
  };

   // Edit button pressed function
   const handleDelete = () => {
    Alert.alert(
      "Update Data",
      "Do you want to delete Fence data?",
      [
        {
          text: "No",
          onPress: () => console.log("No pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await ClearLandDelete(id);
              // Alert.alert('Success', 'Fence deleted successfully.');
              navigation.navigate("Clearland", {
                id: id,
                Area: Area,
                Perimeter: Perimeter,
                item: item,
              });
            } catch (error) {
              // Show detailed error message
              const errorMessage = error.response
                ? error.response.data.message
                : error.message;
              Alert.alert("Error", `Failed to delete Clear land: ${errorMessage}`);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdate = () => {
    navigation.navigate("Clearland", {
      id: id,
      Area: Area,
      Perimeter: Perimeter,
      item: item,
      ClearLandData:ClearLandData,
    });
  };


  //back to home function
  const backToHome = () => {
    navigation.navigate("TemplateView",{item : item});
  };

  //Generate pdf
  const html = effortOutputPrint(Perimeter, Area, laborCount, workHours,effortOutput,weedEffort,plantEffort,stoneEffort);

  // Print
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <PaperProvider>
      <Appbar.Header style={styles.top_Bar} dark={true} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => navigation.navigate("TemplateView", { item: item })}
          color="white"
        />

        <Text style={styles.headerText}>Effort Output</Text>

        {/* pencil/ pen icon  */}
        <TouchableOpacity onPress={handleIconPress}>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={23}
            color="white"
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      </Appbar.Header>

      {loading ? (
        <View style={styles.loadingScreen}>
          <View style={styles.dotsWrapper}>
            <ActivityIndicator color="#007BFF" size={45} />
          </View>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.container2}>
            {/* section 1 */}
            <View style={styles.box1}>
              <Text style={styles.titleText}>Total Effort Count</Text>
              <AlertButton></AlertButton>
              <View style={styles.propertyBox}>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="timer-sand"
                    size={40}
                    color="#65676B"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Total Hours</Text>

                    <Text style={styles.propertyValue}>{effortOutput}</Text>
                  </View>
                </View>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="timer-outline"
                    size={40}
                    color="#65676B"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>
                      {workHours} hrs per day
                    </Text>
                    <Text style={styles.propertyValue}>{workDays} days</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* section 2 */}
            <View style={styles.box2}>
              <View style={styles.box2Property}>
                <MaterialCommunityIcons
                  name="vector-square"
                  size={36}
                  color="#65676B"
                />
                <View style={styles.box2PropertyDetails}>
                  <Text style={styles.Box2PropertyLabel}>Perimeter</Text>
                  <Text style={styles.Box2PropertyValue}>
                    {parseFloat(Perimeter).toFixed(2)} km
                  </Text>
                </View>
              </View>
              <View style={styles.box2Property}>
                <MaterialCommunityIcons
                  name="texture-box"
                  size={36}
                  color="#65676B"
                />
                <View style={styles.box2PropertyDetails}>
                  <Text style={styles.Box2PropertyLabel}>Area</Text>
                  <Text style={styles.Box2PropertyValue}>
                    {parseFloat(Area).toFixed(2)} Perch
                  </Text>
                </View>
              </View>
            </View>

            {/* section 3 */}
            <View style={styles.box4}>
              <View style={styles.box4Header}>
                <Text style={styles.innertopText}>Effort Values</Text>
                <EffortAlert></EffortAlert>
              </View>
              <View style={styles.box4inner}>
                <View style={styles.box4Inner}>
                  <Text style={styles.box4Text}>
                    Remove weeds    : {(weedEffort ?? 0).toFixed(2)} hrs
                  </Text>
                  <Text>Cut trees               : {(plantEffort ?? 0).toFixed(2)} hrs</Text>
                  <Text style={styles.box4Text2}>
                    Break stones        : {(stoneEffort ?? 0).toFixed(2)} hrs
                  </Text>
                </View>
              </View>
            </View>

            {/* section 4 */}
            <View style={styles.box3}>
              <View style={styles.inner}>
                <Text style={styles.innertopText}>Results based on</Text>

                <View>
                  <View style={styles.innercenter}>
                    <View style={styles.innersquareleft}>
                      <MaterialCommunityIcons
                        name="account-hard-hat"
                        size={25}
                        color="#65676B"
                      />
                      <Text style={styles.LeftText}>Labors               :</Text>
                    </View>
                    <View style={styles.innersquareright}>
                      <Text style={styles.RightText}>{laborCount}</Text>
                    </View>
                  </View>

                  <View style={styles.innercenter}>
                    <View style={styles.innersquareleft}>
                      <MaterialCommunityIcons
                        name="shovel"
                        size={25}
                        color="#65676B"
                      />
                      <Text style={styles.LeftText}>Machinery         :</Text>
                    </View>
                    <View style={styles.innersquareright1}>
                      {data1.map((machine, index) => (
                        <Text key={index} style={styles.RightText}>
                          {machine}
                        </Text>
                      ))}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.bottom}>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{
                    height: 40,
                    marginTop: 145,
                    borderRadius: 18,
                    borderColor: "red", // Add this line for the border color
                    borderWidth: 1, // Ensure the border is visible by setting the borderWidth
                  }}
                  mode="elevated"
                  onPress={print}
                  labelStyle={{ color: "red", fontSize: 14 }}
                  icon={() => (
                    <MaterialCommunityIcons
                      name="content-save-outline"
                      size={20}
                      color="red"
                    />
                  )}
                >
                  Save As PDF
                </Button>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{
                    height: 40,
                    marginTop: 145,
                    borderRadius: 18,
                    borderColor: "#007BFF",
                    borderWidth: 1,
                  }}
                  mode="elevated"
                  onPress={printToFile}
                  labelStyle={{ color: "#007BFF", fontSize: 14 }}
                  icon={() => (
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={20}
                      color="#007BFF"
                    />
                  )}
                >
                  Share PDF
                </Button>
              </View>
            </View>
            <Button
              style={{
                height: 40,
                marginTop: 15,
                borderRadius: 18,
                width: "87%",
                backgroundColor: "#007BFF",
                borderColor: "black", // Add this line for the border color
                borderWidth: 0.2, // Ensure the border is visible by setting the borderWidth
              }}
              mode="contained-tonal"
              onPress={backToHome}
              labelStyle={{ fontSize: 14, color: "white" }}
              icon={() => (
                <MaterialCommunityIcons
                  name="home-import-outline"
                  size={20}
                  color="white"
                />
              )}
            >
              Back To Template View
            </Button>
          </View>
        </ScrollView>
      )}
    </PaperProvider>
  );
}
