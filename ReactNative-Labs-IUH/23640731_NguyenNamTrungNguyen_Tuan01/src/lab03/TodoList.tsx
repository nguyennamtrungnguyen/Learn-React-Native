import React, { useState } from "react";
import { Text, View } from "react-native";
import { tasks } from "./TodoList";

ca;

interface todo {
  id: number;
  title: string;
}

export const tasks = [
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
    <View>
      {todos.map((todo) => (
        <View>
          <Text>{todo.title}</Text>
        </View>
      ))}
    </View>
  );
};
