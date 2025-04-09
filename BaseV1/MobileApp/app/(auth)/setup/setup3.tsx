import React from 'react';
import { View, Text } from 'react-native';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function Setup3() {
  const router = useRouter();

  return (
    <View>
      <Text>Setup Step 3 - Dummy Content</Text>
      <Button title="Finish" onPress={() => router.replace('/(auth)/register')} />
    </View>
  );
}
