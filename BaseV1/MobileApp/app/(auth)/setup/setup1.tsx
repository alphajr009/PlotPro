import React from 'react';
import { View, Text } from 'react-native';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function Setup1() {
  const router = useRouter();

  return (
    <View>
      <Text>Setup Step 1 - Dummy Content</Text>
      <Button title="Next" onPress={() => router.push('/(auth)/setup/setup2')} />
      <Button title="Skip" onPress={() => router.replace('/(auth)/register')} />
    </View>
  );
}
