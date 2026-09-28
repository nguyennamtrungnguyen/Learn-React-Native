import React from "react";

import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "PhoneDetail">;

export default function PhoneDetail({ navigation, route }: Props) {
  const { color } = route.params;

  let imageSource;

  if (color === "Đen") {
    imageSource = require("../../assets/black.webp");
  } else if (color === "Đỏ") {
    imageSource = require("../../assets/red.webp");
  } else if (color === "Bạc") {
    imageSource = require("../../assets/silver.webp");
  } else {
    imageSource = require("../../assets/white.webp");
  }

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.phoneImage} />

      <Text style={styles.title}>Điện thoại Vsmart Joy 3</Text>

      <Text style={styles.subtitle}>Hàng chính hãng</Text>

      <Text style={styles.price}>1.790.000 đ</Text>

      <View style={styles.rating}>
        <Text style={styles.star}>★★★★★</Text>

        <Text style={styles.review}>(Xem 828 đánh giá)</Text>
      </View>

      <Text style={styles.selectedColor}>Màu: {color}</Text>

      <TouchableOpacity
        style={styles.colorButton}
        onPress={() =>
          navigation.navigate("PhoneSelect", {
            color,
          })
        }
      >
        <Text>4 MÀU - CHỌN MÀU</Text>

        <Text>›</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  phoneImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },

  title: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  star: {
    color: "#FFD700",
    fontSize: 18,
  },

  review: {
    marginLeft: 8,
    color: "#777",
  },

  selectedColor: {
    fontSize: 15,
    marginTop: 15,
    fontWeight: "bold",
  },

  colorButton: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    marginTop: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  buyButton: {
    height: 50,
    backgroundColor: "red",
    marginTop: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },

  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
