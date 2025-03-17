import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PartitionScreen() {
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [fieldName, setFieldName] = useState<string>('');

  useEffect(() => {
    const fetchFieldData = async () => {
      // Retrieve both fieldId and fieldName from AsyncStorage
      const storedFieldId = await AsyncStorage.getItem('tempFieldId');
      const storedFieldName = await AsyncStorage.getItem('fieldName');
      
      if (storedFieldId && storedFieldName) {
        setFieldId(storedFieldId);
        setFieldName(storedFieldName);
      } else {
        console.log('No fieldId or fieldName found in AsyncStorage');
      }
    };

    fetchFieldData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partition Field</Text>
      <Text style={styles.fieldText}>Field ID: {fieldId}</Text>
      <Text style={styles.fieldText}>Field Name: {fieldName}</Text>
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
