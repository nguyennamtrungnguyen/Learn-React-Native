import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LiveInput } from "./LiveInput";

export default function Lab05() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 5: Live Input</Text>

      <LiveInput />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
