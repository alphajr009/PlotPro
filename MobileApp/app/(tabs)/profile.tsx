import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name: John Doe</Text>
        <Text style={styles.label}>Email: john.doe@example.com</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  profileContainer: { marginTop: 30 },
  label: { fontSize: 18, marginBottom: 10 },
  button: {
    backgroundColor: '#0066ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutButton: { backgroundColor: '#ff4d4d' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
