import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header/Header";
import BookCardScreen from "./BookCardScreen";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <BookCardScreen />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
