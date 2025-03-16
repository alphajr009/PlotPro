import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location'; 
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLocationArrow, faLayerGroup } from '@fortawesome/free-solid-svg-icons'; 
import { GOOGLE_MAP_API } from '../config/config';
import { usePermissions } from '../../hooks/usePermissions'; 

export default function MeasureScreen() {
  const router = useRouter();
  const { checkPermissions, requestAllPermissions } = usePermissions();  // Destructure the functions from the hook

  const [location, setLocation] = useState<any>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 6.9271, // Default to Colombo if no location
    longitude: 79.8612, // Default to Colombo
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapType, setMapType] = useState<string>('satellite'); 
  const [modalVisible, setModalVisible] = useState<boolean>(false); 
  const [searchQuery, setSearchQuery] = useState<string>(''); 

  // Get current location
  useEffect(() => {
    const getLocation = async () => {
      const hasPermissions = await checkPermissions();
      if (hasPermissions) {
        const userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation);
        setMapRegion({
          ...mapRegion,
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
        });
      } else {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to access your current location.',
          [
            {
              text: 'OK',
              onPress: requestAllPermissions,
            },
          ]
        );
      }
    };
    getLocation();
  }, []);

  const handleSearch = () => {
    Alert.alert(`Searching for ${searchQuery}`);
  };

  const handleLocationButtonPress = async () => {
    const hasPermissions = await checkPermissions();
    if (hasPermissions && location) {

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.001, 
        longitudeDelta: 0.001, 
      });
    } else {
      Alert.alert('Location not available or permission denied');
    }
  };

  const changeMapType = (type: string) => {
    setMapType(type);
    setModalVisible(false); 
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapRegion}
        mapType={mapType} 
        onRegionChangeComplete={setMapRegion}
      >
        {location && (
          <Marker coordinate={{ latitude: location.coords.latitude, longitude: location.coords.longitude }} />
        )}
      </MapView>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here"
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Layer Button to open Map Type Modal */}
      <TouchableOpacity
        style={styles.layerButton}
        onPress={() => setModalVisible(true)}
      >
        <FontAwesomeIcon icon={faLayerGroup} size={20} color="#fff" />
      </TouchableOpacity>

      {/* Start Measure Button */}
      <TouchableOpacity style={styles.startMeasureButton} onPress={() => router.push('/(tabs)/measure/measure-screen1')}>
        <Text style={styles.startMeasureText}>Start Measure</Text>
      </TouchableOpacity>

      {/* Current Location Button */}
      <TouchableOpacity style={styles.locationButton} onPress={handleLocationButtonPress}>
        <FontAwesomeIcon icon={faLocationArrow} size={30} color="#fff" />
      </TouchableOpacity>

      {/* Map Type Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Map Type</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => changeMapType('standard')}>
              <Text style={styles.modalButtonText}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => changeMapType('satellite')}>
              <Text style={styles.modalButtonText}>Satellite</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => changeMapType('terrain')}>
              <Text style={styles.modalButtonText}>Terrain</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    elevation: 5,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  searchButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#2A93E7',
    borderRadius: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  startMeasureButton: {
    position: 'absolute',
    bottom: 30,
    left: 18,
    backgroundColor: '#2793e7', 
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '55%', 
  },
  startMeasureText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  locationButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#2793e7', 
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 22,
    color: '#fff',
  },
  layerButton: {
    position: 'absolute',
    top: 120, 
    right: 10,
    backgroundColor: '#2793e7', 
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, 
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    paddingVertical: 10,
    backgroundColor: '#2A93E7',
    borderRadius: 10,
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalCloseButton: {
    paddingVertical: 10,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    marginTop: 15,
  },
});
