import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    Alert,
    IconButton,
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
  import { styles } from "./EffortOutputFromManualCalculatorStyles";
  import Headersection from "../../components/Headersection";
  import AlertButton from "../../components/AlertButton";
  import CustomButton from "../../components/CustomButton";
  import EffortAlert from "../ClearLand/AlertButtonEffort";
  import axios from "axios";
  import AxiosInstance from "../../AxiosInstance";
  import { effortOutputManualPrint } from "./EffortOutputFromManualCalculatorPrint";
  
  export default function EffortOutputFromManualCalculator({ route }) {
    const {
        area,
        perimeter,
        weedEffort,
        plantEffort,
        stoneEffort,
        effort,
        workHours,
        workDays,
        laborCount,
        displayValues2,
    } = route.params;
    const navigation = useNavigation();
    console.log("Area", area, "Perimeter", perimeter, "Effort", effort, "WorkHours", workHours, "WorkDays", workDays, "LaborCount", laborCount, "DisplayValues2", displayValues2);
  
    //back to home function
    const BackToHome = () => {
      navigation.navigate("Home");
    };
  
    //Generate pdf
    const html = effortOutputManualPrint(perimeter, area, laborCount, workHours,effort);
  
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
        <Headersection
          navigation={navigation}
          title="Effort Output"
        ></Headersection>
  
        <ScrollView>
          <View style={styles.container2}>
            <Card style={styles.card1}>
              <Card.Content style={styles.card1Content}>
                <Text style={styles.card1Text1}>Total Effort Cout</Text>
                <AlertButton></AlertButton>
                <View style={styles.card1Left}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(1.6),
                      marginTop: responsiveHeight(0.4),
                    }}
                    source={require("../../../assets/Clock.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card1Text2}>Total Hours</Text>
                    <Text style={styles.card1Text3}>{effort}</Text>
                  </View>
                </View>
  
                <View style={styles.card1Right}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(45),
                      marginTop: responsiveHeight(-5),
                    }}
                    source={require("../../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card1Text4}>{workHours} hrs per day</Text>
                    <Text style={styles.card1Text5}>{workDays} days</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
  
            <Card style={styles.card2}>
              <Card.Content style={styles.card2Content}>
                <View style={styles.card2Left}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(3),
                      marginTop: responsiveHeight(4.5),
                    }}
                    source={require("../../../assets/Perimeter.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card2Text1}>Perimeter</Text>
                    <Text style={styles.card2Text2}>{perimeter} km</Text>
                  </View>
                </View>
  
                <View style={styles.card2Right}>
                  <Image
                    style={{
                      marginLeft: responsiveWidth(50),
                      marginTop: responsiveHeight(-5),
                    }}
                    source={require("../../../assets/Calendar.png")}
                  ></Image>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={styles.card2Text4}>{area} m²</Text>
                    <Text style={styles.card2Text3}>Area</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            <View style={styles.box4}>
              <View style={styles.box4Header}>
              <Text style={styles.innertopText}>Effort Values</Text>
              <EffortAlert></EffortAlert>
              </View>
              <View style={styles.box4inner}>
              <View style={styles.box4Inner}>
                <Text style={styles.box4Text}>Remove weeds     :   {Math.ceil(weedEffort)} hrs</Text>
                <Text>Cut trees                :   {Math.ceil(plantEffort)} hrs</Text>
                <Text style={styles.box4Text2}>Break stones         :   {Math.ceil(stoneEffort)} hrs</Text>
                </View>
              </View>
            </View>
  
            <Card style={styles.card3}>
              <Card.Content style={{ display: "flex", flexDirection: "colum" }}>
                <Text style={styles.card3Text1}>Result Based on</Text>
  
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="account-hard-hat"
                    size={20}
                    color="#65676B"
                    marginLeft={20}
                    marginTop={23}
                  />
  
                  <Text style={styles.card3Text2}>Labors :</Text>
                  <Text style={styles.card3Text3}>{laborCount}</Text>
                </View>
  
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="excavator"
                    size={20}
                    color="#65676B"
                    marginLeft={20}
                    marginTop={24}
                  />
                  <View style={{ marginTop: responsiveHeight(3.5) }}>
                    <Text style={styles.card3Text4}>Machinery :</Text>
  
                    <View
                      style={{
                        marginTop: responsiveHeight(-2.7),
                        marginLeft: responsiveWidth(25),
                      }}
                    >
                      {displayValues2.map((machine, index) => (
                        <Text key={index}>{machine}</Text>
                      ))}
                    </View>
                  </View>
                </View>
              </Card.Content>
            </Card>
  
            <View style={styles.customButtons}>
              <CustomButton
                onPress={print}
                text="Save As PDF"
                iconName="content-save-outline" // Change the icon name as needed
                iconColor="white" // Change the color of the icon
                buttonColor="#E41E3F" // Change the background color of the button
              />
  
              <CustomButton
                onPress={printToFile}
                text="Share PDF"
                iconName="share-variant" // Change the icon name as needed
                iconColor="white" // Change the color of the icon
                buttonColor="#007BFF" // Change the background color of the button
              />
            </View>
          </View>
        </ScrollView>
      </PaperProvider>
    );
  }
  