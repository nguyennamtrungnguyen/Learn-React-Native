import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import store from './src/store';
import Level1Cart from './src/components/Level1Cart';
import Level2Cart from './src/components/Level2Cart';

type ActiveLevel = 1 | 2;

export default function App() {
  const [activeLevel, setActiveLevel] = useState<ActiveLevel>(2);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />
        <View style={styles.topHeader}>
          <Text style={styles.appTitle}>Redux Toolkit Shopping Cart</Text>
          <View style={styles.tabBar}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeLevel === 1 && styles.tabButtonActiveL1,
              ]}
              onPress={() => setActiveLevel(1)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeLevel === 1 && styles.tabButtonTextActive,
                ]}
              >
                Level 1: Cơ Bản
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tabButton,
                activeLevel === 2 && styles.tabButtonActiveL2,
              ]}
              onPress={() => setActiveLevel(2)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeLevel === 2 && styles.tabButtonTextActive,
                ]}
              >
                Level 2: Nâng Cao
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {activeLevel === 1 ? <Level1Cart /> : <Level2Cart />}
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
    gap: 10,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 4,
    gap: 6,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  tabButtonActiveL1: {
    backgroundColor: '#4F46E5',
  },
  tabButtonActiveL2: {
    backgroundColor: '#059669',
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
});
