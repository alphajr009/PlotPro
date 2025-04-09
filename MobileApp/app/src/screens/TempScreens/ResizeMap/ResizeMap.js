import React, { useEffect, useState } from "react";
import { Polygon } from "react-native-maps";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Polyline } from "react-native-maps";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { styles } from "./ResizeMapStyles";
import MapView, { MAP_TYPES } from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AxiosInstance from "../../../AxiosInstance";
import Headersection from "../../../components/Headersection";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import area from "@turf/area";
import { distance } from "@turf/turf";
import { captureRef } from "react-native-view-shot";
import axios from "axios";

const ResizeMapScreen = ({ navigation, route }) => {
  const { templateId, Area, Perimeter } = route.params;
  const [isPolygonComplete, setIsPolygonComplete] = useState(true);
  const [region, setRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [points, setPoints] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mapTypeIndex, setMapTypeIndex] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = React.useRef(null);
  const [loading, setLoading] = useState(true);

  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isMarkerMoved, setIsMarkerMoved] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [calculatedArea, setCalculatedArea] = useState(parseFloat(Area) || 0);
  const [polygonPerimeter, setPolygonPerimeter] = useState(
    parseFloat(Perimeter) || 0
  );
  const [isSaving, setIsSaving] = useState(false);

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
  const closeModal = () => {
    setModalVisible(false);
  };
  const selectMapType = (index) => {
    setMapTypeIndex(index);
    setShowDropdown(false);
  };

  const calculateAreaAndPerimeter = (pointsToCalculate) => {
    const polygon = {
      type: "Polygon",
      coordinates: [
        pointsToCalculate.map((coord) => [coord.longitude, coord.latitude]),
      ],
    };
    const polygonArea = area(polygon);
    const newArea = polygonArea * 0.03954; // Convert to perches

    let perimeter = 0;
    for (let i = 0; i < pointsToCalculate.length; i++) {
      const start = [
        pointsToCalculate[i].longitude,
        pointsToCalculate[i].latitude,
      ];
      const end =
        i === pointsToCalculate.length - 1
          ? [pointsToCalculate[0].longitude, pointsToCalculate[0].latitude]
          : [
              pointsToCalculate[i + 1].longitude,
              pointsToCalculate[i + 1].latitude,
            ];
      perimeter += distance(start, end, { units: "kilometers" });
    }

    setCalculatedArea(newArea);
    setPolygonPerimeter(perimeter);
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

  //handling location and fetching template data
  useEffect(() => {
    console.log("Template ID:", templateId);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation(location);

      AxiosInstance.get(`/api/auth/mapTemplate/getOneTemplate/${templateId}`)
        .then((response) => {
          setPoints(
            response.data.locationPoints.map((point) => ({
              ...point,
              isMain: true,
            }))
          );
          console.log(response.data.locationPoints);

          // Calculate the average latitude and longitude
          const avgLatitude =
            response.data.locationPoints.reduce(
              (total, point) => total + point.latitude,
              0
            ) / response.data.locationPoints.length;
          const avgLongitude =
            response.data.locationPoints.reduce(
              (total, point) => total + point.longitude,
              0
            ) / response.data.locationPoints.length;

          setRegion({
            latitude: avgLatitude,
            longitude: avgLongitude,
            latitudeDelta: 0.0005,
            longitudeDelta: 0.0005,
          });
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching the template:",
            error
          );
          setLoading(false);
        });
    })();
  }, []);

  //remove last point from the array
  const handleUndoLastPoint = () => {
    if (undoStack.length > 0) {
      const newUndoStack = [...undoStack];
      const lastAction = newUndoStack.pop();
      setUndoStack(newUndoStack);

      setPoints(lastAction.originalPoints);

      if (newUndoStack.length === 0) {
        setIsMarkerMoved(false);
      }
      calculateAreaAndPerimeter(lastAction.originalPoints);
    }
  };

  //save the updates points to the backend is a marker was moved
  const handleSaveMap = async () => {
    if (isMarkerMoved || undoStack.length > 0) {
      try {
        setIsSaving(true);
        const uri = await captureRef(mapRef.current, {
          format: "jpg",
          quality: 0.3,
        });
        const imageUrl = await uploadToImgbb(uri);

        const locationPoints = points.map((point) => ({
          latitude: point.latitude,
          longitude: point.longitude,
        }));
        const response = await AxiosInstance.put(
          `/api/auth/mapTemplate/updateTemplate/${templateId}`,
          {
            locationPoints,
            area: calculatedArea,
            perimeter: polygonPerimeter,
            imageUrl,
          }
        );

        if (response.status === 200) {
          console.log("Location updated successfully");
          setIsMarkerMoved(false);
          setUndoStack([]);
          navigation.navigate("SavedTemplatesScreen");
        } else {
          console.log("Failed to update location");
        }
      } catch (error) {
        console.error("An error occurred while updating the location:", error);
      }
    } else {
      navigation.navigate("SavedTemplatesScreen");
    }
  };

  //update the point's coordinates when a marker is dragged to a new location
  const handleMarkerDragEnd = (event, index) => {
    const newPoints = [...points];
    const originalPoints = [...newPoints];
    const draggedPoint = { ...event.nativeEvent.coordinate, isMain: true };
    newPoints[index] = draggedPoint;

    const prevIndex = (index - 1 + newPoints.length) % newPoints.length;
    const nextIndex = (index + 1) % newPoints.length;

    const intermediatePrev = insertIntermediatePoints(
      newPoints[prevIndex],
      draggedPoint
    ).map((p) => ({ ...p, isMain: false }));
    const intermediateNext = insertIntermediatePoints(
      draggedPoint,
      newPoints[nextIndex]
    ).map((p) => ({ ...p, isMain: false }));

    newPoints.splice(index, 0, ...intermediatePrev);
    newPoints.splice(
      index + intermediatePrev.length + 1,
      0,
      ...intermediateNext
    );

    setUndoStack((prevStack) => [
      ...prevStack,
      {
        originalPoints,
        newPoints,
        draggedIndex: index,
      },
    ]);

    setPoints(newPoints);
    setIsMarkerMoved(true);
    calculateAreaAndPerimeter(newPoints);
  };

  //select a map type
  const handleSetMapType = (type) => {
    selectMapType(type);
    setModalVisible(false);
  };

  const handleCancel = () => {
    navigation.navigate("SavedTemplatesScreen");
  };
  const mapTypes = [
    { name: "Satellite", value: "satellite" },
    { name: "Standard", value: "standard" },
    { name: "Hybrid", value: "hybrid" },
    { name: "Terrain", value: "terrain" },
  ];

  const toggleMapType = () => {
    setShowDropdown(!showDropdown);
  };

  const MainMarker = ({ coordinate, onDragEnd, index }) => (
    <Marker
      coordinate={coordinate}
      draggable
      onDragEnd={(e) => onDragEnd(e, index)}
      tracksViewChanges={false}
      stopPropagation={true}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={styles.markerTouchArea}>
        <View style={styles.mainMarker} />
      </View>
    </Marker>
  );

  const IntermediateMarker = ({ coordinate, onDragEnd, index }) => (
    <Marker
      coordinate={coordinate}
      draggable
      onDragEnd={(e) => onDragEnd(e, index)}
      tracksViewChanges={false}
      stopPropagation={true}
      anchor={{ x: 0.5, y: 0.5 }}
    >
      <View style={styles.markerTouchArea}>
        <View style={styles.intermediateMarker} />
      </View>
    </Marker>
  );
  return (
    <>
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
      <View>
        <StatusBar barStyle="light-content" backgroundColor="#007BFF" />
        <Headersection
          navigation={navigation}
          title="Resize Map"
        ></Headersection>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>
          Area: {calculatedArea.toFixed(2)} perches
        </Text>
        <Text style={styles.overlayText}>
          Perimeter: {polygonPerimeter.toFixed(3)} km
        </Text>
      </View>
      {loading ? (
        <View style={styles.loadingScreen}>
          <View style={styles.dotsWrapper}>
            <ActivityIndicator color="#007BFF" size={45} />
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {region && (
            <View style={{ flex: 1 }}>
              <MapView
                ref={mapRef}
                style={{ flex: 1, paddingTop: 100 }}
                region={region}
                mapType={mapTypes[mapTypeIndex].value}
                mapPadding={{ top: 0, right: -100, bottom: 0, left: 0 }}
              >
                {points.map((point, index) =>
                  point.isMain ? (
                    <MainMarker
                      key={index}
                      coordinate={point}
                      onDragEnd={handleMarkerDragEnd}
                      index={index}
                    />
                  ) : (
                    <IntermediateMarker
                      key={index}
                      coordinate={point}
                      onDragEnd={handleMarkerDragEnd}
                      index={index}
                    />
                  )
                )}
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

              {(undoStack.length > 0 || isMarkerMoved) && (
                <TouchableOpacity
                  style={styles.sideIconWrap}
                  onPressIn={() => setIsButtonPressed(true)}
                  onPressOut={() => setIsButtonPressed(false)}
                  onPress={handleUndoLastPoint}
                >
                  <MaterialCommunityIcons
                    name="arrow-u-left-top"
                    size={responsiveFontSize(3)}
                    color="white"
                    style={styles.sideIconStyle}
                  />
                </TouchableOpacity>
              )}

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleSaveMap}
                  style={styles.btnStyle}
                >
                  <Text style={styles.btmBtnStyle}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.cancelBtnStyle}
                >
                  <Text style={styles.btmBtnStyle}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
      {isSaving && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator color="#007BFF" size={45} />
          <Text style={styles.loadingText}>Saving...</Text>
        </View>
      )}
    </>
  );
};

export default ResizeMapScreen;
