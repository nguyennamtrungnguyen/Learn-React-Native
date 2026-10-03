import { FlatList, StyleSheet, Text, View } from "react-native";
import { useFetch } from "./../hook/useFetch";
import { ActivityIndicator, Button } from "react-native-paper";
import { useEffect, useState } from "react";
import { Todo } from "../interfaces/Todo";
import TodoCard from "../components/TodoCard";

const baseUrl = "https://697c4082889a1aecfeb1caab.mockapi.io/";
export const TodoScreen = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const limit = 2;
  const [page, setPage] = useState(1);
  const { isLoading, error, get, post, put, del } = useFetch(baseUrl);

  const handleFetch = () => {
    get(`/todos?page=${page}&limit=${limit}`).then((res) => setTodos(res));
  };

  useEffect(() => handleFetch(), [page]);

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size={"large"} animating={true} />
      </View>
    );

  if (error)
    return (
      <View>
        <Text>Lỗi {error}</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={(root) => <TodoCard data={root.item} />}
      />
      <Button onPress={() => setPage(page + 1)}>Next</Button>
      <Text style={{ textAlign: "center" }}>{page}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  isLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
