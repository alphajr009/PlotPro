import React, { useState } from "react";
import { View, Image, Text, ScrollView, StatusBar } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Appbar, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./EditTemplateStyle";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import AxiosInstance from "../../../AxiosInstance";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "green",
    accent: "red",
  },
};

const PerimeterIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="crop"
    size={responsiveFontSize(3)}
    color="grey"
  />
);

const AreaIcon = (props) => (
  <MaterialCommunityIcons
    {...props}
    name="dice-4-outline"
    size={responsiveFontSize(3)}
    color="grey"
  />
);

const EditTemplate = ({ route, navigation }) => {
  const { item } = route.params;

  const [measureName, setMeasureName] = useState(item.measureName);
  const [landType, setLandType] = useState(item.landType);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    if (
      measureName !== item.measureName ||
      landType !== item.landType ||
      description !== item.description
    ) {
      AxiosInstance.put(`/api/auth/mapTemplate/updateTemplate/${item._id}`, {
        measureName: measureName,
        landType: landType,
        description: description,
      })
        .then((response) => {
          alert("Template updated");
          navigation.navigate("SavedTemplatesScreen");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigation.navigate("SavedTemplatesScreen");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={"light-content"} />
      <Appbar.Header style={styles.top_Bar_Whole}>
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
          <TouchableOpacity onPress={handleSave}>
            <View>
              <Text style={styles.top_Text_Styling}>Save</Text>
            </View>
          </TouchableOpacity>
        </View>
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollViewCenter}
        style={styles.scrollViewStyle}
      >
        <View style={styles.low_outer}>
          <View style={styles.imageView}>
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.imageStyling}
            />
          </View>
          <MaterialCommunityIcons
            name="square-edit-outline"
            size={responsiveFontSize(3)}
            style={styles.editIconStyle}
            color="#65676B"
            onPress={() => {
              navigation.navigate("ResizeMap", {
                templateId: item._id,
              });
            }}
          />

          {/* info_block */}
          <View style={styles.infoBlock}>
            <View style={styles.rowView}>
              <View>
                <View style={styles.blockView}>
                  <PerimeterIcon />
                  <View style={styles.textView}>
                    <Text style={styles.text01Styling}>Perimeter</Text>
                    <Text style={styles.text02Styling}>
                      {parseFloat(item.perimeter).toFixed(2)} km
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={styles.blockView}>
                  <AreaIcon />
                  <View style={styles.textView}>
                    <Text style={styles.text01Styling}>Area</Text>
                    <Text style={styles.text02Styling}>
                      {parseFloat(item.area).toFixed(2)} acres
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* input fields */}
          <View style={styles.inputBlock}>
            <Text stye={styles.text02Styling}>Measure Name :</Text>
            <TextInput
              value={measureName}
              onChangeText={setMeasureName}
              backgroundColor="white"
              style={styles.textInput}
              activeUnderlineColor="black"
            />
          </View>
          <View style={styles.inputBlock}>
            <Text stye={styles.text02Styling}>Land Type :</Text>
            <TextInput
              value={landType}
              onChangeText={setLandType}
              backgroundColor="white"
              activeUnderlineColor="black"
              style={styles.textInput02}
            />
          </View>
          {/* Description block */}
          <View style={styles.descriptionBlock}>
            <Text style={styles.text01Styling}>Description</Text>
            <View style={styles.subTextOuter}>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.descriptionInput}
                multiline={true}
                numberOfLines={4}
                outlineColor="black"
                activeUnderlineColor="black"
                theme={{ colors: { primary: "black" } }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditTemplate;
