import {
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Print from "expo-print";
import { Appbar, Button } from "react-native-paper";
import { shareAsync } from "expo-sharing";
import { styles } from "./PlantationDetailsStyles";
import AxiosInstance from "../../AxiosInstance";

export default function PlantationDetails({ route }) {
  const { id, item } = route.params;
  const [numberOfPlants, setnumberOfPlants] = useState(null);
  const [PlantationDensity, setPlantDensity] = useState(null);
  const [textPlant, setTextPlant] = useState(textPlant);
  const [selectedValue, setSelectedValue] = useState(null);
  const [textplantspace, setTextPlantSpace] = useState(null);
  const [textRowspace, setTextRowSpace] = useState(null);
  const [area, setArea] = useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async (id) => {
    try {
      const response = await AxiosInstance.get(
        `/api/plantation/numberOfPlants/${id}`
      );
      setnumberOfPlants(response.data.numberOfPlants);
      setPlantDensity(response.data.PlantDensity);
      setTextPlant(response.data.PlnatType);
      setSelectedValue(response.data.Unit);
      setTextPlantSpace(response.data.plantspace);
      setTextRowSpace(response.data.rowSpace);
      setArea(response.data.area);
      setPerimeter(response.data.perimeter);
      setLoading(false);
      console.log("numberOfPlants:", response.data.numberOfPlants);
      console.log("PlantDensity:", response.data.PlantDensity);
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

  const PlantationDelete = async (id) => {
    try {
      const response = await AxiosInstance.delete(
        `/api/plantation/deletePlantation/${id}`
      );
      console.log(response);
      return response;
    } catch (error) {
      // Log the detailed error response
      console.error(
        "Error deleting Plantation:",
        error.response ? error.response.data : error.message
      );
      throw error; // Re-throw the error to handle it in the caller function
    }
  };

  // edit button pressed function
  const handleEditIconPress = () => {
    Alert.alert(
      "Update Data",
      "Do you want to update data?",
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
              await PlantationDelete(id);
              navigation.navigate("Plantation", {
                id: id,
                area: area,
                perimeter: perimeter,
                item: item,
              });
            } catch (error) {
              const errorMessage = error.response
                ? error.response.data.message
                : error.message;
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const backToHome = () => {
    navigation.navigate("Home");
  };

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App Details</title>
        <style>
            body {
                /* font-family: Arial, sans-serif; */
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 800px;
                margin: 10px auto;
                padding: 20px;
                border: 5px solid #ccc;
            }
    
            .logo-container {
                display: flex;
                align-items: center;
                background-color: #fff;
            }
    
            .App-logo {
                margin-left: 5px;
            }
    
            .logo-text {
                margin-left: 70px;
                margin-top: 40px;
                color: #007BFF;
                font-size: 40px;
                /* font-family: Product Sans; */ /* You need to import Product Sans if it's a custom font */
                font-family: sans-serif; /* Fallback font */
            }
  
            Description-text1 {
              margin-top: 50px;
            }
    
            .Description-text {
                width: 100%;
                border-radius: 12px; /*Corrected typo*/
            }
    
            .logo {
                max-width: 150px;
                margin-bottom: 20px;
            }
            h1, p {
                margin: 10px 0;
          
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo-container">
                <img class="App-logo" src="https://s3-alpha-sig.figma.com/img/0402/a49c/79d6086f4997c8eeba9d160fa7b869ed?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bT1vIy5S2dJUVkDABMFzScUJX5Iws21riRotOmacpZl1bhA8yPqJLJNeF5-wc8kBpk4jyD81fp-8bBYVTVwO6cplKgVuos2HMwvvf3vA5yh0td6H5z5AqoKTIcV8sy6pPF9DsiJmzHLRn5QjfYk~o8ow0bxsqErV5jJfH1S4~4yDdn6O54pXqPBjgydtWdDEhlCUXmzQo1ZozcGTapshAhnzm3YNdYd5leb1AwnPhuURNJ7YO80jOE3QN3pqNxv2XESHYnKDOilaPqvuVKVTyG3AV2mxdnyg-U8iEkRBgQJNDH0YjrWMKTRb3GatXSa5KVA9zQDL5JLoTn9DOvqa-Q__" alt="Your App Logo" class="logo" width="130">
                <h1 class="logo-text">Field Master</h1>
            </div>
            <h2 class="Description-text1">Description</h2>
            <div class="Description-text">
                <p>Welcome to FieldMaster, your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.</p>
            </div>
            <h2>Map Information</h2>
            <ul>
                <li>Perimeter = 1.5 km</li>
                <li>Area = 100 accres</li>
            </ul>
  
            <h2>Plantation Details</h2>
  
            <ul>
            <li>Total plants = 200 </li>
            <li>Density = 30 </li>
            <li> plat type = ${textPlant}</li>
            <li> Plant Space = ${textplantspace} </li>
            <li> Row Space = ${textRowspace} </li>
            <li> Plant count = ${numberOfPlants}</li>
            <li> Plant Density = ${PlantationDensity}</li>
            <ul>
            
            </ul></li>
            
            </ul>
  
        </div>
    </body>
    </html>
    
    
  
  `;

  const navigation = useNavigation();
  const handleFertilization = () => {
    navigation.navigate("Fertilization", {
      numberOfPlants: numberOfPlants,
      PlantationDensity: PlantationDensity,
      plantType: textPlant,
      perimeter:perimeter,
      area:area

    });
    console.log(
      "sending" + numberOfPlants + " " + PlantationDensity + " " + textPlant
    );
  };

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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "margin"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
    >
      {/* Static section at the top */}
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />

      {/*Header section*/}
      <Appbar.Header style={styles.top_Bar} dark={true} mode="center-aligned">
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
            color = "white";
          }}
        />

        <Text style={styles.headerText}>Plantation Details</Text>

        {/* pencil/ pen icon  */}
        <TouchableOpacity onPress={handleEditIconPress}>
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.top}>
            {/* <AlertButton></AlertButton> */}
            {/* Top section */}
            <View style={styles.box1}>
              <Text style={styles.titleText}>Total Plants</Text>
              <View style={styles.propertyBox}>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="grass"
                    size={40}
                    color="#65676B"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Plants count</Text>
                    <Text style={styles.propertyValue}>{numberOfPlants}</Text>
                  </View>
                </View>
                <View style={styles.property}>
                  <MaterialCommunityIcons
                    name="square-opacity"
                    size={40}
                    color="#65676B"
                  />
                  <View style={styles.propertyDetails}>
                    <Text style={styles.propertyLabel}>Density</Text>
                    <Text style={styles.propertyValue}>
                      {PlantationDensity}/m{"\u00B2"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Second section */}

            <View style={styles.box2}>
              <View style={styles.box2Inner}>
                <View style={styles.box2Property}>
                  <MaterialCommunityIcons
                    name="vector-square"
                    size={36}
                    color="#65676B"
                  />
                  <View style={styles.box2PropertyDetails}>
                    <Text style={styles.Box2PropertyLabel}>Perimeter</Text>
                    <Text style={styles.Box2PropertyValue}>{parseFloat(perimeter).toFixed(2)} km</Text>
                  </View>
                </View>
                <View style={styles.box2Property}>
                  <MaterialCommunityIcons
                    name="texture-box"
                    size={36}
                    color="#65676B"
                  />
                  <View style={styles.box2PropertyDetails}>
                    <Text style={styles.Box2PropertyLabel}>Area </Text>
                    <Text style={styles.Box2PropertyValue}>{parseFloat(area).toFixed(2)} Perch</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Third section */}

            <View style={styles.box3}>
              <View style={styles.inner}>
                <Text style={styles.innertopText}>Results based on</Text>

                <View style={styles.center}>
                  <View style={styles.innercenter}>
                    <View style={styles.innersquareleft}>
                      <MaterialCommunityIcons
                        name="sprout"
                        size={30}
                        color="#65676B"
                      />
                      <Text style={styles.LeftText}>Plant :</Text>
                    </View>
                    <View style={styles.innersquareright}>
                      <Text style={styles.RightText}>{textPlant}</Text>
                    </View>
                  </View>

                <View style={styles.innercenter}>
                  <View style={styles.innersquareleft}>
                    <MaterialCommunityIcons
                      name="apps"
                      size={30}
                      color="#65676B"
                    />
                    <Text style={styles.LeftText}>Plant Spaing  :</Text>
                  </View>
                  <View style={styles.innersquareright}>
                    <Text style={styles.RightText}>{textplantspace} m</Text>
                  </View>
                </View>

                <View style={styles.innercenter}>
                  <View style={styles.innersquareleft}>
                    <MaterialCommunityIcons
                      name="format-line-spacing"
                      size={30}
                      color="#65676B"
                    />
                    <Text style={styles.LeftText}>Row Spaing    :</Text>
                  </View>
                  <View style={styles.innersquareright}>
                    <Text style={styles.RightText}>{textRowspace} m</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

          {/* Bottom section */}
          <View style={styles.bottom}>
            
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  style={{
                    height: 40,
                    marginTop: 10,
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
                    marginTop: 10,
                    borderRadius: 18,
                    borderColor: "#007BFF", // Add this line for the border color
                    borderWidth: 1, // Ensure the border is visible by setting the borderWidth
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
                marginTop: 10,
                borderRadius: 18,
                width: "87%",
                borderColor: "white",
                borderWidth: 1,
                backgroundColor: "#007BFF",
                color: "white",
              }}
              mode="contained-tonal"
              onPress={handleFertilization}
              labelStyle={{ color: "white", fontSize: 15 }}
              icon={() => (
                <MaterialCommunityIcons
                  name="flask-outline"
                  size={20}
                  color="white"
                />
              )}
            >
              Fertilizing
            </Button>

          </View>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
