import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  incrementByFive,
  reset,
  selectCounterStep,
  selectCounterValue,
  setStep,
} from './store/counterSlice';
import type { AppDispatch } from './store';

export default function CounterScreen() {
  const dispatch = useDispatch<AppDispatch>();

  // Dùng selector đã định nghĩa sẵn (Phần V & X.4)
  // Hoặc có thể viết: useSelector((state: RootState) => state.counter.value)
  const counter = useSelector(selectCounterValue);
  const step = useSelector(selectCounterStep);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux Toolkit Counter</Text>

      <View style={styles.counterCard}>
        <Text style={styles.label}>Giá trị hiện tại</Text>
        <Text style={styles.counterValue}>{counter}</Text>
        <Text style={styles.stepInfo}>Bước nhảy (step): {step}</Text>
      </View>

      {/* Nút cơ bản: Tăng / Giảm */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>- Giảm ({step})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>+ Tăng ({step})</Text>
        </TouchableOpacity>
      </View>

      {/* Phần X: Bài tập nâng cao (+5, Reset, đổi Step) */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, styles.plusFiveButton]}
          onPress={() => dispatch(incrementByFive())}
        >
          <Text style={styles.buttonText}>+ 5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={() => dispatch(reset())}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stepSection}>
        <Text style={styles.stepTitle}>Chọn Step:</Text>
        <View style={styles.stepRow}>
          {[1, 2, 5, 10].map((val) => (
            <TouchableOpacity
              key={val}
              style={[
                styles.stepChip,
                step === val && styles.stepChipActive,
              ]}
              onPress={() => dispatch(setStep(val))}
            >
              <Text
                style={[
                  styles.stepChipText,
                  step === val && styles.stepChipTextActive,
                ]}
              >
                {val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 24,
  },
  counterCard: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    maxWidth: 320,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  label: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  counterValue: {
    fontSize: 72,
    fontWeight: '800',
    color: '#2563EB',
    marginVertical: 8,
  },
  stepInfo: {
    fontSize: 14,
    color: '#475569',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    maxWidth: 320,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  incrementButton: {
    backgroundColor: '#16A34A',
  },
  decrementButton: {
    backgroundColor: '#DC2626',
  },
  plusFiveButton: {
    backgroundColor: '#2563EB',
  },
  resetButton: {
    backgroundColor: '#475569',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  stepSection: {
    marginTop: 16,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 10,
  },
  stepChip: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  stepChipActive: {
    backgroundColor: '#0F172A',
  },
  stepChipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  stepChipTextActive: {
    color: '#FFFFFF',
  },
});

