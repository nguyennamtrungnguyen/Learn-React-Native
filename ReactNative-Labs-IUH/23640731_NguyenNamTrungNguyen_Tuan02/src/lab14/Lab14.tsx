import React, { useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";

type Product = {
  id: number;
  name: string;
  price: number;
};

// API response của Product
const response: ApiResponse<Product> = {
  data: [
    {
      id: 1,
      name: "iPhone 15",
      price: 20000000,
    },
    {
      id: 2,
      name: "Samsung S24",
      price: 18000000,
    },
    {
      id: 3,
      name: "Xiaomi 14",
      price: 12000000,
    },
    {
      id: 4,
      name: "Oppo Reno 12",
      price: 9000000,
    },
    {
      id: 5,
      name: "Google Pixel 9",
      price: 22000000,
    },
  ],
  total: 10,
  page: 1,
};

const Lab14 = () => {
  const [page, setPage] = useState(response.page);

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách sản phẩm</Text>

      <Text style={styles.info}>Tổng sản phẩm: {response.total}</Text>

      <Text style={styles.info}>Trang hiện tại: {page}</Text>

      <FlatList
        data={response.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>

            <Text>{item.price.toLocaleString("vi-VN")} ₫</Text>
          </View>
        )}
      />

      <View style={styles.buttons}>
        <Button
          title="Trang trước"
          onPress={handlePreviousPage}
          disabled={page === 1}
        />

        <Button title="Trang sau" onPress={handleNextPage} />
      </View>
    </View>
  );
};

export default Lab14;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  info: {
    fontSize: 16,
    marginBottom: 5,
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

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
