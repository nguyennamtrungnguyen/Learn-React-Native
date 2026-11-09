import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/store';
import Level1Cart from './src/components/Level1Cart';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.topHeader}>
          <Text style={styles.appTitle}>Redux Toolkit Shopping Cart</Text>
          <Text style={styles.appSubtitle}>Level 1: Giỏ Hàng Cơ Bản</Text>
        </View>
        <Level1Cart />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  appSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 2,
  },
});
