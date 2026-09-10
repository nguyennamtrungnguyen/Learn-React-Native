import { Image, StyleSheet, Text, View } from "react-native";
import BookCardItem from "../components/item/BookCardItem";
import CategoryChips from "../components/item/CategoryChips";
import BookCardGridItem from "../components/item/BookCardGridItem";

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

  {
    source:
      "https://product.hstatic.net/200000122283/product/thay-doi-ti-hon-hieu-qua-bat-ngo-tb-2024_cd81eceb238a4d3691483554020aa690_master.jpg",
    title: "Atomic Habits",
    author: "Danel Smith",
    price: 150000,
  },
];

const BookCardScreen = () => {
  return (
    // <View style={styles.bookCardContainer}>
    //   <View>
    //     <CategoryChips />
    //   </View>
    //   {books.map((book, index) => (
    //     <BookCardItem key={index} book={book} />
    //   ))}

    <View style={styles.container}>
      {books.map((book, index) => (
        <BookCardGridItem key={index} book={book} />
      ))}
    </View>
    // </View>
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
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
});
