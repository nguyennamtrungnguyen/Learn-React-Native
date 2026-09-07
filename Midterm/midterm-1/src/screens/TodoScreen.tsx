import { StyleSheet, Text, View, FlatList } from "react-native";
import { useFetch } from "./../hook/useFetch";
import { ActivityIndicator } from "react-native-paper";
import { useEffect, useState } from "react";
import { Todo } from "../interfaces/Todo";

const baseUrl = "https://697c4082889a1aecfeb1caab.mockapi.io/";

export const TodoScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const { isLoading, error, get, post, put, del } = useFetch(baseUrl);

  const handleFetch = () => {
    get("/todos").then((res) => {
      setTodos(res);
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" animating={true} />
      </View>
    );
  }

  if (error) {
    return <Text>Có lỗi: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text>{item.title}</Text>
            <Text>{item.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  todoItem: {
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});
