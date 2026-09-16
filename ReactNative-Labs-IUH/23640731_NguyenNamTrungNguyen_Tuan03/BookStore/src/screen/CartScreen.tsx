import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const cartItems = [
  {
    id: 1,
    source: require("../../assets/book_image/book1.webp"),
    title: "Đắc Nhân Tâm",
    quantity: 2,
    price: 85000,
  },
  {
    id: 2,
    source: {
      uri: "https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg",
    },
    title: "Nhà Giả Kim",
    quantity: 1,
    price: 79000,
  },
  {
    id: 3,
    source: {
      uri: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1495635816i/32521178.jpg",
    },
    title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
    quantity: 3,
    price: 90000,
  },
  {
    id: 4,
    source: {
      uri: "https://product.hstatic.net/200000122283/product/thay-doi-ti-hon-hieu-qua-bat-ngo-tb-2024_cd81eceb238a4d3691483554020aa690_master.jpg",
    },
    title: "Atomic Habits",
    quantity: 1,
    price: 150000,
  },
];

const CartScreen = () => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Tiêu đề */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Giỏ hàng</Text>
        </View>

        {/* Danh sách sản phẩm */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {cartItems.map((item) => (
            <View style={styles.cartItem} key={item.id}>
              {/* Ảnh */}
              <Image
                source={item.source}
                style={styles.image}
                resizeMode="cover"
              />

              {/* Tên sách */}
              <View style={styles.productInfo}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>

              {/* Số lượng */}
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>x{item.quantity}</Text>
              </View>

              {/* Giá */}
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Tổng tiền + Thanh toán */}
        <View style={styles.summary}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tổng tiền</Text>

            <Text style={styles.totalPrice}>
              {totalPrice.toLocaleString("vi-VN")}đ
            </Text>
          </View>

          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Tab */}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDFAF6",
  },

  container: {
    flex: 1,
    backgroundColor: "#FDFAF6",
  },

  header: {
    height: 60,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",

    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#6B3E24",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,

    paddingBottom: 20,
  },

  cartItem: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#FFFFFF",

    padding: 12,

    marginBottom: 12,

    borderRadius: 10,

    elevation: 2,
  },

  image: {
    width: 60,
    height: 80,

    borderRadius: 6,
  },

  productInfo: {
    flex: 1,

    marginLeft: 12,
    marginRight: 8,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333333",
  },

  quantityContainer: {
    width: 45,

    alignItems: "center",
    justifyContent: "center",
  },

  quantity: {
    fontSize: 14,
    color: "#555555",
  },

  priceContainer: {
    width: 90,

    alignItems: "flex-end",
  },

  price: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B3E24",
  },

  summary: {
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,

    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    elevation: 8,
  },

  totalRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 10,
  },

  totalLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6B3E24",
  },

  paymentButton: {
    height: 48,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#6B3E24",

    borderRadius: 8,
  },

  paymentText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "700",
  },
});
