import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, ActivityIndicator, Modal, TextInput } from 'react-native';
import MapView, { Marker, Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Haversine formula to calculate the distance between two geographical points
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Radius of the Earth in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
};

// Calculate perimeter by summing the distances between consecutive points
const calculatePerimeter = (points: { latitude: number; longitude: number }[]): number => {
  let perimeter = 0;

  for (let i = 0; i < points.length - 1; i++) {
    const lat1 = points[i].latitude;
    const lon1 = points[i].longitude;
    const lat2 = points[i + 1].latitude;
    const lon2 = points[i + 1].longitude;

    perimeter += haversineDistance(lat1, lon1, lat2, lon2);
  }

  // Closing the polygon (distance between the last and the first point)
  const lat1 = points[points.length - 1].latitude;
  const lon1 = points[points.length - 1].longitude;
  const lat2 = points[0].latitude;
  const lon2 = points[0].longitude;

  perimeter += haversineDistance(lat1, lon1, lat2, lon2);

  // Round the perimeter to 2 decimal places
  return Math.round(perimeter * 100) / 100;
};

// Calculate the area using the Spherical Excess formula for geographical coordinates
const calculateArea = (points: { latitude: number; longitude: number }[]): number => {
  let area = 0;
  const n = points.length;
  const R = 6371e3; // Earth radius in meters

  for (let i = 0; i < n - 1; i++) {
    const lat1 = points[i].latitude * Math.PI / 180;
    const lon1 = points[i].longitude * Math.PI / 180;
    const lat2 = points[i + 1].latitude * Math.PI / 180;
    const lon2 = points[i + 1].longitude * Math.PI / 180;

    const dLon = lon2 - lon1;
    const dLat = lat2 - lat1;

    // Spherical excess formula for area
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    area += R * R * c;
  }

  // Final area calculation and rounding
  area = Math.abs(area); // Ensure area is positive
  return Math.round(area * 100) / 100;
};

const { height } = Dimensions.get('window');

export default function MeasurePointScreen() {
  const router = useRouter();

  const [location, setLocation] = useState<any>(null);
  const [points, setPoints] = useState<any[]>([]);
  const [area, setArea] = useState<number>(0);
  const [perimeter, setPerimeter] = useState<number>(0);
  const [measureMenuVisible, setMeasureMenuVisible] = useState<boolean>(true);
  const [mapRegion, setMapRegion] = useState<any>({
    latitude: 6.9271, // Default to Colombo if no location
    longitude: 79.8612, // Default to Colombo
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [userId, setUserId] = useState<string | null>(null); // State to store userId
  const [fieldName, setFieldName] = useState<string>(''); // Field name state
  const [showModal, setShowModal] = useState<boolean>(false); // Modal visibility state
  const [showPartitionQuestion, setShowPartitionQuestion] = useState<boolean>(false); // Partition question visibility
  const [isBackButtonPressed, setIsBackButtonPressed] = useState(false); // Track back button state
  const [isMapDisabled, setIsMapDisabled] = useState(false); // State to control map interaction
  const [fieldId, setFieldId] = useState<string | null>(null); // State to store fieldId

  // Get current location on load and set region to zoom in on it
  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
        setMapRegion({
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.001, 
          longitudeDelta: 0.001,
        });
        setLoading(false); 
      } else {
        Alert.alert('Permission Denied', 'Location permission is required.');
        setLoading(false); 
      }
    };

    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUserId(user._id); 
      }
    };

    getLocation();
    loadUser(); 
  }, []);

  // Handle point selection on the map
  const handlePress = (e: any) => {
    if (isMapDisabled) return; // Prevent points from being added when map is disabled

    const newPoint = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };

    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, newPoint];

      // Only calculate area and perimeter if there are enough points (>=3)
      if (updatedPoints.length >= 3) {
        const newArea = calculateArea(updatedPoints);
        const newPerimeter = calculatePerimeter(updatedPoints);

        setArea(newArea);
        setPerimeter(newPerimeter);
      }

      return updatedPoints;
    });
  };

  // Remove the last point
  const handleBackButtonPress = () => {
    setIsBackButtonPressed(true); // Set back button pressed state to true
    setIsMapDisabled(true); // Disable map interaction immediately

    setPoints((prevPoints) => prevPoints.slice(0, prevPoints.length - 1));
    setArea(0);
    setPerimeter(0);

    setTimeout(() => {
      setIsMapDisabled(false); // Enable map interaction again
      setIsBackButtonPressed(false); // Reset back button state
    }, 1000); 
  };

  const handleSave = async () => {
    if (!userId) {
      Alert.alert("Error", "User ID is missing");
      return;
    }

    const fieldData = {
      userId, // Send the userId as it is, no need to convert to ObjectId
      name: fieldName, // Send the field name
      points,
      area,
      perimeter,
    };

    try {
      const API_BASE_URL = 'https://plot-pro.vercel.app/api';
      console.log('Saving data:', fieldData); // Log the data to be sent

      const response = await fetch(`${API_BASE_URL}/fields/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fieldData),
      });

      const data = await response.json();
      if (!response.ok) {
        console.error('Error response:', data); // Log the error response for debugging
        throw new Error(data.error || 'Failed to save field data');
      }

      Alert.alert('Success', 'Field data saved successfully!');
      setFieldId(data._id); // Save the fieldId from the response
      setShowModal(false); // Close the modal

      setShowPartitionQuestion(true); // Ask if the user wants to partition

    } catch (error) {
      console.error('Error saving field data:', error); // Detailed error logging
      Alert.alert('Error', 'Failed to save field data.');
    }
  };

  const handlePartitionResponse = (response: string) => {
    setShowPartitionQuestion(false);
    if (response === 'Yes') {
      // Navigate to partition screen and pass fieldId and fieldName as query params
      router.push({
        pathname: '/screens/measure/partition',
        query: { fieldId, fieldName },
      });
    }
  };
  
  

  // Cancel the current process and go back
  const handleCancel = () => {
    setPoints([]);
    setArea(0);
    setPerimeter(0);
    router.push('/(tabs)/measure');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#2793e7" />
          <Text style={styles.loadingText}>Loading your location...</Text>
        </View>
      ) : (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={mapRegion}
          mapType="satellite" 
          onPress={handlePress}
        >
          {points.map((point, index) => (
            <Marker key={index} coordinate={point} />
          ))}

          {points.length >= 3 && (
            <Polygon coordinates={points} strokeColor="purple" fillColor="rgba(128, 0, 128, 0.5)" />
          )}
        </MapView>
      )}

      {/* Display Area and Perimeter on top */}
      <View style={styles.topDisplay}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Area: {area} m²</Text>
        </View>
        <View style={styles.circle}>
          <Text style={styles.circleText}>Perimeter: {perimeter} m</Text>
        </View>
      </View>

      {/* Measure Menu */}
      {measureMenuVisible && (
        <View style={styles.measureMenu}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackButtonPress}>
            <Icon name="arrow-left" size={20} color="#fff" style={styles.curvedArrowIcon} />
          </TouchableOpacity>

          {/* Save and Cancel Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={() => setShowModal(true)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Modal for entering field name */}
      <Modal visible={showModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Field Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Field Name"
              value={fieldName}
              onChangeText={setFieldName}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Partition question */}
      {showPartitionQuestion && (
        <View style={styles.partitionQuestionContainer}>
          <Text style={styles.partitionQuestionText}>Do you need to partition?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={() => handlePartitionResponse('Yes')}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => handlePartitionResponse('No')}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  topDisplay: {
    position: 'absolute',
    top: 30,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 3,
  },
  circle: {
    backgroundColor: '#2793e7',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    width: 150,
    height: 40,
  },
  circleText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  measureMenu: {
    position: 'absolute',
    bottom: 45,
    left: 10,
    right: 10,
    zIndex: 3,
  },
  backButton: {
    position: 'absolute',
    top: -100,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    zIndex: 3,
    width: 40,
    height: 40,
  },
  curvedArrowIcon: {
    color: '#2793e7',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: '#2793e7',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#2793e7',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  partitionQuestionContainer: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    zIndex: 4,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  partitionQuestionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
