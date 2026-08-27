import { ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Lab02 } from "./src/lab02/Lab02";
import { Lab03 } from "./src/lab03/Lab03";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Lab02 />
          <Lab03 />
        </ScrollView>

        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
