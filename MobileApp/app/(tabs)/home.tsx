import React from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome!</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      
      <TextInput style={styles.input} placeholder="email" />
      <TextInput style={styles.input} placeholder="password" secureTextEntry />

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.link}>Forgot Password?</Text>
      
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity><Text style={{ color: 'blue' }}>Sign Up</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  welcome: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginBottom: 20 },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginVertical: 8 },
  loginButton: { backgroundColor: '#0066ff', padding: 15, borderRadius: 8, alignItems: 'center' },
});
