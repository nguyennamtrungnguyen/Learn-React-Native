import React from "react";
import { Text, View } from "react-native";
import { UserCard } from "./UserCard";

/*  Bài 1: Thẻ thông tin thành viên (UserCard)
        Mục tiêu: Biết định nghĩa kiểu dữ liệu cơ bản cho Props của một Functional Component.
        Bài tập: Tạo component UserCard nhận vào name (string), age (number), và isAdmin (boolean) để hiển thị giao diện khác nhau cho Admin.
 	    Kiến thức cần học: interface, primitive types (string, number, boolean).
*/
const Lab01 = () => {
  return (
    <View>
      <Text>Bài 1: UserCard</Text>
      <UserCard name="Nguyen Nam Trung Nguyen" age={22} isAdmin={true} />
    </View>
  );
};

export default Lab01;
