import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppButton } from "./AppButton";

export const Lab08 = () => {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      Alert.alert("Thông báo", "Đã thêm sách vào giỏ hàng!");
    }, 1500);
  };

  const handleDetail = () => {
    Alert.alert("Chi tiết", "Đang xem chi tiết sách...");
  };

  const handleDelete = () => {
    Alert.alert("Thông báo", "Đã xóa sách!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookStore</Text>

      <Text style={styles.bookName}>Đắc Nhân Tâm</Text>

      <AppButton
        title="Thêm vào giỏ hàng"
        variant="primary"
        size="large"
        onPress={handleAddToCart}
        loading={loading}
      />

      <AppButton
        title="Xem chi tiết"
        variant="outline"
        size="medium"
        onPress={handleDetail}
      />

      <AppButton
        title="Xóa sách"
        variant="danger"
        size="small"
        onPress={handleDelete}
      />

      <AppButton
        title="Nút Secondary"
        variant="secondary"
        size="medium"
        onPress={() => Alert.alert("Secondary")}
      />

      <AppButton
        title="Nút bị vô hiệu hóa"
        variant="primary"
        size="medium"
        onPress={() => {}}
        disabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  bookName: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
});
