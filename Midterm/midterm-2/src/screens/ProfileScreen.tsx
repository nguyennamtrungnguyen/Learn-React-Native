import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const ProfileScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", gap: 10 }}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          color: "blue",
        }}
      >
        Thông Tin Sinh Viên
      </Text>
      <TextInput label={"Họ Tên"} value="Nguyễn Nam Trung Nguyên" />
      <TextInput label={"MSSV"} value="23640731" />
      <TextInput label={"Lớp"} value="DHKTPM19ATT" />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
