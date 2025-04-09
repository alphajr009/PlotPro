import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/config';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<any>({});

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        setEditedUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser),
      });

      const result = await response.json();

      if (response.ok) {
        // Save the updated user data
        await AsyncStorage.setItem('user', JSON.stringify(result));

        setUser(result); // Update the local state with the updated user
        setIsEditing(false);
        Alert.alert("Success", "Profile updated successfully.");
      } else {
        Alert.alert("Error", result.message || "Update failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <TextInput
        style={styles.input}
        value={isEditing ? editedUser.name : user?.name}
        editable={isEditing}
        onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
      />
      <TextInput
        style={styles.input}
        value={isEditing ? editedUser.email : user?.email}
        editable={isEditing}
        onChangeText={(text) => setEditedUser({ ...editedUser, email: text })}
      />

      <TouchableOpacity style={styles.button} onPress={isEditing ? handleSave : handleEdit}>
        <Text style={styles.buttonText}>{isEditing ? "Save Changes" : "Edit Profile"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => router.replace('/(auth)/login')}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#0066ff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  logoutButton: { marginTop: 20, backgroundColor: '#ff6347', padding: 15, borderRadius: 8, alignItems: 'center' },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
