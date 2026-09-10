import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const BookCardScreen = () => {
  return (
    <View style={styles.bookCardContainer}>
      <View style={styles.bookCard}>
        <View style={styles.bookCardLeft}>
          <Image
            source={require("../../assets/book_image/book1.webp")}
            style={styles.bookImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.bookCardRight}>
          <View>
            <Text style={styles.title} numberOfLines={2}>
              Tên sách không bị đẩy lề
            </Text>

            <Text style={styles.author}>Tác giả: Nguyễn Văn A</Text>
          </View>

          <Text style={styles.price}>89.000đ</Text>
        </View>
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

  bookCard: {
    width: "100%",
    height: 150,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  bookCardLeft: {
    width: 80,
    height: 110,
    borderRadius: 8,
    overflow: "hidden",
  },

  bookImage: {
    width: "100%",
    height: "100%",
  },

  bookCardRight: {
    flex: 1,
    height: "100%",
    marginLeft: 15,
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222222",
    lineHeight: 24,
  },

  author: {
    fontSize: 14,
    color: "#777777",
    marginTop: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E53935",
  },
});
