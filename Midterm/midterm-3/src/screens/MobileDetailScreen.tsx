import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { Movie } from "../interface/Movie";
import { useFetch } from "../hooks/useFetch";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";

const MovieDetailScreen = ({ route }: Props) => {
  const { movieId } = route.params;

  const { get, isLoading, error } = useFetch(baseURL);

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await get(`/movies/${movieId}`);

      if (res) {
        setMovie(res);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Lỗi: {error}</Text>
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy phim</Text>
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

      <Text style={styles.title}>{movie.title}</Text>

      <Text style={styles.info}>Thể loại: {movie.genre}</Text>

      <Text style={styles.info}>Năm: {movie.year}</Text>

      <Text style={styles.info}>⭐ {movie.rating.toFixed(1)}</Text>

      <Text style={styles.info}>
        Trạng thái: {movie.isShowing ? "Đang chiếu" : "Ngừng chiếu"}
      </Text>
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

  poster: {
    width: "100%",
    height: 400,
    borderRadius: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
  },

  info: {
    fontSize: 16,
    marginTop: 8,
  },

  error: {
    color: "red",
  },
});
