import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Movie } from "../interface/Movie";
import { SafeAreaView } from "react-native-safe-area-context";
import { Switch } from "react-native-paper";
import MovieCard from "../components/MovieCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";

const MovieScreen = ({ navigation }: Props) => {
  const { isLoading, error, get } = useFetch(baseURL);
  const [isTile, setIsTile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const numcolumns = isTile ? 2 : 1;
  const handleFetch = async () => {
    const res = await get("/movies");

    if (res) {
      setMovies(res);
    }
  };
  useEffect(() => {
    handleFetch();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await handleFetch();
    setRefreshing(false);
  };

  const handleSelect = useCallback(
    (id: string) => {
      navigation.navigate("MovieDetail", {
        id,
      });
    },
    [navigation],
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
            keyExtractor={(item) => item.id.toString()}
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
        </View>
      )}
    </SafeAreaView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({});
