import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FieldsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fields</Text>
      <Text>Content for Fields tab will go here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
});
