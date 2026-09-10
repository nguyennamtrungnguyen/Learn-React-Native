import { StyleSheet, Text, View } from "react-native";
import React from "react";

const categories = [
  "Văn học",
  "Kinh tế",
  "Thiếu nhi",
  "Truyện tranh",
  "Ngoại ngữ",
  "Lịch sử",
];

const CategoryChips = () => {
  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <View>
          <text style={styles.chip} key={index}>
            <Text style={styles.text}>{category}</Text>
          </text>
        </View>
      ))}
    </View>
  );
};

export default CategoryChips;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#6688FF",
  },
  text: {
    fontSize: 14,
    color: "#222",
  },
});
