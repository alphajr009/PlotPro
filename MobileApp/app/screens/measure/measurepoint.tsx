import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateArea } from '../../utils/calculateArea';
import { calculatePerimeter } from '../../utils/calculatePerimeter';
import { saveFieldData } from '../../utils/saveFieldData';

export default function MeasurePointScreen() {
  const router = useRouter();

  const [points, setPoints] = useState([]);
  const [area, setArea] = useState(0);
  const [perimeter, setPerimeter] = useState(0);
  const [measureMenuVisible, setMeasureMenuVisible] = useState(true);

  // Handle point selection on the map
  const handlePress = (e) => {
    const newPoint = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };

    setPoints((prevPoints) => {
      const updatedPoints = [...prevPoints, newPoint];
      if (updatedPoints.length >= 3) {
        setArea(calculateArea(updatedPoints));
        setPerimeter(calculatePerimeter(updatedPoints));
      }
      return updatedPoints;
    });
  };

  // Remove the last point
  const handleBackButtonPress = () => {
    setPoints(points.slice(0, points.length - 1));
    setArea(0);
    setPerimeter(0);
  };

  // Save the field data
  const handleSave = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const fieldData = {
      userId,
      points,
      area,
      perimeter,
    };

    try {
      await saveFieldData(fieldData); // Save field to database (API call)
      Alert.alert('Success', 'Field data saved successfully!');
      router.push('/(tabs)/measure'); // Navigate back to the measure screen
    } catch (error) {
      Alert.alert('Error', 'Failed to save field data.');
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
      <MapView style={styles.map} onPress={handlePress}>
        {points.map((point, index) => (
          <Marker key={index} coordinate={point} />
        ))}

        {points.length >= 3 && (
          <Polygon coordinates={points} strokeColor="purple" fillColor="rgba(128, 0, 128, 0.5)" />
        )}
      </MapView>

      {/* Measure Menu */}
      {measureMenuVisible && (
        <View style={styles.measureMenu}>
          <TouchableOpacity style={styles.measureOption} onPress={handleBackButtonPress}>
            <Text style={styles.measureOptionText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.measureOption} onPress={handleSave}>
            <Text style={styles.measureOptionText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.measureOption} onPress={handleCancel}>
            <Text style={styles.measureOptionText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Area and Perimeter Display */}
      <View style={styles.footer}>
        <Text style={styles.text}>Area: {area} m²</Text>
        <Text style={styles.text}>Perimeter: {perimeter} m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  measureMenu: {
    position: 'absolute',
    bottom: 100,
    left: 10,
    right: 10,
    backgroundColor: '#2793e7',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
  },
  measureOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    alignItems: 'center',
  },
  measureOptionText: {
    color: '#fff',
    fontSize: 16,
  },
});
