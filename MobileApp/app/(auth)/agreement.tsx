import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import Button from '@/components/ui/Button';
import { useRouter } from 'expo-router';

export default function AgreementScreen() {
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (agreed) {
      router.replace('/(auth)/permissions');
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
  checkboxContainer: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
  label: { marginLeft: 8, fontSize: 16 },
});
