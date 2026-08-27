import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface LiveInputProps {}

export const LiveInput = ({}: LiveInputProps) => {
  const [text, setText] = useState<string>("");

  const handleChangeText = (value: string) => {
    setText(value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập nội dung..."
        value={text}
        onChangeText={handleChangeText}
      />

      <Text style={styles.counter}>Số ký tự: {text.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  counter: {
    marginTop: 10,
    fontSize: 16,
  },
});
