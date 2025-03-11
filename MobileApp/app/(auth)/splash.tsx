import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const alreadyLaunched = await AsyncStorage.getItem('firstLaunch');

      if (alreadyLaunched === 'true') {
        router.replace('/(auth)/register'); // Skip setup if launched before
      } else {
        router.replace('/(auth)/agreement'); // Go to Agreement first time
      }
    };

    setTimeout(() => {
      checkFirstLaunch();
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
