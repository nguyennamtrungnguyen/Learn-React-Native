import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { GenderSelector } from "./GenderSelector";

export default function Lab07() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 7: Gender Selector</Text>

      <GenderSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
});