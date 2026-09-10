import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

interface Book {
  source: any;
  title: string;
  author: string;
  price: number;
}

interface BookCardItemProps {
  book: Book;
}

const BookCardGridItem = ({ book }: BookCardItemProps) => {
  return (
    <View style={styles.item}>
      <Image
        source={
          typeof book.source === "string" ? { uri: book.source } : book.source
        }
        style={styles.bookImage}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>

        <Text style={styles.author}>{book.author}</Text>

        <Text style={styles.price}>{book.price.toLocaleString("vi-VN")}đ</Text>
      </View>
    </View>
  );
};

export default BookCardGridItem;

const styles = StyleSheet.create({
  item: {
    width: "48%",
    marginBottom: 20,
  },

  bookImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    resizeMode: "cover",
  },

  info: {
    marginTop: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },

  author: {
    fontSize: 14,
    marginTop: 4,
  },

  price: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 4,
  },
});
