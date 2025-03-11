import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePermissions } from '@/hooks/usePermissions';
import { useRouter } from 'expo-router';

export default function PermissionsScreen() {
  const { requestAllPermissions, checkPermissions } = usePermissions();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const alreadyGranted = await checkPermissions();

      if (!alreadyGranted) {
        await requestAllPermissions();
      }
      
      await AsyncStorage.setItem('firstLaunch', 'true');
      router.replace('/(auth)/setup/setup1');
      setIsChecking(false);
    })();
  }, []);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Requesting Permissions...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Requesting Permissions...</Text>
    </View>
  );
}
