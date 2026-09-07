import { StyleSheet, Text, View } from "react-native";
import { useFetch } from "./../hook/useFetch";
import { ActivityIndicator } from "react-native-paper";
import { useEffect, useState } from "react";

const baseUrl = "https://697c4082889a1aecfeb1caab.mockapi.io/";
export const TodoScreen = () => {
  const [todos, setTodos] = useState();
  const { isLoading, error, get, post, put, del } = useFetch(baseUrl);

  const handleFetch = () => {
    get("/todos").then((res) => setTodos(res));
  };

  useEffect(() => handleFetch(), []);

  if (isLoading)
    return (
      <View>
        <ActivityIndicator size={"large"} animating={true} />
      </View>
    );
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
