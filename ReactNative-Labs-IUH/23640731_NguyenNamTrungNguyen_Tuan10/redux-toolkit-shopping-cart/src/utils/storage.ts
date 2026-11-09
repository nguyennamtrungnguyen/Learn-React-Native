import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const CART_STORAGE_KEY = 'cartItems';

export const storage = {
  getItemSync: <T>(fallback: T): T => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as T) : fallback;
      }
    } catch {
      // Ignore storage read errors
    }
    return fallback;
  },

  getItemAsync: async <T>(fallback: T): Promise<T> => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as T) : fallback;
      }
      const raw = await AsyncStorage.getItem(CART_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },

  setItem: (value: unknown): void => {
    try {
      const serialized = JSON.stringify(value);
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(CART_STORAGE_KEY, serialized);
        return;
      }
      void AsyncStorage.setItem(CART_STORAGE_KEY, serialized);
    } catch {
      // Ignore storage write errors
    }
  },

  removeItem: (): void => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(CART_STORAGE_KEY);
        return;
      }
      void AsyncStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Ignore storage remove errors
    }
  },
};
