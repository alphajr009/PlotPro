import * as React from "react";
import { Text, View, StatusBar, Image, Alert } from "react-native";
import { Appbar, TextInput } from "react-native-paper";
import { styles } from "./SaveScreenStyles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { errorUtils } from "../../../common.app";
import AxiosInstance from "../../../AxiosInstance";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const CustomPerimeterIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="vector-square"
    size={responsiveFontSize(3.7)}
    color="grey"
  />
);
const CustomAreaIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="texture-box"
    size={responsiveFontSize(3.7)}
    color="grey"
  />
);

const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );
    const data = await response.json();
    if (data.address) {
      const city =
        data.address.city || data.address.town || data.address.village;
      const country = data.address.country;
      return `${city}, ${country}`;
    }
    return "Location not found";
  } catch (error) {
    console.error("Error during reverse geocoding:", error);
    return "Error getting location";
  }
};

const truncateLocation = (location, maxLength = 25) => {
  if (location.length <= maxLength) return location;
  const [city, country] = location.split(", ");
  const truncatedCountry =
    country.slice(0, maxLength - city.length - 5) + "...";
  return `${city}, ${truncatedCountry}`;
};
export function SaveScreen({ navigation, route }) {
  const {
    area: initialArea,
    perimeter: initialPerimeter,
    locationPoints,
    imageUrl,
  } = route.params;
  const [perimeter, setPerimeter] = React.useState(
    parseFloat(initialPerimeter).toFixed(2)
  );
  const [area, setArea] = React.useState(parseFloat(initialArea).toFixed(2));
  const [templateName, setTemplateName] = React.useState("");
  const [measureName, setMeasureName] = React.useState("");
  const [landType, setLandType] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [descriptionText, setDescriptionText] = React.useState("");

  React.useEffect(() => {
    const getLocation = async () => {
      if (locationPoints && locationPoints.length > 0) {
        const [firstPoint] = locationPoints;
        const locationName = await reverseGeocode(
          firstPoint.latitude,
          firstPoint.longitude
        );
        setLocation(truncateLocation(locationName));
      }
    };
    getLocation();
  }, [locationPoints]);

  const onSaveButtonPress = () => {
    if (
      !templateName.trim() ||
      !measureName.trim() ||
      !landType.trim() ||
      !location.trim() ||
      !descriptionText.trim()
    ) {
      Alert.alert(
        "Incomplete Information",
        "Please fill all the fields before saving.",
        [{ text: "OK" }]
      );
      return;
    }
    console.log("pressed save");
    const dataItem = {
      perimeter: perimeter,
      area: area,
      templateName: templateName,
      measureName: measureName,
      landType: landType,
      location: location,
      description: descriptionText,
      locationPoints: locationPoints,
      imageUrl: imageUrl,
    };
    console.log(dataItem);

    AxiosInstance.post("/api/auth/mapTemplate/saveTemplate", dataItem)
      .then((response) => {
        console.log("data saved");
        console.log(response.data);
        navigation.navigate("SavedTemplatesScreen");
      })
      .catch((error) => {
        console.error(errorUtils.getError(error));
      });
  };
  return (
    <View>
      <StatusBar barStyle={"light-content"} backgroundColor={"#007BFF"} />
      <Appbar.Header style={styles.top_Bar_Whole} statusBarHeight={0}>
        <View style={styles.top_Bar_View}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View>
              <Text style={styles.top_Text_Styling}>Cancel</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onSaveButtonPress}>
            <View>
              <Text style={styles.top_Text_Styling}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Appbar.Header>

    
      <ScrollView>
        <View style={styles.low_outer}>
          <View style={[styles.inner_View, styles.inner_View_01]}>
            <View style={styles.inner_View_01_inner}>
              <View style={styles.row_01}>
                <Text style={styles.bold_text}>Land Info</Text>
              </View>
              <View style={styles.row_02}>
                <View style={styles.row_02_col_02}>
                  <View style={styles.col_02_col_01}>
                    <CustomPerimeterIcon />
                  </View>
                  <View style={styles.area_col_styling}>
                    <Text style={styles.area_text_styling}>Perimeter</Text>
                    <Text style={styles.bold_text}> {perimeter}km</Text>
                  </View>
                </View>
                <View style={styles.row_02_col_02}>
                  <View style={styles.col_02_col_01}>
                    <CustomAreaIcon />
                  </View>
                  <View style={styles.area_col_styling}>
                    <Text style={styles.area_text_styling}>Area</Text>
                    <Text style={styles.bold_text}> {area} perches</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.inner_view_02_inner}>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Template Name :</Text>
                <TextInput
                  style={styles.input_text}
                  value={templateName}
                  onChangeText={(text) => setTemplateName(text)}
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Measure Name :</Text>
                <TextInput
                  style={styles.input_text}
                  value={measureName}
                  onChangeText={(text) => setMeasureName(text)}
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Location :</Text>
                <TextInput
                  style={styles.input_text}
                  value={location}
                  onChangeText={(text) => setLocation(truncateLocation(text))}
                />
              </View>
              <View style={styles.input_view}>
                <Text style={styles.bold_text}>Land Type :</Text>
                <TextInput
                  style={styles.input_text}
                  value={landType}
                  onChangeText={(text) => setLandType(text)}
                />
              </View>
            </View>
            <View style={styles.inner_view_03}>
              <Text style={styles.bold_text1}>Description:</Text>

              <TextInput
                placeholder="Type here..."
                value={descriptionText}
                onChangeText={(text) => setDescriptionText(text)}
                multiline={true}
                numberOfLines={6}
                style={styles.description_input}
                underlineColor="transparent"
              />
            </View>
            {/* <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.base64Image} />
            </View> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default SaveScreen;
