import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../interface/Movie";
import MovieCard from "../components/MovieCard";
import { Button } from "react-native-paper";

const baseUrl = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieScreen = () => {
  const { isLoading, error, get } = useFetch(baseUrl);
  const [isTitle, setIsTitle] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 5;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleFetch = () => {
    get(`/movies?page=${page}&limit=${limit}`).then((res) => setMovies(res));
  };

  useEffect(() => {
    handleFetch;
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleFetch();
    setRefreshing(false);
  };
  const handleSelect = useCallback(
    (id: number) => {
      const m = movies.find((x) => x.id === id);
      if (m) Alert.alert("Phim", m.title);
    },
    [movies],
  );

  if (isLoading)
    return (
      <View style={styles.warning}>
        <Text
          style={{
            fontWeight: "bold",
            color: "blue",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Đang tải dữ liệu...
        </Text>
        <ActivityIndicator size={"large"} animating={true} />
      </View>
    );

  if (error)
    return (
      <View style={styles.warning}>
        <Text
          style={{
            fontWeight: "bold",
            color: "red",
            textAlign: "center",
            fontSize: 20,
          }}
        >
          Lỗi : {error}
        </Text>
      </View>
    );
  return (
    <View style={{ backgroundColor: "f2f2f2", flex: 1 }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <MovieCard movie={item.item} onSelect={handleSelect} />
        )}
      />

      <Button onPress={() => setPage(page + 1)}>---Trang Tiếp Theo---</Button>
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  warning: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
