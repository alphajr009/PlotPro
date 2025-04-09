import React from "react";
import {
  Text,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation} from "@react-navigation/native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

import { styles } from "./FencedetailfromManualStyles";
import Headersection from "../../../components/Headersection";
import CustomButton from "../../../components/CustomButton";
import  {getFenceDetailsHtml}  from "./fenceDetailPrint";

export default function FencedetailfromManual({ route }) {

  const navigation = useNavigation();

  const {FenceTypeselectedValue,inputValuePostspace,PostSpaceUnitselectedValue,displayValues,perimeter,area,NumberofSticks} = route.params;
 
  

// html file to be printed
const html = getFenceDetailsHtml(FenceTypeselectedValue, NumberofSticks, inputValuePostspace, PostSpaceUnitselectedValue, displayValues);


  /*print*/
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
    
  };

  const printToFile = async () => {
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
      <Headersection navigation={navigation} title="Fence Details" />

      {/* Top section */}
      <ScrollView contentContainerStyle={styles.scrollContent}>


        <View style={styles.top}>
     
          <View style={styles.box1}>
            <Text style={styles.titleText}>Total posts / Sticks</Text>
            <View style={styles.propertyBox}>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="format-align-justify"
                  size={36}
                  color="#65676B"
                  rotation={270}
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Total Amount</Text>
                  <Text style={styles.propertyValue}>
                    {NumberofSticks} Stick
                  </Text>
                </View>
              </View>
              <View style={styles.property}>
                <MaterialCommunityIcons
                  name="format-line-spacing"
                  size={36}
                  color="#65676B"
                  rotation={270}
                />
                <View style={styles.propertyDetails}>
                  <Text style={styles.propertyLabel}>Post Gap</Text>
                  <Text style={styles.propertyValue}>
                    {inputValuePostspace} {PostSpaceUnitselectedValue}{" "}
                  </Text>
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
                <Text style={styles.Box2PropertyValue}>{parseFloat(area).toFixed(2)} perch</Text>
              </View>
            </View>
          </View>

          {/* Third section */}

          <View style={styles.box3}>
            <Text style={styles.innertopText}>Result based on</Text>

            <View style={styles.innercenter}>
              <View style={styles.innersquareleft}>
                <MaterialCommunityIcons name="gate" size={36} color="#65676B" />
                <Text style={styles.perimeterText}>Fence Type :</Text>
              </View>
              <View style={styles.innersquareright}>
                <Text style={styles.perimeterText}>{FenceTypeselectedValue}</Text>
              </View>
            </View>

            <View style={styles.innercenter}>
              <View style={styles.innersquareleft}>
                <MaterialCommunityIcons
                  name="boom-gate"
                  size={36}
                  color="#65676B"
                />
                <Text style={styles.perimeterText}>Gates           :</Text>
              </View>
              <View style={styles.innersquareright1}>
                {displayValues.map((value, index) => (
                  <Text key={index}>{value}</Text>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Bottom section */}

        <View style={styles.bottom}>
          <CustomButton
            onPress={print}
            text="Save a PDF"
            iconName="content-save-outline"
            iconColor="white" 
            buttonColor="#E41E3F"
          />

          <CustomButton
            onPress={printToFile}
            text="Share As PDF"
            iconName="share-variant"
            iconColor="white" 
            buttonColor="#007BFF" 
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

