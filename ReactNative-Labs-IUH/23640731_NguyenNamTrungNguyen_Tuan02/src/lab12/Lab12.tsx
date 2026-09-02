import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { CustomError, testApiError } from "./api";

const Lab12 = () => {
  const handleRequest = async () => {
    try {
      await testApiError();

      Alert.alert("Thành công", "API gọi thành công!");
    } catch (error: unknown) {
      // Ép kiểu error về CustomError
      const customError = error as CustomError;

      Alert.alert(
        "Lỗi API",
        customError.status
          ? `${customError.message}\nStatus: ${customError.status}`
          : customError.message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 12: API Error Handling</Text>

      <Text style={styles.description}>
        Nhấn nút bên dưới để gọi API sai URL
      </Text>

      <Button title="Gọi API" onPress={handleRequest} />
    </View>
  );
};

export default Lab12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});
