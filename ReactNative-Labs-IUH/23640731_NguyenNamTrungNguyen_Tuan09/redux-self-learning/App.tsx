import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './store';
import CounterScreen from './CounterScreen';

export default function App() {
  return (
    <Provider store={store}>
      <CounterScreen />
      <StatusBar style="auto" />
    </Provider>
  );
}
