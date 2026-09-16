import { StyleSheet, Text, View } from "react-native";

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
        <View style={styles.chip} key={index}>
          <Text style={styles.text}>{category}</Text>
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
    width: "31%",
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#6688FF",
    alignItems: "center",
  },

  text: {
    fontSize: 14,
    color: "#222",
  },
});
