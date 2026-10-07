import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Switch } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Movie } from "../interface/Movie";
import { useFetch } from "../hooks/useFetch";
import MovieCard from "../components/MovieCard";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;
const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieScreen = ({ navigation }: Props) => {
  const { get, isLoading, error } = useFetch(baseURL);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  const fetchMovies = async () => {
    const res = await get("/movies");
    if (res) {
      setMovies(res);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const refreshMovies = async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  };

  const selectMovie = (id: string) => {
    navigation.navigate("MovieDetail", {
      id,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Dạng lưới</Text>
        <Switch value={isTile} onValueChange={setIsTile} />
      </View>
      <View style={styles.filterContainer}>
        {["All", "Action", "Comedy", "Drama"].map((genre) => (
          <Pressable
            key={genre}
            onPress={() => setSelectedGenre(genre)}
            style={[
              styles.filterButton,
              selectedGenre === genre && styles.activeButton,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedGenre === genre && styles.activeText,
              ]}
            >
              {genre}
            </Text>
          </Pressable>
        ))}
      </View>

      {error && <Text style={styles.error}>Lỗi: {error}</Text>}

      {isLoading && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
          <Text>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          key={isTile ? "grid" : "list"}
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          numColumns={isTile ? 2 : 1}
          columnWrapperStyle={
            isTile ? { justifyContent: "space-between" } : undefined
          }
          contentContainerStyle={{
            padding: 12,
          }}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? "tile" : "row"}
              onSelect={selectMovie}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshMovies} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },

  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ddd",
  },

  activeButton: {
    backgroundColor: "#2196F3",
  },

  filterText: {
    color: "#333",
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  list: {
    flex: 1,
  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
    margin: 10,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
});
