import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";

// 1. Định nghĩa kiểu dữ liệu Product
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
};

// 2. Định nghĩa kiểu dữ liệu response từ API
type ProductResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const Lab11 = () => {
  // 3. State lưu danh sách sản phẩm
  const [products, setProducts] = useState<Product[]>([]);

  // 4. State loading
  const [loading, setLoading] = useState<boolean>(true);

  // 5. Hàm gọi API với tham số có kiểu rõ ràng
  const fetchProducts = async (
    keyword: string,
    limit: number
  ): Promise<void> => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Không thể lấy dữ liệu sản phẩm");
      }

      const data: ProductResponse = await response.json();

      setProducts(data.products);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false);
    }
  };

  // 6. Gọi API khi component được render
  useEffect(() => {
    fetchProducts("phone", 10);
  }, []);

  // 7. Hiển thị loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>
          Đang tìm kiếm sản phẩm...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔎 Product Search</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa tìm kiếm..."
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text style={styles.price}>
              ${item.price}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Lab11;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },

  input: {
    height: 50,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  productItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: "bold",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});