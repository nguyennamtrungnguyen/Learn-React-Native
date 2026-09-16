import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Footer = () => {
  return (
    <View style={styles.container}>
      {/* Trang chủ */}
      <TouchableOpacity style={styles.tab}>
        <AntDesign name="home" size={24} color="#6B3E24" />
        <Text style={[styles.label, styles.activeLabel]}>Trang chủ</Text>
      </TouchableOpacity>

      {/* Danh mục */}
      <TouchableOpacity style={styles.tab}>
        <AntDesign name="appstore-o" size={24} color="#777" />
        <Text style={styles.label}>Danh mục</Text>
      </TouchableOpacity>

      {/* Giỏ hàng */}
      <TouchableOpacity style={styles.tab}>
        <AntDesign name="shopping-cart" size={24} color="#777" />
        <Text style={styles.label}>Giỏ hàng</Text>
      </TouchableOpacity>

      {/* Tài khoản */}
      <TouchableOpacity style={styles.tab}>
        <AntDesign name="user" size={24} color="#777" />
        <Text style={styles.label}>Tài khoản</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    height: 70,

    flexDirection: "row",

    backgroundColor: "#FFFFFF",

    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",

    elevation: 8,
  },

  tab: {
    flex: 1,

    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",

    gap: 4,
  },

  label: {
    fontSize: 12,
    color: "#777777",
  },

  activeLabel: {
    color: "#6B3E24",
    fontWeight: "600",
  },
});
