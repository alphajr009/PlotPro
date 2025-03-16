import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkUserLogin = async () => {
      const userData = await AsyncStorage.getItem('user');

      if (userData) {
        // If user data exists, redirect to the home screen
        router.replace('/(tabs)/home');
      } else {
        // If no user data, redirect to login screen
        router.replace('/(auth)/login');
      }
    };

    setTimeout(() => {
      checkUserLogin();
    }, 800);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/react-logo.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 200, height: 200, resizeMode: 'contain' },
});
