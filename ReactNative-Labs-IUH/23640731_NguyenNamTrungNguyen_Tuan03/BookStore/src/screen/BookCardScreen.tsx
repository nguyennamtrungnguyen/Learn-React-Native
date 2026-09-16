import { Image, StyleSheet, Text, View } from "react-native";

import BookCardGridItem from "../components/common/BookCardGridItem";
import { books } from "../interface/BookInterface";

const BookCardScreen = () => {
  return (
    <View style={styles.bookCardContainer}>
      {/* <View>
        {books.map((book, index) => (
          <BookCardItem key={index} book={book} />
        ))}
      </View> */}

      <View style={styles.container}>
        {books.map((book, index) => (
          <BookCardGridItem key={index} book={book} />
        ))}
      </View>
    </View>
  );
};

export default BookCardScreen;

const styles = StyleSheet.create({
  bookCardContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginTop: 20,
  },

  container: {
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
