import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Lab01 from "./src/lab01/Lab01";
import { Lab02 } from "./src/lab02/Lab02";
import Toast from "react-native-toast-message";

export default function App() {
  return (
    <ScrollView>
      <Lab01 />
      <Lab02 />
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
