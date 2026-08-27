import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Counter } from "./Counter";

// Bài 2: Bộ đếm số tăng giảm (Counter)
// 	Mục tiêu: Hiểu cách TypeScript tự động suy luận kiểu (Type Inference) với React State.
// 	Bài tập: Tạo component Counter có 2 nút tăng/giảm giá trị. Giới hạn không cho giảm xuống dưới 0.
// 	Kiến thức cần học: useState với kiểu dữ liệu ngầm định và tường minh (useState<number>).

export const Lab02 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 2: Counter</Text>
      <Counter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
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
