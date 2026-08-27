import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Gender = "male" | "female" | "other";

export const GenderSelector = () => {
  const [gender, setGender] = useState<Gender>("male");

  return (
    <View style={styles.container}>
      <Text style={styles.result}>
        Giới tính: {gender}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setGender("male")}
      >
        <Text>Nam</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setGender("female")}
      >
        <Text>Nữ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setGender("other")}
      >
        <Text>Khác</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  result: {
    fontSize: 18,
    marginBottom: 15,
  },
  button: {
    width: 150,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
});