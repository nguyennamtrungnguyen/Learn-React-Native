import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";

export const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <View style={styles.counter}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.counter_button}>
        <Pressable
          style={styles.button_decrease}
          onPress={() => {
            count > 0
              ? setCount(count - 1)
              : Toast.show({
                  type: "info",
                  text1: "Không thể giảm khi giá trị nhỏ hơn 0",
                });
          }}
        >
          <Text style={styles.buttonText}>Giảm -</Text>
        </Pressable>
        <Pressable
          style={styles.button_increase}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>Tăng +</Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  counter: {
    flex: 1,
    alignItems: "center",
  },
  counter_button: {
    gap: 20,
    flexDirection: "row",
  },
  count: {
    fontSize: 40,
    marginBottom: 20,
    color: "red",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button_increase: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 8,
  },
  button_decrease: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
});
