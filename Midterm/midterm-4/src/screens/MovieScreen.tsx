import {
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../interfaces/Movie";
import { SafeAreaView } from "react-native-safe-area-context";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { ActivityIndicator, Button, Switch } from "react-native-paper";
import MovieCard from "../components/MovieCard";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;
const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieScreen = ({ navigation }: Props) => {
  const { get, isLoading, error } = useFetch(baseURL);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectStatus, setSelectStatus] = useState("All");
  const filterStatus =
    selectStatus === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectStatus);

  const fetchMovies = async () => {
    const res = await get("/movies");
    if (res) setMovies(res);
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
    navigation.navigate("MovieDetail", { id });
  };

  if (error) {
    return (
      <View>
        <Text style={styles.error}>Lỗi {error}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <View style={styles.switchContainer}>
        <View style={{ flexDirection: "row" }}>
          {["All", "Action", "Comedy", "Drama"].map((genre) => (
            <Button
              buttonColor="blue"
              key={genre}
              onPress={() => setSelectStatus(genre)}
            >
              <Text style={{ color: "white" }}>{genre}</Text>
            </Button>
          ))}
        </View>
        <View>
          <Text>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      {isLoading && !refreshing ? (
        <View style={styles.center}>
          <Text style={styles.loading}>Đang tải dữ liệu...</Text>
          <ActivityIndicator size={"large"} animating={true} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          key={isTile ? "grid" : "list"}
          data={filterStatus}
          keyExtractor={(item) => item.id}
          numColumns={isTile ? 2 : 1}
          columnWrapperStyle={
            isTile ? { justifyContent: "space-between" } : undefined
          }
          contentContainerStyle={{ padding: 12 }}
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
    fontSize: 20,
    margin: 10,
  },
  loading: {
    color: "blue",
    textAlign: "center",
    fontSize: 20,
    margin: 10,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});
