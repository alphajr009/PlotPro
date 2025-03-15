import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LandCleaningTimePrediction = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Template Name</Text>
      </View>
      
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 7.1, // Update with actual latitude
          longitude: 80.7, // Update with actual longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: 7.1, longitude: 80.7 }} />
      </MapView>

      {/* Land Information */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Land Info</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Type: <Text style={styles.infoValue}>Flat</Text></Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Area: <Text style={styles.infoValue}>100 acres</Text></Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Perimeter: <Text style={styles.infoValue}>1.5 km</Text></Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Location: <Text style={styles.infoValue}>Kandy, Sri Lanka</Text></Text>
        </View>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description:</Text>
        <Text style={styles.descriptionText}>
          Prime acreage for dream homes or sustainable ventures. Breathtaking views, fertile soil,
          and diverse terrain offer endless possibilities.
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Clear Land</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Plantation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Fence</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoValue: {
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  descriptionText: {
    fontSize: 16,
    marginTop: 5,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LandCleaningTimePrediction;
