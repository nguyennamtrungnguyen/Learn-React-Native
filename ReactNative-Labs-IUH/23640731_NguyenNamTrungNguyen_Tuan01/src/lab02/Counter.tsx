import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <View>
      <Text>{count}</Text>
      <Pressable onPress={() => setCount(count + 1)}>
        <Text>Tăng +</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          count > 0
            ? setCount(count - 1)
            : Toast.show({
                type: "info",
                text1: "Không thể giảm khi giá trị nhỏ hơn 0",
              });
        }}
      >
        <Text>Giảm -</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({});
