import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie, RootStackParamList } from "../types/Movie";
import { useFetch } from "./../hooks/useFetch";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, Switch } from "react-native-paper";
import MovieCard from "../components/MovieCard";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;
const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieListScreen = ({ navigation }: Props) => {
  const { isLoading, error, get } = useFetch(baseURL);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isTile, setIsTile] = useState(false);

  const [selectStatus, setSelectStatus] = useState("All");

  const filterStatus =
    selectStatus === "All"
      ? movies
      : movies.filter((movie) => movie.genre == selectStatus);
  const fetchMovie = async () => {
    const res = await get("/movies");
    if (res) {
      setMovies(res);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const handleRefreshing = async () => {
    setRefresh(true);
    fetchMovie();
    setRefresh(false);
  };

  const handleSelect = (id: string) => {
    navigation.navigate("Detail", { id });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          justifyContent: "flex-end",
          padding: 10,
        }}
      >
        <Text>Dạng lưới</Text>
        <Switch value={isTile} onValueChange={setIsTile} />
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          gap: 10,
        }}
      >
        {["All", "Comedy", "Drama", "Action"].map((genre) => (
          <Button
            mode="contained-tonal"
            buttonColor={selectStatus === genre ? "red" : "blue"}
            onPress={() => setSelectStatus(genre)}
          >
            {genre}
          </Button>
        ))}
      </View>
      {error && (
        <Text style={{ textAlign: "center", fontSize: 30, color: "red" }}>
          Lỗi..{error}
        </Text>
      )}
      {isLoading && !refresh ? (
        <View>
          <Text style={{ textAlign: "center", fontSize: 30, color: "blue" }}>
            Loading...
          </Text>
          <ActivityIndicator animating={true} size={"large"} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={filterStatus}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? "tile" : "row"}
              onSelect={handleSelect}
            />
          )}
          key={isTile ? "grid" : "list"}
          numColumns={isTile ? 2 : 1}
          columnWrapperStyle={
            isTile ? { justifyContent: "space-between" } : undefined
          }
          contentContainerStyle={{ padding: 12 }}
          refreshControl={
            <RefreshControl onRefresh={handleRefreshing} refreshing={refresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default MovieListScreen;

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
