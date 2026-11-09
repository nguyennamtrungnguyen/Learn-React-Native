import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider, useSelector } from 'react-redux';
import store, { RootState } from './src/store';
import Level1Cart from './src/components/Level1Cart';
import Level2Cart from './src/components/Level2Cart';
import ShoppingCart from './src/components/ShoppingCart';
import { selectLevel2CartItemCount } from './src/slices/level2CartSlice';
import { selectCartSummary } from './src/slices/cartSelectors';

type ActiveLevel = 1 | 2 | 3;

function MainScreen() {
  const [activeLevel, setActiveLevel] = useState<ActiveLevel>(3);

  const l1Count = useSelector(
    (state: RootState) => state.level1Cart.items.length
  );
  const l2Count = useSelector(selectLevel2CartItemCount);
  const l3Count = useSelector(selectCartSummary).itemCount;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.topHeader}>
        <View style={styles.titleRow}>
          <Text style={styles.appTitle}>🛒 Redux Toolkit Shopping Cart</Text>
          <Text style={styles.studentTag}>Tuần 10 • RTK</Text>
        </View>

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
              Level 1 ({l1Count})
            </Text>
            <Text
              style={[
                styles.tabSubText,
                activeLevel === 1 && styles.tabButtonTextActive,
              ]}
            >
              Cơ Bản
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
              Level 2 ({l2Count})
            </Text>
            <Text
              style={[
                styles.tabSubText,
                activeLevel === 2 && styles.tabButtonTextActive,
              ]}
            >
              Nâng Cao
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeLevel === 3 && styles.tabButtonActiveL3,
            ]}
            onPress={() => setActiveLevel(3)}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeLevel === 3 && styles.tabButtonTextActive,
              ]}
            >
              Level 3 ({l3Count})
            </Text>
            <Text
              style={[
                styles.tabSubText,
                activeLevel === 3 && styles.tabButtonTextActive,
              ]}
            >
              Chuyên Nghiệp
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeLevel === 1 && <Level1Cart />}
      {activeLevel === 2 && <Level2Cart />}
      {activeLevel === 3 && <ShoppingCart />}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  topHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  studentTag: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#475569',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    gap: 6,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 7,
    borderRadius: 9,
    alignItems: 'center',
  },
  tabButtonActiveL1: {
    backgroundColor: '#4F46E5',
  },
  tabButtonActiveL2: {
    backgroundColor: '#059669',
  },
  tabButtonActiveL3: {
    backgroundColor: '#D97706',
  },
  tabButtonText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#334155',
  },
  tabSubText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 1,
  },
  tabButtonTextActive: {
    color: '#FFFFFF',
  },
});
