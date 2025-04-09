import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from "react-native-maps";
import { Button } from "react-native-paper";
import * as Location from "expo-location";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import {
  faLocationCrosshairs,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import SelectionModal from "../../components/SelectionModal";
import ProfileModel from "../../components/ProfileModel";
import ProfileAvatar from "../../components/ProfileAvatar";
import { useIsFocused } from "@react-navigation/native";
import AxiosInstance from "../../AxiosInstance";
import styles from "./HomeStyles";
import MapDetailsPanel from "./MapDetailsPanel";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { BackHandler, Alert } from "react-native";

const apiKey = "AIzaSyBAYDMYlsBjJ_IlXSOetj774znS0nBNfDQ";

export default function Home() {
  const navigation = useNavigation();
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const mapRef = React.useRef(null);
  const [userData, setUserData] = useState(null);
  const isFocused = useIsFocused();
  const [userMaps, setUserMaps] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState(null);
  const [selectedMapDetails, setSelectedMapDetails] = useState(null);
  const [searchedRegion, setSearchedRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapDetailsVisible, setIsMapDetailsVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchUserMaps();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AxiosInstance.get("/api/users/details");
        if (response.data.user) {
          setUserData(response.data.user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  //get all maps of user

  const fetchUserMaps = async () => {
    try {
      const response = await AxiosInstance.get(
        "/api/auth/mapTemplate/getAllTemplates"
      );
      setUserMaps(response.data);
      showAllMaps(); // Call showAllMaps after setting userMaps
    } catch (error) {
      console.error("Failed to fetch user maps:", error);
    }
  };

  //get the current location
  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({}); // Get current location
      setCurrentLocation(location);
    })();
  }, []);

  const startMeasure = () => {
    setModalVisible(true);
  };
  const ProfileManage = () => {
    setProfileModalVisible(true);
  };

  //options for the selection modal
  const options = [
    {
      icon: "walk",
      Header: "Walk around the land",
      Text: "Click on Start button and it will track your phone's live position.",
    },
    {
      icon: "map-marker-radius",
      Header: "Point edges on map",
      Text: "Add points to map manually,drag and drop to specific place.",
    },
    {
      icon: "calculator",
      Header: "Manual Calculator",
      Text: "Manually add area and perimeter for the calculation.",
    },
  ];

  // Map types
  const mapTypes = [
    { name: "Satellite", value: "satellite" },
    { name: "Standard", value: "standard" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

  //toggle the map type
  const toggleMapType = () => {
    setShowDropdown(!showDropdown);
  };

  const selectMapType = (index) => {
    setMapTypeIndex(index);
    setShowDropdown(false);
  };

  const focusOnCurrentLocation = () => {
    setShowCurrentLocation(!showCurrentLocation); // Toggle current location
    setSearchedLocation(null); // Clear searched location
    // Animate to current location
    if (!showCurrentLocation && currentLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  // handle the template press
  const handleTemplatePress = () => {
    navigation.navigate("SavedTemplatesScreen");
  };

  // Dismiss the keyboard when tapping outside the text input
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleMapSelect = async (mapId) => {
    if (mapId === selectedMapId) {
      zoomOutMap();
    } else {
      setIsLoading(true);
      setSelectedMapId(mapId);
      try {
        const response = await AxiosInstance.get(
          `/api/auth/mapTemplate/getAllmapData/${mapId}`
        );
        setSelectedMapDetails(response.data);
        setIsMapDetailsVisible(true); // Set this to true when map is selected

        // Zoom to the selected map
        const selectedMap = userMaps.find((map) => map._id === mapId);
        if (selectedMap && mapRef.current) {
          const coordinates = selectedMap.locationPoints.map((point) => ({
            latitude: point.latitude,
            longitude: point.longitude,
          }));

          mapRef.current.fitToCoordinates(coordinates, {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          });
        }
      } catch (error) {
        console.error("Failed to fetch map details:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const zoomOutMap = () => {
    if (mapRef.current) {
      // Zoom out to show all maps
      const allCoordinates = userMaps.flatMap((map) =>
        map.locationPoints.map((point) => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }))
      );

      mapRef.current.fitToCoordinates(allCoordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
    setSelectedMapId(null);
    setSelectedMapDetails(null);
    setIsMapDetailsVisible(false); // Set this to false when zooming out
  };

  const getCenterOfPolygon = (points) => {
    const latitudes = points.map((p) => p.latitude);
    const longitudes = points.map((p) => p.longitude);
    const centerLat = (Math.min(...latitudes) + Math.max(...latitudes)) / 2;
    const centerLng = (Math.min(...longitudes) + Math.max(...longitudes)) / 2;
    return { latitude: centerLat, longitude: centerLng };
  };

  const handlePlaceSelect = (data, details = null) => {
    if (details) {
      const { lat, lng } = details.geometry.location;
      setSearchedRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const showAllMaps = () => {
    if (mapRef.current && userMaps.length > 0) {
      const allCoordinates = userMaps.flatMap((map) =>
        map.locationPoints.map((point) => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }))
      );

      mapRef.current.fitToCoordinates(allCoordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={mapTypes[mapTypeIndex].value}
          region={searchedRegion}
        >
          {userMaps.map((map, index) => (
            <React.Fragment key={map._id}>
              <Polygon
                coordinates={map.locationPoints.map((point) => ({
                  latitude: point.latitude,
                  longitude: point.longitude,
                }))}
                fillColor="rgba(255,255,255,0.1)"
                strokeColor="black"
                strokeWidth={3}
              />
              <Marker
                key={`marker-${map._id}`}
                coordinate={getCenterOfPolygon(map.locationPoints)}
                onPress={() => handleMapSelect(map._id)}
                tracksViewChanges={false}
              >
                <TouchableOpacity
                  onPress={() => handleMapSelect(map._id)}
                  style={styles.markerTouchable}
                >
                  <View style={styles.markerContainer}>
                    <Text style={styles.markerText}>{index + 1}</Text>
                  </View>
                </TouchableOpacity>
              </Marker>
            </React.Fragment>
          ))}

          {showCurrentLocation && currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="Current Location"
            />
          )}
          {searchedLocation && (
            <Marker coordinate={searchedLocation} title="Searched Location" />
          )}
        </MapView>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007BFF" />
          </View>
        )}

        {selectedMapDetails && !isLoading && (
          <MapDetailsPanel
            mapDetails={selectedMapDetails}
            onClose={() => {
              zoomOutMap();
              setIsMapDetailsVisible(false);
            }}
          />
        )}

        {!isMapDetailsVisible && (
          <>
            <GooglePlacesAutocomplete
              placeholder="Search Location"
              onPress={handlePlaceSelect}
              fetchDetails={true}
              query={{
                key: apiKey,
                language: "en",
              }}
              styles={{
                container: styles.searchBarContainer,
                textInputContainer: styles.searchBarInputContainer,
                textInput: styles.searchBarInput,
              }}
              renderRightButton={() => (
                <View style={{ marginRight: responsiveWidth(1) }}>
                  <TouchableOpacity onPress={ProfileManage}>
                    <ProfileAvatar
                      userData={userData}
                      textSize={responsiveFontSize(0.65)}
                    />
                  </TouchableOpacity>
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.layerIconContainer}
              onPress={toggleMapType}
            >
              <FontAwesomeIcon
                icon={faLayerGroup}
                size={responsiveFontSize(2.7)}
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
              style={styles.button2}
              onPress={focusOnCurrentLocation}
            >
              <FontAwesomeIcon
                icon={faLocationCrosshairs}
                size={responsiveFontSize(2.7)}
                color="#fff"
              />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  buttonColor="#007BFF"
                  icon="walk"
                  mode="contained"
                  onPress={startMeasure}
                  style={styles.button}
                >
                  Start Measure
                </Button>
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  buttonColor="#007BFF"
                  icon="content-save-all"
                  mode="contained"
                  onPress={handleTemplatePress}
                  style={styles.button}
                >
                  Templates
                </Button>
              </View>
            </View>
          </>
        )}

        <SelectionModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          options={options}
        />

        <ProfileModel
          profileModalVisible={profileModalVisible}
          setProfileModalVisible={setProfileModalVisible}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
