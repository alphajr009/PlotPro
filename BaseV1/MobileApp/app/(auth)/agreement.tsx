import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AgreementScreen() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (agreed) {
      try {
        // Save that the user has agreed to the terms, and it's no longer the first launch
        await AsyncStorage.setItem('firstLaunch', 'true');

        // Navigate to the permissions screen or the next setup screen
        router.replace('/(auth)/permissions');
      } catch (error) {
        console.error('Error saving first launch data:', error);
        Alert.alert('Error', 'Something went wrong, please try again.');
      }
    } else {
      Alert.alert('Error', 'You must agree to the terms and conditions to continue.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please accept terms & conditions.</Text>

      <View style={styles.checkboxContainer}>
        <Checkbox value={agreed} onValueChange={setAgreed} />
        <Text style={styles.label}>I Agree</Text>
      </View>

      <Button title="Continue" disabled={!agreed} onPress={handleContinue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 18, marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  label: { marginLeft: 8, fontSize: 16 },
});
