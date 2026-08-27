import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProgressProps {
  progress: number;
}

export const Progress = ({ progress }: ProgressProps) => {
  if (progress < 0 || progress > 100) {
    return (
      <Text style={styles.error}>
        Lỗi: Progress phải từ 0 đến 100
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Tiến trình: {progress}%
      </Text>

      <View style={styles.background}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  background: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "blue",
  },
  error: {
    fontSize: 16,
  },
});