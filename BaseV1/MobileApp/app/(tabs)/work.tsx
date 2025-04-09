import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WorkScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work</Text>
      <Text>Content for Work tab will go here.</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create New Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Tasks</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  button: {
    backgroundColor: '#0066ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
