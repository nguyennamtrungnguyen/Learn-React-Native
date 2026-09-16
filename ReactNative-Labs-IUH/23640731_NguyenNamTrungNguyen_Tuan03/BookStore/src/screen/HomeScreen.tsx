import { ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header/Header";
import BookCardScreen from "./BookCardScreen";
import BadgeSaleImage from "../components/item/BadgeSaleImage";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* <BookCardScreen /> */}
      <br></br>
      <View>
        <BadgeSaleImage prop="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178.jpg" />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
