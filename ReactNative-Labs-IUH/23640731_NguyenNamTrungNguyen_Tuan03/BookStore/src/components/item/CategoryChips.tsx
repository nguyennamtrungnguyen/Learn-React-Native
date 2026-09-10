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
      <Text>CategoryChips</Text>
    </View>
  );
};

export default CategoryChips;

const styles = StyleSheet.create({
  container: {},
});
