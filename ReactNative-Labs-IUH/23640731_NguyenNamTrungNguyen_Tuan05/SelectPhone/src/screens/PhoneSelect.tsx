import React, { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "PhoneSelect">;

const colors = [
  {
    name: "Đen",
    value: "#000000",
  },
  {
    name: "Đỏ",
    value: "#FF0000",
  },
  {
    name: "Bạc",
    value: "#C0C0C0",
  },
  {
    name: "Trắng",
    value: "#FFFFFF",
  },
];
export default function PhoneSelect({ navigation }: Props) {
  const [selectedColor, setSelectedColor] = useState(colors[0].name);

  const handleDone = () => {
    navigation.navigate("PhoneDetail", {
      color: selectedColor,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn một màu bên dưới:</Text>

      {colors.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            styles.colorItem,
            {
              backgroundColor: item.value,
            },
            selectedColor === item.name && styles.selected,
          ]}
          onPress={() => setSelectedColor(item.name)}
        >
          {selectedColor === item.name && <Text style={styles.check}>✓</Text>}
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>XONG</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },

  colorItem: {
    width: 60,
    height: 60,
    alignSelf: "center",
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },

  selected: {
    borderWidth: 4,
    borderColor: "#555",
  },

  check: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  doneButton: {
    height: 45,
    backgroundColor: "#4267B2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
