import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Movie } from "../interfaces/Movie";
import { useFetch } from "../hooks/useFetch";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;
const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieDetailScreen = ({ route }: Props) => {
  const { id } = route.params;
  const { get, isLoading, error } = useFetch(baseURL);
  const [movie, setMovie] = useState<Movie | null>(null);

  const fetchMovies = async () => {
    const res = await get(`/movies/${id}`);
    if (res) setMovie(res);
  };

  useEffect(() => {
    fetchMovies();
  }, [id]);

  if (error) {
    return (
      <View>
        <Text style={styles.error}>Lỗi {error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loading}>Đang tải dữ liệu...</Text>
        <ActivityIndicator size={"large"} animating={true} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View>
        <Text style={styles.error}>Không tìm thấy phim đã chọn {error}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: movie.poster }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text numberOfLines={1} style={styles.title}>
        {movie.title}
      </Text>
      <Text>Thể loại: {movie.genre}</Text>
      <Text>Năm: {movie.year}</Text>
      <Text>Đánh giá: ⭐ {movie.rating.toFixed(1)}</Text>
      <Text>{movie.isShowing ? "Đang chiếu ✅" : "Ngừng chiếu ❌"}</Text>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  poster: {
    width: "100%",
    height: 400,
    borderRadius: 2,
  },
  info: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
