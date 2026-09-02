import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
} from "react-native";

import { filterByName } from "../utils/filterData";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
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
    name: "iPhone 13",
    price: 15000000,
  },
  {
    id: 4,
    name: "Xiaomi 14",
    price: 12000000,
  },
  {
    id: 5,
    name: "Oppo Reno 12",
    price: 9000000,
  },
];

const FilteredList = () => {
  const [keyword, setKeyword] = useState("");

  const filteredProducts = filterByName(
    products,
    keyword
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bộ lọc sản phẩm
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập tên sản phẩm..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text>
              {item.price.toLocaleString("vi-VN")} ₫
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Không tìm thấy sản phẩm
          </Text>
        }
      />
    </View>
  );
};

export default FilteredList;

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

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
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

  empty: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});