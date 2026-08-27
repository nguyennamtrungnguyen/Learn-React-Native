import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface todo {
  id: number;
  title: string;
}

const tasks = [
  {
    id: 1,
    title: "Learn HTML",
  },
  {
    id: 2,
    title: "Learn CSS/TAILWIND",
  },
  {
    id: 3,
    title: "Learn JAVASCRIPT",
  },
  {
    id: 4,
    title: "Learn TYPESCRIPT",
  },
];

export const TodoList = () => {
  const [todos, setTodos] = useState<todo[]>(tasks);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách việc cần làm</Text>

      {todos.map((todo) => (
        <View key={todo.id} style={styles.todoItem}>
          <Text style={styles.todoText}>{todo.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  todoItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
  todoText: {
    fontSize: 18,
  },
});
