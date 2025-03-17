import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PartitionScreen() {
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [fieldName, setFieldName] = useState<string>('');
  const [fieldDetails, setFieldDetails] = useState<any>(null); 

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
          } else {
            Alert.alert('Error', 'Failed to fetch field details');
          }
        } catch (error) {
          console.error('Error fetching field data:', error);
          Alert.alert('Error', 'Failed to fetch field details');
        }
      } else {
        console.log('No fieldId or fieldName found in AsyncStorage');
      }
    };

    fetchFieldData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partition Field</Text>
      {fieldDetails ? (
        <>
          <Text style={styles.fieldText}>Field ID: {fieldDetails._id}</Text>
          <Text style={styles.fieldText}>Field Name: {fieldDetails.name}</Text>
          <Text style={styles.fieldText}>Area: {fieldDetails.area} m²</Text>
          <Text style={styles.fieldText}>Perimeter: {fieldDetails.perimeter} m</Text>
        </>
      ) : (
        <Text style={styles.fieldText}>Loading field details...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  fieldText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
