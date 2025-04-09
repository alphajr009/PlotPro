import React from 'react';
import { View, Text } from 'react-native';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function Setup2() {
  const router = useRouter();

  return (
    <View>
      <Text>Setup Step 2 - Dummy Content</Text>
      <Button title="Next" onPress={() => router.push('/(auth)/setup/setup3')} />
      <Button title="Skip" onPress={() => router.replace('/(auth)/register')} />
    </View>
  );
}
