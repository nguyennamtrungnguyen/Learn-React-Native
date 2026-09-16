import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import React from "react";
import { BookCardItemProps } from "../../interface/BookInterface";

const BookCardGridItem = ({ book }: BookCardItemProps) => {
  const resolvedSource = typeof book.source === "string" ? { uri: book.source } : book.source;
  return (
    <View style={styles.item}>
      <Image
        source={resolvedSource}
        style={styles.bookImage}
      />

      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text>{book.price.toLocaleString("vi-VN")}đ</Text>
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
    aspectRatio: 3/4,
    height: 250,
    borderRadius: 8,
    resizeMode: "cover",
  },

  info: {
    marginTop: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent:"space-around",
    gap:10
    
  },

  title: {
    fontSize: 12,
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
