import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function RegisterScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} /> 
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

       
        <View style={styles.linkContainer}>
          <Text style={styles.link}>Already have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.linkButton}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
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
