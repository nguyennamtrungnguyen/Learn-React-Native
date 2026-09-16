import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { BookCardItemProps } from "../../interface/BookInterface";
import BadgeSaleImage from "./BadgeSaleImage";

const BookCardGridItem = ({ book }: BookCardItemProps) => {
  const resolvedSource =
    typeof book.source === "string" ? { uri: book.source } : book.source;
  return (
    <View style={styles.item}>
      <BadgeSaleImage source={resolvedSource} />

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


  info: {
    marginTop: 8,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
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
