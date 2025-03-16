import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MeasureScreen1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Measure Screen 1</Text>
      <Text>Dummy content for the first measure screen goes here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
