import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { RootStackParamList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Chào Mừng Bạn Trở Lại</Text>
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
          buttonColor="green"
        >
          Đặt Vé Xem Phim
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
  },
  title: {
    margin: 40,
    color: "blue",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
});
