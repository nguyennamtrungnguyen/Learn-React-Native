// Bài 3: Danh sách việc cần làm đơn giản (Todo Basic)
// 	Mục tiêu: Quản lý State dạng mảng chứa các object có cấu trúc.
// 	Bài tập: Tạo màn hình TodoList chứa mảng các task. Mỗi task gồm id (string) và title (string). Hiển thị ra màn hình bằng map().
// 	Kiến thức cần học: Định nghĩa mảng object (Todo[] hoặc Array<Todo>).

import { StyleSheet, Text, View } from "react-native";
import { TodoList } from "./TodoList";

export const Lab03 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 3: Todo Basic</Text>
      <TodoList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "blue",
  },
});
