import React, { useEffect, useState } from "react";

import { View, Text, FlatList, StyleSheet, Alert } from "react-native";

import { getProducts } from "../api/productApi";
import { Product } from "../types/api";

const Lab15 = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Trạng thái loading lần đầu
  const [loading, setLoading] = useState(false);

  // Trạng thái kéo để refresh
  const [refreshing, setRefreshing] = useState(false);

  // Gọi API
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProducts(response.data);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải danh sách sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // Pull to Refresh
  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      const response = await getProducts();

      setProducts(response.data);
    } catch (error) {
      Alert.alert("Lỗi", "Không thể tải lại dữ liệu");
    } finally {
      setRefreshing(false);
    }
  };

  // Gọi API khi màn hình được mở
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.price}>
              {item.price.toLocaleString("vi-VN")} ₫
            </Text>
          </View>
        )}
        // Pull to Refresh
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>Không có sản phẩm</Text> : null
        }
      />
    </View>
  );
};

export default Lab15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  item: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  price: {
    fontSize: 16,
  },

  empty: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },
});
