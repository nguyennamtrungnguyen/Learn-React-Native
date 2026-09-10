import { Image, StyleSheet, Text, View } from "react-native";

interface Book {
  source: any;
  title: string;
  author: string;
  price: number;
}

interface BookCardItemProps {
  book: Book;
}

const BookCardItem = ({ book }: BookCardItemProps) => {
  return (
    <View style={styles.bookCardItem}>
      <View style={styles.bookCardLeft}>
        <Image
          source={book.source}
          style={styles.bookImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.bookCardRight}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>

        <Text style={styles.author}>Tác giả: {book.author}</Text>
        <Text style={styles.price}>{book.price} đ</Text>
      </View>
    </View>
  );
};

export default BookCardItem;

const styles = StyleSheet.create({
  bookCardItem: {
    width: "100%",
    paddingHorizontal: 10,
    height: 130,
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
    marginTop: 10,
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
    gap: 10,
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
    marginTop: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E53935",
  },
});
