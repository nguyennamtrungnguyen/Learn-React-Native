import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Progress } from "./Progress";

export default function Lab08() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 8: Progress Bar</Text>

      <Progress progress={25} />

      <Progress progress={50} />

      <Progress progress={80} />

      <Progress progress={100} />
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
    marginBottom: 20,
  },
});
