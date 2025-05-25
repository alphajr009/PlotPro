import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Marker,
  Polygon,
} from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { useNavigation } from "@react-navigation/native";
import { Button, Appbar } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import area from "@turf/area";
import { distance } from "@turf/turf";
import styles from "./WalkaroundLandStyles";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import { captureRef } from "react-native-view-shot";
import axios from "axios";

const BACKGROUND_LOCATION_TASK = "background-location-task";

export default function WalkaroundLand() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialLocation, setInitialLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [trackingStarted, setTrackingStarted] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [trackingPaused, setTrackingPaused] = useState(false);
  const [drawPolyline, setDrawPolyline] = useState(false);
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [calculatedArea, setCalculatedArea] = useState(0);
  const [polygonPerimeter, setPolygonPerimeter] = useState(0);
  const [isResizeButtonDisabled, setIsResizeButtonDisabled] = useState(true);
  const [isStartPauseButtonDisabled, setIsStartPauseButtonDisabled] =
    useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [resizingMode, setResizingMode] = useState(false);
  const [showUndoButton, setShowUndoButton] = useState(true);
  const [showFillColor, setShowFillColor] = useState(false);
  const [isPolygonClosed, setIsPolygonClosed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  TaskManager.defineTask(BACKGROUND_LOCATION_TASK, async ({ data, error }) => {
    if (error) {
      console.error("Background location task error:", error);
      return;
    } 

    if (data) {
      const { locations } = data;
      console.log("Received background location update:", locations);
      if (trackingStarted) {
        const newCoordinates = locations.map((location) => ({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          accuracy: location.coords.accuracy,
        }));
    
        setPathCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          ...newCoordinates,
        ]);
        if (!trackingPaused) {
          setCurrentLocation({
            latitude: locations[0].coords.latitude,
            longitude: locations[0].coords.longitude,
            accuracy: locations[0].coords.accuracy,
          });
          focusOnCurrentLocation();
        }
      }
      setInitialLocation({
        latitude: locations[0].coords.latitude,
        longitude: locations[0].coords.longitude,
        accuracy: locations[0].coords.accuracy,
      });
    }
  });

  const handleReMeasure = () => {
  
    setPathCoordinates([]);
    setUndoStack([]);
    setTrackingStarted(false);
    setTrackingPaused(false);
    setDrawPolyline(false);
    setCalculatedArea(0);
    setPolygonPerimeter(0);
    setIsResizeButtonDisabled(true);
    setIsStartPauseButtonDisabled(false);
    setIsSaveButtonDisabled(true);
    setResizingMode(false);
    setShowUndoButton(true);
    setShowFillColor(false);
    setIsPolygonClosed(false);

    startTracking();
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

  const handleStartPress = () => {
 
    setTrackingPaused(!trackingPaused);
    if (!trackingPaused) {
      setDrawPolyline(true);
      setPathCoordinates([initialLocation]); 
      setIsSaveButtonDisabled(true);
      setShowFillColor(false); 
      setIsPolygonClosed(false); 
    } else {
      setTrackingStarted(false);
      setIsResizeButtonDisabled(false);
      setIsStartPauseButtonDisabled(true); 
      setIsSaveButtonDisabled(false); 
      setShowFillColor(true);
      setIsPolygonClosed(true);
      stopLocationUpdates();
      calculateAreaAndPerimeter();
    }
  };

  const handleResizeEnd = () => {

    calculateAreaAndPerimeter();
  };

  const startTracking = async () => {
    try {
      const { coords } = await Location.getCurrentPositionAsync({});

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Foreground location permission not granted");
        return;
      }

      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 0,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: "Tracking location",
          notificationBody: "Your location is being tracked in the background",
        },
      });

      setInitialLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      setCurrentLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      console.log("Background location updates started");
      setTrackingStarted(true);
    } catch (error) {
      console.error("Error starting background location updates:", error);
    }
  };

  useEffect(() => {
    startTracking();

    return () => {
      stopLocationUpdates();
    };
  }, []);

  const stopLocationUpdates = async () => {
    try {
     
      const isTaskRunning = await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_LOCATION_TASK
      );
      if (isTaskRunning) {
        await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
        console.log("Background location updates stopped");
      }
    } catch (error) {
      console.error("Error stopping background location updates:", error);
    }
  };

  const toggleMapType = () => {
    
    setShowDropdown(!showDropdown);
  };

  const selectMapType = (index) => {
    setMapTypeIndex(index); 
    setShowDropdown(false);
  };

  const focusOnCurrentLocation = () => {

    if (mapRef.current && currentLocation) {
      mapRef.current.animateToRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.00009,
      });
    }
  };

  const mapTypes = [
    { name: "Satellite", value: "satellite" },
    { name: "Standard", value: "standard" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

  const calculateAreaAndPerimeter = () => {
    const polygon = {
      type: "Polygon",
      coordinates: [
        pathCoordinates.map((coord) => [coord.longitude, coord.latitude]), 
      ],
    };
    const polygonArea = area(polygon); 
    setCalculatedArea(polygonArea * 0.03954);

    
    let perimeter = 0;
    for (let i = 0; i < pathCoordinates.length; i++) {
      const start = [pathCoordinates[i].longitude, pathCoordinates[i].latitude];
      const end =
        i === pathCoordinates.length - 1
          ? [pathCoordinates[0].longitude, pathCoordinates[0].latitude]
          : [pathCoordinates[i + 1].longitude, pathCoordinates[i + 1].latitude];
      perimeter += distance(start, end, { units: "kilometers" });
    }

    setPolygonPerimeter(perimeter);
  };

  const saveMapData = async () => {
    try {
      setIsSaving(true);
      let imageUrl = "";
      if (mapRef.current) {
        const uri = await captureRef(mapRef.current, {
          format: "jpg",
          quality: 0.8,
        });
        console.log("Captured image URI:", uri);
        imageUrl = await uploadToImgbb(uri);
        console.log("Uploaded image URL:", imageUrl);
      }

      navigation.navigate("SaveScreen", {
        locationPoints: pathCoordinates,
        area: calculatedArea,
        perimeter: polygonPerimeter,
        imageUrl: imageUrl,
      });
    } catch (error) {
      console.error("Error capturing or uploading map screenshot:", error);
      Alert.alert("Error", "Failed to save map data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  
  const handleResize = () => {
    const newResizingMode = !resizingMode;
    setResizingMode(newResizingMode);
    if (newResizingMode) {
   
      setShowUndoButton(true);
    } else {
  
      setShowUndoButton(false);
    }
  };

 
  const handleDragEnd = (event, index) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    const updatedCoordinates = [...pathCoordinates]; 
    const draggedPoint = { latitude, longitude }; 
    updatedCoordinates[index] = draggedPoint;

    const prevIndex =
      (index - 1 + updatedCoordinates.length) % updatedCoordinates.length;
    const nextIndex = (index + 1) % updatedCoordinates.length;

    const intermediatePrev = insertIntermediatePoints(
      updatedCoordinates[prevIndex],
      draggedPoint
    ); 
    const intermediateNext = insertIntermediatePoints(
      draggedPoint,
      updatedCoordinates[nextIndex]
    );

    updatedCoordinates.splice(index, 0, ...intermediatePrev);
    updatedCoordinates.splice(
      index + intermediatePrev.length + 1,
      0,
      ...intermediateNext
    );

    setUndoStack((prevStack) => [...prevStack, [...pathCoordinates]]); 
    setPathCoordinates(updatedCoordinates);
    setShowUndoButton(true);
    handleResizeEnd();
    setShowFillColor(true);

   
    if (isPolygonClosed) {
      updatedCoordinates[updatedCoordinates.length - 1] = {
        ...updatedCoordinates[0],
      };
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack]; 
      const previousState = newUndoStack.pop(); 
      setUndoStack(newUndoStack);
      setPathCoordinates(previousState);
      calculateAreaAndPerimeter();

      if (newUndoStack.length === 0) {
        setShowUndoButton(false);
      }
    }
  };

  const insertIntermediatePoints = (startPoint, endPoint, numPoints = 1) => {
    const points = [];
    for (let i = 1; i <= numPoints; i++) {
      const ratio = i / (numPoints + 1);
      const lat =
        startPoint.latitude + (endPoint.latitude - startPoint.latitude) * ratio; 
      const lng =
        startPoint.longitude +
        (endPoint.longitude - startPoint.longitude) * ratio; 
      points.push({ latitude: lat, longitude: lng });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
      <Appbar.Header style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.appbarButton}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveMapData}
          style={[styles.appbarButton, { marginLeft: "auto" }]}
          disabled={isSaveButtonDisabled}
        >
          <Text
            style={[
              styles.buttonText,
              isSaveButtonDisabled && { color: "rgba(255, 255, 255, 0.5)" },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </Appbar.Header>

      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          Area: {calculatedArea.toFixed(2)} perches
        </Text>
        <Text style={styles.overlayText}>
          Perimeter: {polygonPerimeter.toFixed(3)} km
        </Text>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        mapType={mapTypes[mapTypeIndex].value}
        showsUserLocation={trackingStarted}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 6.2427,
          longitude: 80.0607,
          latitudeDelta: 5,
          longitudeDelta: 5,
        }} 
      >
 
        {drawPolyline && pathCoordinates.length > 0 && (
          <>
            <Polyline
              coordinates={
                isPolygonClosed
                  ? [...pathCoordinates, pathCoordinates[0]]
                  : pathCoordinates
              }
              strokeWidth={2.3}
              strokeColor="white"
            />
            {showFillColor && (
              <Polygon
                coordinates={pathCoordinates}
                fillColor="rgba(0, 123, 255, 0.3)"
                strokeColor="white"
                strokeWidth={2.3}
              />
            )}
          </>
        )}
      
        {resizingMode &&
          pathCoordinates.map((coordinate, index) => (
            <Marker
              key={index}
              coordinate={coordinate}
              draggable
              onDragEnd={(event) => handleDragEnd(event, index)}
              tracksViewChanges={false}
              stopPropagation={true}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <View style={styles.markerTouchArea}>
                <View style={styles.marker} />
              </View>
            </Marker>
          ))}
      </MapView>

      <TouchableOpacity
        style={styles.layerIconContainer}
        onPress={toggleMapType}
      >
        <FontAwesomeIcon
          icon={faLayerGroup}
          size={responsiveFontSize(2.8)}
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

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            icon={trackingPaused ? "check" : "play-outline"}
            mode="contained"
            onPress={handleStartPress}
            disabled={isStartPauseButtonDisabled}
            style={[
              styles.button,
              isStartPauseButtonDisabled && {
                backgroundColor: "rgba(131, 180, 255, 0.8)",
              },
            ]}
            labelStyle={
              isStartPauseButtonDisabled && {
                color: "rgba(255, 255, 255, 0.7)",
              }
            }
          >
            {trackingPaused ? "Finish" : "Start"}
          </Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            icon="resize"
            mode="contained"
            disabled={isResizeButtonDisabled}
            style={[
              styles.button,
              isResizeButtonDisabled && {
                backgroundColor: "rgba(131, 180, 255, 0.8)",
              },
            ]}
            labelStyle={
              isResizeButtonDisabled && { color: "rgba(255, 255, 255, 0.7)" }
            }
            onPress={handleResize}
          >
            {resizingMode ? "Done" : "Resize"}
          </Button>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            icon="refresh"
            mode="contained"
            onPress={handleReMeasure}
            style={styles.button}
          >
            Retry
          </Button>
        </View>
        {undoStack.length > 0 && showUndoButton && resizingMode && (
          <TouchableOpacity style={styles.undoIcon} onPress={handleUndo}>
            <FontAwesomeIcon
              icon={faUndo}
              size={responsiveFontSize(2.5)}
              color="#fff"
            />
          </TouchableOpacity>
        )}
      </View>
      {isSaving && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#007BFF" size={45} />
          <Text style={styles.loadingText}>Saving...</Text>
        </View>
      )}
    </View>
  );
}
