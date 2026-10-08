import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Movie } from "./../interface/Movie";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";
import { useFetch } from "../hook/useFetch";
import { ActivityIndicator, Button, Switch } from "react-native-paper";
type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieScreen = ({ navigation }: Props) => {
  const { isLoading, error, get } = useFetch(baseURL);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isTile, setIsTile] = useState(false);
  const [selectStatus, setSelectStatus] = useState("All");

  const fileterStatus =
    selectStatus === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectStatus);

  const fetchMovie = async () => {
    const res = await get("/movies");
    if (res) setMovies(res);
  };
  useEffect(() => {
    fetchMovie();
  }, []);

  const refreshMovie = async () => {
    setRefreshing(true);
    fetchMovie();
    setRefreshing(false);
  };
  const selectMovie = (id: string) => {
    navigation.navigate("MovieDetail", { id });
  };

  if (error) {
    return (
      <Text style={{ textAlign: "center", color: "red", fontSize: 30 }}>
        Lỗi ... {error}
      </Text>
    );
  }
  return (
    <SafeAreaView>
      <View style={styles.switchContainer}>
        <Text>Dạng lưới</Text>
        <Switch value={isTile} onValueChange={setIsTile} />
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {["All", "Action", "Comedy", "Drama"].map((genre) => (
          <Button
            mode="contained"
            buttonColor="blue"
            onPress={() => setSelectStatus(genre)}
          >
            {genre}
          </Button>
        ))}
      </View>
      {isLoading && !refreshing ? (
        <View>
          <Text style={{ textAlign: "center", color: "blue", fontSize: 30 }}>
            Loading ...
          </Text>
          <ActivityIndicator size={"large"} animating={true} />
        </View>
      ) : (
        <FlatList
          data={fileterStatus}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? "row" : "tile"}
              onSelect={selectMovie}
            />
          )}
          key={isTile ? "grid" : "list"}
          numColumns={isTile ? 2 : 1}
          columnWrapperStyle={
            isTile ? { justifyContent: "space-between" } : undefined
          }
          contentContainerStyle={{ padding: 12 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refreshMovie} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  list: {
    flex: 1,
  },
});
