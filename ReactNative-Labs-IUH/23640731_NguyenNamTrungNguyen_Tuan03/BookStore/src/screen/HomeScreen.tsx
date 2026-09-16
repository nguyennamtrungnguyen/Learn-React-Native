import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Header from "../components/header/Header";
import BookCardScreen from "./BookCardScreen";
import BadgeSaleImage from "../components/common/BadgeSaleImage";
import FloatingCartButton from "../components/common/FloatingCartButton";
import CategoryChips from "../components/common/CategoryChips";
import BookDetailScreen from "./BookDetailScreen";
import Footer from "../components/footer/Footer";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Header />
        <CategoryChips />
        <BookCardScreen />
        {/* <BookCardScreen /> */}
        {/* <br></br> */}
        {/* <View>
          <BadgeSaleImage prop="https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178.jpg" />
        </View> */}
        {/* <FloatingCartButton cartCount={3} /> */}

        {/* <BookDetailScreen /> */}
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
