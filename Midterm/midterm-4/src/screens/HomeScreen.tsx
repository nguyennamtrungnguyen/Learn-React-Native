import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View style={{ gap: 10 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 30,
            textAlign: "center",
            color: "blue",
          }}
        >
          Chào Mừng Bạn Đến
        </Text>
        <Button
          mode="contained"
          buttonColor="blue"
          onPress={() => navigation.navigate("Profile")}
        >
          Quản Lý Thông Tin
        </Button>

        <Button
          mode="contained"
          buttonColor="blue"
          onPress={() => navigation.navigate("Movie")}
        >
          Đặt Vé Xem Phim
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
