import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  Switch,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../interface/Movie";
import MovieCard from "../components/MovieCard";

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";

const MovieScreen = () => {
  const { isLoading, error, get } = useFetch(baseURL);
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const limit = 5;
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const numColumns = isTile ? 2 : 1;

  const handleFetch = async () => {
    const res = await get(`/movies?page=${page}&limit=${limit}`);
    if (res) setMovies(res);
  };

  useEffect(() => {
    handleFetch();
  }, [page]);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleFetch(); // giữ nguyên chế độ 1/2 cột
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f2f2f2" }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingHorizontal: 12,
            marginBottom: 8,
          }}
        >
          <Text style={{ marginRight: 8 }}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>

        {error && (
          <Text
            style={{
              fontWeight: "bold",
              color: "red",
              textAlign: "center",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            Lỗi : {error}
          </Text>
        )}

        {isLoading && !refreshing ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
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
            <ActivityIndicator size="large" animating={true} />
          </View>
        ) : (
          <>
            <FlatList
              key={String(numColumns)}
              data={movies}
              keyExtractor={(item) => item.id.toString()}
              numColumns={numColumns}
              columnWrapperStyle={
                isTile ? { justifyContent: "space-between" } : undefined
              }
              contentContainerStyle={{
                paddingHorizontal: 12,
                paddingBottom: 12,
              }}
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

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Button disabled={page === 1} onPress={() => setPage(page - 1)}>
                Trang Trước
              </Button>
              <Button onPress={() => setPage(page + 1)}>Trang Tiếp Theo</Button>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MovieScreen;
