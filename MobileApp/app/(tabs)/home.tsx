import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <View style={styles.tabContainer}>
        <Ionicons name="ruler" size={30} color="#0066ff" />
        <Text style={styles.tabText}>Measure</Text>
      </View>

      <View style={styles.tabContainer}>
        <Ionicons name="ios-home" size={30} color="#0066ff" />
        <Text style={styles.tabText}>Fields</Text>
      </View>

      <View style={styles.tabContainer}>
        <Ionicons name="ios-briefcase" size={30} color="#0066ff" />
        <Text style={styles.tabText}>Work</Text>
      </View>

      <View style={styles.tabContainer}>
        <Ionicons name="ios-bar-chart" size={30} color="#0066ff" />
        <Text style={styles.tabText}>Insights</Text>
      </View>

      <View style={styles.tabContainer}>
        <Ionicons name="ios-person" size={30} color="#0066ff" />
        <Text style={styles.tabText}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center' },
  tabContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  tabText: { fontSize: 18, marginLeft: 10 },
});
