import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Modal, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import MapView, { Polygon, Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export default function PartitionScreen() {
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [fieldName, setFieldName] = useState<string>('');
  const [fieldDetails, setFieldDetails] = useState<any>(null);
  const [mainFieldPoints, setMainFieldPoints] = useState<any[]>([]); // To store the main field points (unchanged)
  const [partitionPoints, setPartitionPoints] = useState<any[]>([]); // To store the partition points
  const [partitionData, setPartitionData] = useState<any[]>([]); // To store the created partition details
  const [undoStack, setUndoStack] = useState<any[]>([]); // To manage undo actions
  const [isLoading, setIsLoading] = useState(true); // Loading state to manage spinner
  const [mapRegion, setMapRegion] = useState<any>(null); // Region for the map (initially null)

  // Partition-related states
  const [isPartitioning, setIsPartitioning] = useState(false); // Flag to indicate if user is partitioning
  const [partitionLabel, setPartitionLabel] = useState(''); // Partition label (single character)
  const [partitionColor, setPartitionColor] = useState('#FF0000'); // Default color (Red)
  const [partitionMarkers, setPartitionMarkers] = useState<any[]>([]); // Store partition markers
  const [showPartitionModal, setShowPartitionModal] = useState(false); // Show modal for partition creation
  const [showButtons, setShowButtons] = useState(false);
  const [showSaveButton2, setShowSaveButton2] = useState(true); // Show the partition control buttons (Undo, Close, Save)
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);


  useEffect(() => {
    const fetchFieldData = async () => {
      const storedFieldId = await AsyncStorage.getItem('tempFieldId');
      const storedFieldName = await AsyncStorage.getItem('fieldName');
      if (storedFieldId && storedFieldName) {
        setFieldId(storedFieldId);
        setFieldName(storedFieldName);

        try {
          const response = await fetch(`https://plot-pro.vercel.app/api/fields/getFieldById/${storedFieldId}`);
          const data = await response.json();
          if (response.ok) {
            setFieldDetails(data);
            setMainFieldPoints(data.points); // Set the main field points

            // Set the initial map region to the first point's latitude and longitude
            if (data.points.length > 0) {
              setMapRegion({
                latitude: data.points[0].latitude,
                longitude: data.points[0].longitude,
                latitudeDelta: 0.0008,
                longitudeDelta: 0.0007,
              });
            }

            setIsLoading(false);
          } else {
            Alert.alert('Error', 'Failed to fetch field details');
          }
        } catch (error) {
          console.error('Error fetching field data:', error);
          Alert.alert('Error', 'Failed to fetch field details');
          setIsLoading(false); // Stop the spinner if there was an error
        }
      } else {
        console.log('No fieldId or fieldName found in AsyncStorage');
        setIsLoading(false); // Stop the spinner if no data is found
      }
    };

    fetchFieldData();
  }, []);

  // Handle point selection and drawing on the map
  const handlePress = (e: any) => {
    if (isPartitioning) {
      const newPoint = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      };

      // Add the new point to partition points
      setPartitionPoints((prevPoints) => [...prevPoints, newPoint]);

      // Add marker for each point clicked on the map
      const newMarker = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
        label: partitionLabel,
        color: partitionColor,
      };
      setPartitionMarkers((prevMarkers) => [...prevMarkers, newMarker]);

      // Add undo action to the stack
      setUndoStack((prevStack) => [...prevStack, { action: 'add', point: newPoint }]);
    }
  };

  const handleSaveAllPartitions = () => {
    setShowSaveConfirmation(true); // Show confirmation modal before saving
  };

  

  // Handle marker dragging to adjust partition
  const handleMarkerDragEnd = (index: number, e: any) => {
    const updatedMarkers = [...partitionMarkers];
    updatedMarkers[index] = {
      ...updatedMarkers[index],
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };
    setPartitionMarkers(updatedMarkers);

    // Update the partition points with the new marker position
    const updatedPartitionPoints = [...partitionPoints];
    updatedPartitionPoints[index] = {
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    };
    setPartitionPoints(updatedPartitionPoints);
  };

  // Handle dragging between two points (adjusting the partition edge)
  const handleEdgeDrag = (index1: number, index2: number) => {
    const updatedPartitionPoints = [...partitionPoints];

    // Adjusting the coordinates of the second point based on the first point's position
    const point1 = updatedPartitionPoints[index1];
    const point2 = updatedPartitionPoints[index2];

    updatedPartitionPoints[index2] = {
      latitude: point1.latitude + (point2.latitude - point1.latitude) * 0.1, // Adjust the latitude as per user drag
      longitude: point1.longitude + (point2.longitude - point1.longitude) * 0.1, // Adjust the longitude as per user drag
    };

    setPartitionPoints(updatedPartitionPoints);
  };

  // Undo last partition action
  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack[undoStack.length - 1];
      if (lastAction.action === 'add') {
        setPartitionPoints((prevPoints) => prevPoints.slice(0, prevPoints.length - 1));
        setPartitionMarkers((prevMarkers) => prevMarkers.slice(0, prevMarkers.length - 1)); // Remove last marker
      }
      setUndoStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
    }
  };

  const handleClosePartition = () => {
    setPartitionPoints([]);
    setPartitionMarkers([]);
    setUndoStack([]);
    setShowButtons(false);
    setIsPartitioning(false); 
    setShowSaveButton2(true);
  };
  
  
  

  // Handle partition label and color input
  const openPartitionModal = () => {
    setShowPartitionModal(true); // Show modal to enter partition details
  };

  const closePartitionModal = () => {
    setShowPartitionModal(false); // Close partition modal
  };

  const confirmSaveAllPartitions = async () => {
    setShowSaveConfirmation(false); // Close modal
  
    try {
      if (partitionData.length === 0) {
        Alert.alert("Error", "No partition to save");
        return;
      }
  
      const response = await fetch('https://plot-pro.vercel.app/api/fields/addPartition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldId, partitionData }), // ✅ Sending the entire array correctly
      });
  
      if (!response.ok) {
        throw new Error('Failed to save partitions');
      }
  
      Alert.alert('Success', 'All partition data saved successfully!');
  
      setPartitionData([]); // Clear saved partitions
      setShowButtons(false); // Hide partition controls
      setIsPartitioning(false); // Ensure partitioning mode is off
      setShowSaveButton2(true); // ✅ Ensure Save Button 2 appears after saving
    } catch (error) {
      Alert.alert('Error', 'Failed to save partition data');
    }
  };
  
  
  
  

  const handlePartitionCreate = () => {
    if (partitionLabel && partitionColor) {
      const newPartition = {
        label: partitionLabel,
        color: partitionColor,
        points: partitionPoints,
      };
      setPartitionData((prevData) => [...prevData, newPartition]);
      setPartitionMarkers([]); // Reset partition markers after partition is added
      setPartitionPoints([]); // Reset partition points after partition is added
      setUndoStack([]); // Reset undo stack
      setShowButtons(false); // Hide buttons after saving partition
      setIsPartitioning(false); // End the partitioning action
      closePartitionModal(); // Close modal
      setShowSaveButton2(true);
    } else {
      Alert.alert('Error', 'Please provide both label and color for the partition.');
    }
  };

  const handleStartPartition = () => {
    setIsPartitioning(true);
    setShowButtons(true);
    setShowSaveButton2(false); // ✅ Hide Save Button 2 when partitioning starts
  };
  
  
  const handleSave = async () => {
    try {
      if (partitionData.length === 0) {
        Alert.alert("Error", "No partition to save");
        return;
      }
  
      for (let partition of partitionData) {
        const data = {
          fieldId,
          partitionLabel: partition.label,
          partitionColor: partition.color,
          partitionPoints: partition.points,
        };
  
        const response = await fetch('https://plot-pro.vercel.app/api/fields/addPartition', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save partition');
        }
      }
  
      Alert.alert('Success', 'Partition data saved successfully!');
      setPartitionData([]); 
      setShowButtons(false);
      setIsPartitioning(false); // ✅ Ensure partitioning mode is off
      setShowSaveButton2(true); // ✅ Ensure Save Button 2 appears again
    } catch (error) {
      Alert.alert('Error', 'Failed to save partition data');
    }
  };
  
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2793e7" />
        <Text style={styles.loadingText}>Loading field data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onPress={handlePress}
        mapType="satellite" // Set the map type to satellite
        region={mapRegion} // Use the dynamic region once the data is loaded
      >
        {/* Render the polygon for partitioning */}
        {mainFieldPoints.length > 0 && (
          <Polygon
            coordinates={mainFieldPoints}
            strokeColor="blue"
            fillColor="rgba(0, 0, 255, 0.3)"
          />
        )}

        {/* Render Partition Polygons and Dots */}
        {partitionData.map((partition, index) => (
          <View key={index}>
            <Polygon
              coordinates={partition.points}
              strokeColor={partition.color}
              fillColor={`${partition.color}99`} // Apply transparency to highlight color
            />
            {/* Render Red Dots on the edges of the partition */}
            {partition.points.map((point, idx) => (
              <Marker
                key={idx}
                coordinate={point}
                pinColor="red" // Red dots on the edges
                draggable
                onDragEnd={(e) => handleMarkerDragEnd(idx, e)} // Handle marker dragging
              />
            ))}
            {/* Display Partition Label in the middle of the partition */}
            <Marker
              coordinate={{
                latitude: (partition.points[0].latitude + partition.points[1].latitude) / 2,
                longitude: (partition.points[0].longitude + partition.points[1].longitude) / 2,
              }}
              title={partition.label}
              description={partition.label}
              pinColor={partition.color} // Use the partition color
            />
          </View>
        ))}

        {/* Render markers for partitioning */}
        {partitionMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            pinColor={marker.color} // Use the selected color for the partition
            title={marker.label} // Show label name on the marker
            draggable
            onDragEnd={(e) => handleMarkerDragEnd(index, e)} // Handle marker dragging
          />
        ))}
      </MapView>

      <View style={styles.buttonContainer}>
  {/* Save Button 2 - Saves all partitions at once */}
{/* Save Button 2 - Opens Confirmation Modal */}
{showSaveButton2 && (
  <TouchableOpacity onPress={handleSaveAllPartitions} style={styles.iconButton}>
    <Icon name="save" size={30} color="#fff" />
  </TouchableOpacity>
)}


  {/* Start Partition Button */}
  <TouchableOpacity onPress={handleStartPartition} style={styles.iconButton}>
    <Icon name="plus-circle" size={30} color="#fff" />
  </TouchableOpacity>

  {/* Show Undo, Close, and Save Buttons during partitioning */}
  {showButtons && (
    <>
      <TouchableOpacity onPress={handleUndo} style={styles.iconButton}>
        <Icon name="undo" size={30} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleClosePartition} style={styles.iconButton}>
        <Icon name="times" size={30} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={openPartitionModal} style={styles.iconButton}>
        <Icon name="save" size={30} color="#fff" />
      </TouchableOpacity>
    </>
  )}
</View>

      {/* Partition Modal */}
      <Modal visible={showPartitionModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Partition</Text>
            <TextInput
              style={styles.input}
              placeholder="Partition Label (e.g. A)"
              value={partitionLabel}
              onChangeText={setPartitionLabel}
            />
            <Text style={styles.inputLabel}>Select Partition Color:</Text>
            <Picker
              selectedValue={partitionColor}
              onValueChange={(itemValue) => setPartitionColor(itemValue)}
            >
              <Picker.Item label="Red" value="#FF0000" />
              <Picker.Item label="Blue" value="#0000FF" />
              <Picker.Item label="Green" value="#008000" />
              <Picker.Item label="Yellow" value="#FFFF00" />
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handlePartitionCreate} style={styles.saveButton}>
                <Text style={styles.buttonText}>Create Partition</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={closePartitionModal} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>


      {/* Save Confirmation Modal */}
<Modal visible={showSaveConfirmation} transparent={true} animationType="fade">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Confirm Save</Text>
      <Text style={styles.confirmText}>
        Do you want to save the field with partitions?
      </Text>
      <View style={styles.modalButtons}>
        <TouchableOpacity onPress={confirmSaveAllPartitions} style={styles.saveButton}>
          <Text style={styles.buttonText}>Yes, Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowSaveConfirmation(false)} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    fontSize: 18,
    color: '#2793e7',
    marginTop: 10,
  },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  iconButton: {
    backgroundColor: '#2793e7',
    padding: 10,
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#2793e7',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  
});
