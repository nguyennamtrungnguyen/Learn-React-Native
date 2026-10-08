import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useFetch } from "../hook/useFetch";
import { Movie } from "../interface/Movie";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
type Props = NativeStackScreenProps<RootStackParamList, "MovieDetail">;

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieDetailScreen = ({ route }: Props) => {
  const { isLoading, error, get } = useFetch(baseURL);
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = route.params;
  const fetchMovie = async () => {
    const res = await get(`/movies/${id}`);
    if (res) setMovie(res);
  };
  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (error) {
    return (
      <Text style={{ textAlign: "center", color: "red", fontSize: 30 }}>
        Lỗi ... {error}
      </Text>
    );
  }

  if (isLoading) {
    return (
      <View>
        <Text style={{ textAlign: "center", color: "blue", fontSize: 30 }}>
          Loading ...
        </Text>
        <ActivityIndicator size={"large"} animating={true} />
      </View>
    );
  }

  if (!movie) {
    return (
      <View>
        <Text style={{ textAlign: "center", color: "blue", fontSize: 30 }}>
          Không Tìm Thấy Phim
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Image style={styles.image} source={{ uri: movie.poster }} />
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.title}
        </Text>
        <Text>Thể loại: {movie.genre}</Text>
        <Text>Năm: {movie.year}</Text>
        <Text>⭐{movie.rating.toFixed(1)}</Text>
        <Text>{movie.isShowing ? "Đang chiếu✅" : "Ngừng Chiếu❌"}</Text>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 250,
  },
  info: {
    marginLeft: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
