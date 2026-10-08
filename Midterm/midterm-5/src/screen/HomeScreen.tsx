import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 25,
          textAlign: "center",
          fontWeight: "bold",
          color: "blue",
          marginBottom: 30,
        }}
      >
        Chào Mừng Bạn Đến Với Ứng Dụng Của Chúng Tôi
      </Text>
      <Button
        mode="contained"
        buttonColor="blue"
        onPress={() => navigation.navigate("Movie")}
      >
        Đặt Vé Xem Phim
      </Button>
      <Button
        mode="contained"
        buttonColor="red"
        onPress={() => navigation.navigate("Profile")}
      >
        Quản Lý Thông Tin
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
