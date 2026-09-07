import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

export const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TextInput label={"Họ tên"} value="Trung Nguyên" />
      <TextInput label={"MSSV"} value="23640731" />
      <TextInput label={"Lớp học"} value="DHKTPM19ATT" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 20,
    padding: 10,
  },
});
