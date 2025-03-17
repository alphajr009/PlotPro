import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function PartitionScreen() {
  const router = useRouter();
  const [fieldId, setFieldId] = useState<string | null>(null);
  const [fieldName, setFieldName] = useState<string>('');

  useEffect(() => {
    // Make sure router.query is available before accessing it
    if (router.query?.fieldId && router.query?.fieldName) {
      const { fieldId, fieldName } = router.query; // Retrieve query parameters
      setFieldId(fieldId as string);
      setFieldName(fieldName as string);
    }
  }, [router.query]); // Re-run effect when query changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partition Field</Text>

      {/* Display Field ID and Name */}
      <View style={styles.fieldInfo}>
        <Text style={styles.fieldText}>Field ID: {fieldId}</Text>
        <Text style={styles.fieldText}>Field Name: {fieldName}</Text>
      </View>

      {/* Add additional content here for partition */}
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
  fieldInfo: {
    marginBottom: 20,
  },
  fieldText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
