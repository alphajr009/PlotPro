import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import Headersection from "../../components/Headersection";

import {styles} from './FertilizingDetailsStyles';
import { Button } from "react-native-paper";

export default function FertilizationDetails({ route }) {
  const { params } = route;
  const { FertilizerType, NumberOfTime, FertilizerAmount, FertilizerAmountUnit, SelectedButton,count,plantcount,area,perimeter} = params;
  const [factorValue, setFactor] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [Total,setTotal] = useState(0);

  useEffect(() => {
    console.log("in Fertilization details screen", FertilizerType, NumberOfTime, FertilizerAmount, FertilizerAmountUnit, SelectedButton,plantcount);
    let factorValue = 1;
    switch (SelectedButton) {
      case "Daily":
        factorValue = 365;
        break;
      case "Weekly":
        factorValue = 48; 
        break;
      case "Monthly":
        factorValue = 12;
        break;
      case "Quarter":
        factorValue = 4;
        break;
      case "Yearly":
        factorValue = 1;
        break;
      default:
        factorValue = 1;
    }
    setFactor(factorValue);
    setTotalAmount(NumberOfTime * FertilizerAmount * factorValue);

    
  }, []);

  useEffect(() =>{
    setTotal((plantcount*totalAmount));
  })





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
              border-radius: 12px; /* Corrected typo */
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

          <h2>Fertilizing Details</h2>

          <ul>
          <li> Total Amount Of Fertilizer= ${totalAmount} ${FertilizerAmountUnit}</li>
          
          <li> Fertilizer Application Frequency = ${NumberOfTime} Times ${SelectedButton} </li>
          <li> Fertilizer Type = ${FertilizerType} </li>
          <li> Fertilizer Amount Per Application = ${FertilizerAmount}${FertilizerAmountUnit}</li>
          <li> How Often = ${SelectedButton} </li>
          
          </ul>

      </div>
  </body>
  </html>
  
`;

  
const navigation = useNavigation();
  const handleFertilizationDetails = () => {
    navigation.navigate("Fence");
  };

  const backToHome = () => {
    navigation.navigate("Home");
  };


  /*print*/

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
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
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
      <Headersection navigation={navigation} title="Fertilizing Details" />

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.top}>
          {/* Top section */}
          <View style={styles.box1}>
            <Text style={styles.titleText}>Total Amount of Fertilizing</Text>
            <View style={styles.propertyBox}>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="flask-outline"
                  size={40}
                  color="#65676B"
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Per plant</Text>
                  <Text style={styles.propertyValue}>{totalAmount} {FertilizerAmountUnit} </Text>
                </View>
              </View>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="pine-tree"
                  size={40}
                  color="#65676B"
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>For plantation</Text>
                  <Text style={styles.propertyValue}>{Total} {FertilizerAmountUnit}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Second section */}

          <View style={styles.box2}>
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
                <Text style={styles.Box2PropertyLabel}>Area</Text>
                <Text style={styles.Box2PropertyValue}>{parseFloat(area).toFixed(2)} Perch</Text>
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
                    <Text style={styles.LeftText}>Fertilizer Type:</Text>
                  </View>
                  <View style={styles.innersquareright}>
                    <Text style={styles.RightText}>{FertilizerType}</Text>
                  </View>
                </View>

             
                <View style={styles.innercenter}>
                  <View style={styles.innersquareleft}>
                  <MaterialCommunityIcons
                  name="timer-sand"
                  size={30}
                  color="#65676B"
                />
                    <Text style={styles.LeftText}>No Of Times   :</Text>
                  </View>
                  <View style={styles.innersquareright}>
                    <Text style={styles.RightText}>{NumberOfTime +" Times"}</Text>
                  </View>
                </View>

                <View style={styles.innercenter}>
                  <View style={styles.innersquareleft}>
                    <MaterialCommunityIcons
                      name="apps"
                      size={30}
                      color="#65676B"
                    />
                    <Text style={styles.LeftText}>How often      :</Text>
                  </View>
                  <View style={styles.innersquareright}>
                    <Text style={styles.RightText}>{SelectedButton}</Text>
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
                backgroundColor:"#007BFF",
                borderColor: "black",
                borderWidth: 0.2, // Ensure the border is visible by setting the borderWidth
              }}
              mode="contained-tonal"
              onPress={backToHome}
              labelStyle={{  fontSize: 14 , color:"white"}}
              icon={() => (
                <MaterialCommunityIcons
                  name="home-import-outline"
                  size={20}
                  color="white"
                />
              )}
            >
              Back To Home
            </Button>
          </View>
      </ScrollView>



    </KeyboardAvoidingView>
  );
}

