import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BookDetailScreen = () => {
  const handleAddToCart = () => {
    alert("Đã thêm vào giỏ hàng");
  };

  const book = {
    source: require("../../assets/book_image/book1.webp"),
    title: "Đắc Nhân Tâm",
    author: "Dale Carnegie",
    price: 85000,
    description:
      "Đắc Nhân Tâm là một trong những cuốn sách nổi tiếng nhất về nghệ thuật giao tiếp và ứng xử. Cuốn sách chia sẻ những nguyên tắc giúp con người hiểu người khác, tạo thiện cảm, xây dựng các mối quan hệ tốt đẹp và giao tiếp hiệu quả hơn trong cuộc sống. Thông qua những câu chuyện và ví dụ thực tế, Dale Carnegie hướng dẫn người đọc cách nhìn nhận vấn đề từ góc độ của người khác, biết lắng nghe, tôn trọng và khích lệ mọi người xung quanh.",
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Nội dung có thể cuộn */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Ảnh bìa */}
          <Image
            source={book.source}
            style={styles.bookImage}
            resizeMode="cover"
          />

          {/* Thông tin sách */}
          <View style={styles.info}>
            <Text style={styles.title}>{book.title}</Text>

            <Text style={styles.author}>Tác giả: {book.author}</Text>

            <Text style={styles.price}>
              {book.price.toLocaleString("vi-VN")}đ
            </Text>

            <View style={styles.divider} />

            <Text style={styles.descriptionTitle}>Mô tả sách</Text>

            <Text style={styles.description}>{book.description}</Text>
          </View>
        </ScrollView>

        {/* Thanh dưới cùng - cố định */}
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomLabel}>Giá</Text>

            <Text style={styles.bottomPrice}>
              {book.price.toLocaleString("vi-VN")}đ
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDFAF6",
  },

  container: {
    flex: 1,
    backgroundColor: "#FDFAF6",
  },

  /*
   * ScrollView chiếm toàn bộ
   * phần còn lại giữa màn hình.
   */
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,

    // Chừa khoảng trống cho bottom bar
    paddingBottom: 30,
  },

  /*
   * Ảnh căn giữa.
   */
  bookImage: {
    alignSelf: "center",

    width: 240,

    aspectRatio: 3 / 4,

    borderRadius: 10,

    marginBottom: 20,
  },

  info: {
    width: "100%",
  },

  title: {
    fontSize: 26,

    fontWeight: "bold",

    color: "#333333",

    marginBottom: 8,
  },

  author: {
    fontSize: 16,

    color: "#777777",

    marginBottom: 12,
  },

  price: {
    fontSize: 22,

    fontWeight: "bold",

    color: "#C0392B",
  },

  divider: {
    height: 1,

    backgroundColor: "#DDDDDD",

    marginVertical: 20,
  },

  descriptionTitle: {
    fontSize: 20,

    fontWeight: "bold",

    color: "#333333",

    marginBottom: 10,
  },

  description: {
    fontSize: 15,

    lineHeight: 25,

    color: "#555555",

    textAlign: "justify",
  },

  /*
   * Thanh cố định phía dưới.
   */
  bottomBar: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingHorizontal: 20,

    paddingVertical: 14,

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,

    borderTopColor: "#EEEEEE",

    elevation: 8,
  },

  bottomLabel: {
    fontSize: 12,

    color: "#777777",
  },

  bottomPrice: {
    fontSize: 18,

    fontWeight: "bold",

    color: "#C0392B",

    marginTop: 2,
  },

  addButton: {
    backgroundColor: "#6B3E24",

    paddingHorizontal: 22,

    paddingVertical: 13,

    borderRadius: 10,
  },

  addButtonText: {
    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "bold",
  },
});
