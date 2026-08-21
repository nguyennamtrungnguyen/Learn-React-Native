import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { UserCard } from "./UserCard";

/*  Bài 1: Thẻ thông tin thành viên (UserCard)
        Mục tiêu: Biết định nghĩa kiểu dữ liệu cơ bản cho Props của một Functional Component.
        Bài tập: Tạo component UserCard nhận vào name (string), age (number), và isAdmin (boolean) để hiển thị giao diện khác nhau cho Admin.
 	    Kiến thức cần học: interface, primitive types (string, number, boolean).
*/

const Lab01 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bài 1: UserCard</Text>
      <UserCard name="Nguyen Nam Trung Nguyen" age={22} isAdmin={true} />
      <UserCard name="Bui Thi Kieu Trang" age={21} isAdmin={false} />
      <UserCard name="Nguyen Duy Khoi" age={12} isAdmin={false} />
      <UserCard name="Nguyen Quynh Yen Nhi" age={20} isAdmin={false} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default Lab01;
