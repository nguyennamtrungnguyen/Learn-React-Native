import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { LoadingContainer } from "./LoadingContainer";

export default function Lab06() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 6: Loading Wrapper</Text>

      <LoadingContainer isLoading={true}>
        <Text>Dữ liệu đã tải xong!</Text>
      </LoadingContainer>
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