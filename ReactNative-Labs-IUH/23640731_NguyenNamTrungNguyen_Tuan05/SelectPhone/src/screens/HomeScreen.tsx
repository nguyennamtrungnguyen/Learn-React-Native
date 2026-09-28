import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/black.webp")}
        style={styles.phoneImage}
      />

      <Text style={styles.title}>Điện thoại Vsmart Joy 3</Text>

      <Text style={styles.subtitle}>Hàng chính hãng</Text>

      <Text style={styles.price}>1.790.000 đ</Text>

      <View style={styles.ratingContainer}>
        <Text style={styles.star}>★★★★★</Text>

        <Text style={styles.review}>(Xem 828 đánh giá)</Text>
      </View>

      <Text style={styles.warning}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>

      <TouchableOpacity
        style={styles.colorButton}
        onPress={() => navigation.navigate("PhoneSelect")}
      >
        <Text style={styles.colorButtonText}>4 MÀU - CHỌN MÀU</Text>

        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => navigation.navigate("PhoneSelect")}
      >
        <Text style={styles.buyText}>CHỌN MUA</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
  },

  phoneImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 15,
  },

  title: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 8,
  },

  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },

  star: {
    color: "#FFD700",
    fontSize: 18,
  },

  review: {
    color: "#777",
    marginLeft: 8,
    fontSize: 12,
  },

  warning: {
    color: "red",
    fontSize: 10,
    marginBottom: 12,
  },

  colorButton: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  colorButtonText: {
    fontSize: 13,
    color: "#333",
  },

  arrow: {
    fontSize: 25,
    color: "#555",
  },

  buyButton: {
    backgroundColor: "#ff0000",
    height: 50,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  buyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
