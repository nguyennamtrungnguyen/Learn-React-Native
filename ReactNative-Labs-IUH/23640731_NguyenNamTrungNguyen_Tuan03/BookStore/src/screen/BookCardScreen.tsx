import { Image, StyleSheet, Text, View } from "react-native";

interface Book {
  source: any;
  title: string;
  author: string;
  price: number;
}

const books: Book[] = [
  {
    source: require("../../assets/book_image/book1.webp"),
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 85000,
  },

  {
    source:
      "https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg?utm_source=vi.wikipedia.org&utm_campaign=index&utm_content=original",
    title: "Nhà Giả Kim",
    author: "Paulo Coelho",
    price: 79000,
  },

  {
    source:
      "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178.jpg",
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    author: "Rosie Nguyễn",
    price: 90000,
  },
];

const BookCardScreen = () => {
  return (
    <View style={styles.bookCardContainer}>
      {books.map((book, index) => {
        return (
          <View style={styles.bookCard} key={index}>
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
      })}
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
