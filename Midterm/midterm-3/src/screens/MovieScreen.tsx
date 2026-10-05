import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { lazy, useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../interface/Movie";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Switch } from "react-native-paper";
import MovieCard from "../components/MovieCard";

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieScreen = () => {
  const { isLoading, error, get } = useFetch(baseURL);
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 5;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const numcolumns = isTile ? 2 : 1;
  const handleFetch = async () => {
    const res = await get(`/movies?page=${page}&limit=${limit}`); // phan trang
    if (res) setMovies(res);
  };

  useEffect(() => {
    handleFetch();
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleFetch();
    setRefreshing(false);
  };

  const handleSelect = useCallback(
    (id: string) => {
      const m = movies.find((x) => x.id === id);
      if (m) Alert.alert("Phim", m.title);
    },
    [movies],
  );
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#4b2525" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingHorizontal: 12,
          marginBottom: 8,
        }}
      >
        <Text style={{ marginRight: 8 }}>Dạng Lưới</Text>
        <Switch value={isTile} onValueChange={setIsTile} />
      </View>
      {error && (
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: "red",
          }}
        >
          Lỗi : {error}
        </Text>
      )}
      ;
      {isLoading && !refreshing ? (
        <View>
          <Text>Đang tải dữ liệu...</Text>
          <ActivityIndicator size={"large"} animating={true} />
        </View>
      ) : (
        <View>
          <FlatList
            key={String(numcolumns)}
            data={movies}
            keyExtractor={(item) => item.id}
            numColumns={numcolumns}
            columnWrapperStyle={
              isTile ? { justifyContent: "space-between" } : undefined
            }
            contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                layout={isTile ? "tile" : "row"}
                onSelect={handleSelect}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Button
              mode="contained"
              disabled={page === -1}
              onPress={() => setPage(page - 1)}
              buttonColor="gray"
            >
              ---Quay lại---
            </Button>
            <Text style={{ fontSize: 20 }}>{page}</Text>
            <Button
              mode="contained"
              onPress={() => setPage(page + 1)}
              buttonColor="gray"
            >
              ---Tiếp theo---
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
