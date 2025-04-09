import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';

const { height, width } = Dimensions.get('window');

const MapDetailsPanel = ({ mapDetails, onClose }) => {
  if (!mapDetails) return null;

  const { mapDetails: map, fenceDetails, plantationDetails } = mapDetails;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{map.templateName}</Text>
      
      <ScrollView style={styles.mainScrollView} showsVerticalScrollIndicator={true}>
        <Collapse>
          <CollapseHeader>
            <View style={styles.header}>
              <Text style={styles.headerText}>Map Details</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <View style={styles.content}>
              <Text>Area: {map.Area ? parseFloat(map.Area).toFixed(2) : 'N/A'} perch</Text>
              <Text>Perimeter: {map.Perimeter ? parseFloat(map.Perimeter).toFixed(2) : 'N/A'} km</Text>
              <Text>Land Type: {map.landType || 'N/A'}</Text>
              <Text>Location: {map.location || 'N/A'}</Text>
              <Text>Description: {map.description || 'N/A'}</Text>
            </View>
          </CollapseBody>
        </Collapse>

        {plantationDetails && (
          <Collapse>
            <CollapseHeader>
              <View style={styles.header}>
                <Text style={styles.headerText}>Plantation Details</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={styles.content}>
                <Text>Number of Plants: {plantationDetails.numberOfPlants}</Text>
                <Text>Plant Type: {plantationDetails.plantType}</Text>
                <Text>Plant Space: {plantationDetails.plantSpace} {plantationDetails.unit}</Text>
                <Text>Row Space: {plantationDetails.rowSpace} {plantationDetails.unit}</Text>
                <Text>Plant Density: {plantationDetails.plantDensity}</Text>
              </View>
            </CollapseBody>
          </Collapse>
        )}

        {fenceDetails && (
          <Collapse>
            <CollapseHeader>
              <View style={styles.header}>
                <Text style={styles.headerText}>Fence Details</Text>
              </View>
            </CollapseHeader>
            <CollapseBody>
              <View style={styles.content}>
                <Text>Post Space: {fenceDetails.postSpace} {fenceDetails.postSpaceUnit}</Text>
                <Text>Number of Sticks: {fenceDetails.numberOfSticks}</Text>
                <Text>Fence Type: {fenceDetails.fenceType}</Text>
                <Text>Number of Gates: {fenceDetails.fenceAmount ? fenceDetails.fenceAmount.join(', ') : 'N/A'}</Text>
                <Text>Gate Lengths: {fenceDetails.fenceLength ? fenceDetails.fenceLength.join(', ') : 'N/A'}</Text>
              </View>
            </CollapseBody>
          </Collapse>
        )}
      </ScrollView>

      <TouchableOpacity 
        style={styles.closeButton} 
        onPress={() => {
          onClose();
        }}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 35,
    top: 80,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.8,
    maxHeight: height * 0.8,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  mainScrollView: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
  closeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MapDetailsPanel;