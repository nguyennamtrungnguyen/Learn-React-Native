import React from "react";
import { View, Alert, StyleSheet, Text } from "react-native";
import { MyButton } from "./MyButton";

export default function Lab04() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 4: Custom Button</Text>
      <MyButton
        label="Button màu xanh"
        onPress={() => Alert.alert("Bạn đã nhấn nút xanh")}
      />

      <MyButton
        label="Button màu đỏ"
        color="red"
        onPress={() => Alert.alert("Bạn đã nhấn nút đỏ")}
      />

      <MyButton
        label="Button màu xanh lá"
        color="green"
        onPress={() => Alert.alert("Bạn đã nhấn nút xanh lá")}
      />
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
    color: "blue",
  },
});
