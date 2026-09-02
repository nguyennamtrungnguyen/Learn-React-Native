import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Lab08 } from "./src/lab08/Lab08";
import Lab09 from "./src/lab09/Lab09";
import Lab10 from "./src/lab10/Lab10";
import Lab11 from "./src/lab11/Lab11";
import Lab12 from "./src/lab12/Lab12";

export default function App() {
  return (
    <View style={styles.container}>
      <Lab08 />
      <Lab09 />
      <Lab10 />
      <Lab11 />
      <Lab12 />
    </View>
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
