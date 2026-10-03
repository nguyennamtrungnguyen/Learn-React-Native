import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../../App";
import { Button } from "react-native-paper";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <View style={[styles.container, { gap: 10 }]}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          color: "blue",
          marginBottom: 40,
          fontWeight: "bold",
        }}
      >
        Chào Mừng Bạn Trở Lại
      </Text>
      <Button
        mode="contained"
        buttonColor="green"
        onPress={() => navigation.navigate("Profile")}
      >
        Xem Thông Tin
      </Button>
      <Button
        mode="contained"
        buttonColor="blue"
        onPress={() => navigation.navigate("Todo")}
      >
        Quản Lý Công Việc
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
