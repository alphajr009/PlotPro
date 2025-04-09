import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/config';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Save user data to AsyncStorage
        await AsyncStorage.setItem('user', JSON.stringify(result));

        // Redirect to the profile screen
        router.replace('/(tabs)/profile');
      } else {
        Alert.alert("Error", result.message || "Login failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linkContainer}>
        <Text style={styles.link}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.linkButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f0f0f0', padding: 12, borderRadius: 8, marginBottom: 10 },
  button: { backgroundColor: '#0066ff', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  linkContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  link: { fontSize: 14, color: '#000' },
  linkButton: { fontSize: 14, color: 'blue', marginLeft: 5 },
});
