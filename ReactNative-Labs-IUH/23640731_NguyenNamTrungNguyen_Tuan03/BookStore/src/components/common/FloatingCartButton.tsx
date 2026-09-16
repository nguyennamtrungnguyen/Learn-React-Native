import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

interface Props {
  cartCount: number;
}
const FloatingCartButton = ({ cartCount }: Props) => {
  return (
    <TouchableOpacity style={styles.cartButton} activeOpacity={0.8}>
      <AntDesign name="shopping-cart" size={28} color={"white"} />

      <View style={styles.badge}>
        <Text>{cartCount}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FloatingCartButton;

const styles = StyleSheet.create({
  cartButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6B3E24",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#FFFFFF",

    fontSize: 11,

    fontWeight: "bold",
  },
});
