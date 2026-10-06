import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Button } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen = ({ navigation }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Text
        style={{
          margin: 40,
          fontWeight: "bold",
          color: "blue",
          textAlign: "center",
          fontSize: 30,
        }}
      >
        Chào Mừng Quay Lại
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Profile")}
        buttonColor="blue"
      >
        Quản Lý Thông Tin
      </Button>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Movie")}
        buttonColor="red"
      >
        Đặt Vé Xem Phim
      </Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
