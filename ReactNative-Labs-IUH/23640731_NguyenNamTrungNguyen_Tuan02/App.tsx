import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Lab08 } from "./src/lab08/Lab08";

export default function App() {
  return (
    <View style={styles.container}>
      <Lab08 />
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
