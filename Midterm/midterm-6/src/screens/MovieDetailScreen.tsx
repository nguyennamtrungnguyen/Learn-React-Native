import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Card } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFetch } from "../hooks/useFetch";
import { SafeAreaView } from "react-native-safe-area-context";
import { Movie, RootStackParamList } from "../types/Movie";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";
const MovieDetailScreen = ({ route }: Props) => {
  const { isLoading, error, get } = useFetch(baseURL);
  const [movie, setMovie] = useState<Movie | null>(null);
  const { id } = route.params;

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await get(`/movies/${id}`);
      if (res) {
        setMovie(res);
      }
    };
    fetchMovie();
  }, [id]);
  if (error)
    <Text style={{ textAlign: "center", fontSize: 30, color: "red" }}>
      Lỗi..{error}
    </Text>;

  if (isLoading) {
    return (
      <View>
        <Text style={{ textAlign: "center", fontSize: 30, color: "blue" }}>
          Loading...
        </Text>
        <ActivityIndicator animating={true} size={"large"} />
      </View>
    );
  }

  if (!movie) {
    return (
      <Text style={{ textAlign: "center", fontSize: 30, color: "red" }}>
        Không Tìm Thấy Phim..{error}
      </Text>
    );
  }
  return (
    <SafeAreaView>
      <View>
        <Image
          style={{ width: "100%", height: 250, borderRadius: 8 }}
          source={{ uri: movie.poster }}
        />

        <View style={{ flex: 1, marginLeft: 10, marginTop: 5 }}>
          <Text>{movie.title}</Text>
          <Text>{movie.genre}</Text>
          <Text>{movie.year}</Text>
          <Text>⭐{movie.rating.toFixed(1)}</Text>
          <Text>{movie.isShowing ? "✅ Đang chiếu" : "❌ Ngừng Chiếu"}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({});
