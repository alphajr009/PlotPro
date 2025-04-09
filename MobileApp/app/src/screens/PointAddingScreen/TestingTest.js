/* this is the PointAddingScreen before */
import React, { useEffect, useState, useRef } from "react";
import { Polygon } from "react-native-maps";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { TextInput, Alert } from "react-native";
import { Polyline } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { polygon, area, length } from "@turf/turf";
import {
  faLayerGroup,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styles } from "./PointAddingScreenStyles";
import MapView, { MAP_TYPES } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { captureRef } from "react-native-view-shot";
import axios from "axios";

const PointAddingScreen = ({ navigation, route }) => {
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [isPolygonComplete, setIsPolygonComplete] = useState(false);
  const [region, setRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const mapRef = React.useRef(null);
  const viewShotRef = useRef(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
        const city = addressComponents.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_2")
        );
        const country = addressComponents.find((component) =>
          component.types.includes("country")
        );
        if (city && country) {
          return `${city.long_name}, ${country.long_name}`;
        }
      }
      return "";
    } catch (error) {
      console.error("Error getting location name:", error);
      return "";
    }
  };

  const uploadToImgbb = async (imageUri) => {
    const apiKey = "a08fb8cde558efecce3f05b7f97d4ef7";
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: "map_image.jpg",
    });

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Error uploading image to imgbb:", error);
      throw error;
    }
  };

  /* the closeModal function is used to close the modal */
  const closeModal = () => {
    setModalVisible(false);
  };
  /* the selectMapType function is used to select the map type */
  const selectMapType = (index) => {
    setMapTypeIndex(index);
    setShowDropdown(false);
  };
  /* the focusOnCurrentLocation function is used to focus on the current location of the user */
  const focusOnCurrentLocation = () => {
    setSearchedLocation(null);
    setShowCurrentLocation((prevShowCurrentLocation) => {
      const newShowCurrentLocation = !prevShowCurrentLocation;
      if (newShowCurrentLocation && currentLocation && mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.0005,
          longitudeDelta: 0.0005,
        });
        setShowUserLocation(true); // Set showUserLocation to true
      }
      return newShowCurrentLocation;
    });
  };
  /* in this useEffect the current location of the user is fetched */
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      /* the current location is set to the MapView */
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      });
      setCurrentLocation(location);
      setLoading(false);
    })();
  }, []);

  /* the handleClearPoints function is used to clear the current locationPoints */
  const handleClearPoints = () => {
    setPoints([]);
    setIsPolygonComplete(false);
  };
  /* the handleCompleteMap function is used to complete the map */
  const handleCompleteMap = () => {
    if (points.length > 2) {
      setIsPolygonComplete(true);
    } else {
      alert("You need at least 3 points to complete a polygon");
    }
  };
  /* the handleUndoLastPoint function is used to undo the last point */
  const handleUndoLastPoint = () => {
    if (points.length > 0) {
      setPoints(points.slice(0, -1));
    }
  };
  /* the handleSaveMap function is used to save the map */
  const handleSaveMap = async () => {
    try {
      setIsSaving(true);
      if (points.length < 3) {
        alert("You need at least 3 points to calculate area and perimeter");
        setIsSaving(false);
        return;
      }

      let imageUrl = "";
      if (mapRef.current) {
        const uri = await captureRef(mapRef.current, {
          format: "jpg",
          quality: 0.3,
        });
        console.log("Captured image URI:", uri);
        imageUrl = await uploadToImgbb(uri);
        console.log("Uploaded image URL:", imageUrl);
      }

      const formattedPoints = points.map((point) => [
        point.longitude,
        point.latitude,
      ]);
      formattedPoints.push(formattedPoints[0]);

      const poly = polygon([formattedPoints]);
      const areaMeters = area(poly);
      const perimeterMeters = length(poly, { units: "meters" });
      const areaPerches = areaMeters / 25.29285264;
      const perimeterKilometers = perimeterMeters / 1000;
      setIsSaving(false);

      Alert.alert(
        "Confirmation",
        `Area: ${areaPerches.toFixed(2)} perches, Perimeter: ${perimeterKilometers.toFixed(2)} kilometers`,
        [
          {
            text: "Cancel",
            onPress: () => setPoints([]),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("SaveScreen", {
                locationPoints: points,
                area: areaPerches,
                perimeter: perimeterKilometers,
                imageUrl,
              });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error("Error saving map:", error);
      alert("An error occurred while saving the map. Please try again.");
      setIsSaving(false);
    }
  };

  /* the handleSetMapType function is used to set the map type in the react native map*/
  const handleSetMapType = (type) => {
    setMapType(type);
    setModalVisible(false);
  };

  /* the handleCancel function is used to navigate to the home screen */
  const handleCancel = () => {
    navigation.navigate("Home");
  };
  const mapTypes = [
    { name: "Satellite", value: "satellite" },
    { name: "Standard", value: "standard" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

  /* the toggleMapType function is used to toggle the map type */
  const toggleMapType = () => {
    setShowDropdown(!showDropdown);
  };
  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  /* the searchLocation function is used to search for a location */
  const searchLocation = async () => {
    if (searchQuery) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            searchQuery
          )}&key=AIzaSyB61t78UY4piRjSDjihdHxlF2oqtrtzw8U`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setShowCurrentLocation(false); // Hide current location
          setSearchedLocation({ latitude: lat, longitude: lng });
          if (mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            });
          }
        } else {
          console.error("Location not found");
        }
      } catch (error) {
        console.error("Error searching for location:", error);
      }
    }
  };

  /* the clearSearchQuery function is used to clear the search query */
  const clearSearchQuery = () => {
    setSearchQuery("");
  };

  return (
    <>
      {loading ? (
        <View style={styles.loadingScreen}>
          <View style={styles.dotsWrapper}>
            <ActivityIndicator color="#007BFF" size={45} />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.searchbar}>
            <View style={styles.locationIconContainer}>
              <MaterialIcons
                name="location-on"
                size={responsiveFontSize(2.5)}
                color="#007BFF"
              />
            </View>
            <TextInput
              placeholder="Search Location"
              placeholderTextColor="rgba(0, 0, 0, 0.5)"
              onFocus={onFocus}
              onBlur={onBlur}
              style={[
                styles.searchbarInput,
                isFocused ? styles.searchbarInputFocused : null,
              ]}
              onChangeText={setSearchQuery}
              value={searchQuery}
              onSubmitEditing={searchLocation}
            />
            {searchQuery !== "" && (
              <TouchableOpacity
                onPress={clearSearchQuery}
                style={styles.clearIconContainer}
              >
                <MaterialIcons
                  name="cancel"
                  size={responsiveFontSize(2.5)}
                  color="#707070"
                />
              </TouchableOpacity>
            )}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => handleSetMapType(MAP_TYPES.SATELLITE)}
                  >
                    <Text style={styles.btmBtnStyle}>Satellite</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => handleSetMapType(MAP_TYPES.STANDARD)}
                  >
                    <Text style={styles.btmBtnStyle}>Standard</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => handleSetMapType(MAP_TYPES.HYBRID)}
                  >
                    <Text style={styles.btmBtnStyle}>Hybrid</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
          {/* including map view */}
          <View style={{ flex: 1 }}>
            {region && (
              <View style={{ flex: 1 }}>
                <MapView
                  ref={mapRef}
                  style={styles.mapViewStyling}
                  region={region}
                  showsUserLocation={showUserLocation}
                  onUserLocationChange={(event) => {
                    const { latitude, longitude } =
                      event.nativeEvent.coordinate;
                    setRegion({
                      ...region,
                      latitude: event.nativeEvent.coordinate.latitude,
                      longitude: event.nativeEvent.coordinate.longitude,
                    });
                    setCurrentLocation({ coords: { latitude, longitude } });
                  }}
                  mapType={mapTypes[mapTypeIndex].value}
                  onPress={(event) => {
                    if (!isButtonPressed) {
                      setPoints([...points, event.nativeEvent.coordinate]);
                    }
                  }}
                  mapPadding={{ top: 0, right: -100, bottom: 0, left: 0 }}
                >
                  {points.map((point, index) => (
                    <Marker key={index} coordinate={point} />
                  ))}
                  {!isPolygonComplete && points.length > 1 && (
                    <Polyline
                      coordinates={points}
                      strokeColor="#000"
                      strokeWidth={1}
                    />
                  )}
                  {isPolygonComplete && points.length > 2 && (
                    <Polygon
                      coordinates={points}
                      strokeColor="#000"
                      fillColor="rgba(199, 192, 192, 0.5)"
                      strokeWidth={1}
                    />
                  )}
                </MapView>

                <TouchableOpacity
                  style={styles.layerIconContainer}
                  onPress={() => {
                    setIsButtonPressed(true);
                    toggleMapType();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faLayerGroup}
                    size={responsiveFontSize(3)}
                    color="#fff"
                  />
                  {showDropdown && (
                    <View style={styles.dropdownContainer}>
                      <FlatList
                        data={mapTypes}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => selectMapType(index)}
                          >
                            <Text style={{ color: "#fff" }}>{item.name}</Text>
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.value}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.locationFocusBtn}
                  onPress={focusOnCurrentLocation}
                >
                  <FontAwesomeIcon
                    icon={faLocationCrosshairs}
                    size={responsiveFontSize(3)}
                    color="#fff"
                  />
                </TouchableOpacity>
                <View>
                  <View style={styles.sideIconWrap}>
                    <TouchableWithoutFeedback
                      onPressIn={() => setIsButtonPressed(true)}
                      onPressOut={() => setIsButtonPressed(false)}
                    >
                      <MaterialCommunityIcons
                        name="arrow-u-left-top"
                        size={responsiveFontSize(3)}
                        color="white"
                        style={styles.sideIconStyle}
                        onPress={handleUndoLastPoint}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPressIn={() => setIsButtonPressed(true)}
                      onPressOut={() => setIsButtonPressed(false)}
                    >
                      <MaterialCommunityIcons
                        name="shape-polygon-plus"
                        size={responsiveFontSize(3)}
                        color="white"
                        style={styles.sideIconStyle}
                        onPress={handleCompleteMap}
                      />
                    </TouchableWithoutFeedback>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={handleCancel}
                    style={styles.cancelBtnStyle}
                  >
                    <Text style={styles.btmBtnStyle}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSaveMap}
                    style={styles.btnStyle}
                  >
                    <Text style={styles.btmBtnStyle}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
          {isSaving && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator color="#007BFF" size={45} />
              <Text style={styles.loadingText}>Saving...</Text>
            </View>
          )}
        </View>
      )}
    </>
  );
};

export default PointAddingScreen;
