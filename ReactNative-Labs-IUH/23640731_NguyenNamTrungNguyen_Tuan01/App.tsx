import { ScrollView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Lab02 } from "./src/lab02/Lab02";
import { Lab03 } from "./src/lab03/Lab03";
import Lab04 from "./src/lab04/Lab04";
import Lab05 from "./src/lab05/Lab05";
import Lab06 from "./src/lab06/Lab06";
import Lab07 from "./src/lab07/Lab07";
import Lab08 from "./src/lab08/Lab08";
import Lab01 from "./src/lab01/Lab01";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={true}
        >
          <Lab01 />
          <Lab02 />
          <Lab03 />
          <Lab04 />
          <Lab05 />
          <Lab06 />
          <Lab07 />
          <Lab08 />
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
    padding: 20,
    paddingBottom: 40,
  },
});
