import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Movie } from "../interfaces/Movie";
import { Card } from "react-native-paper"; // dung cai nay tien

export type Props = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};
const MovieCard = ({ movie, layout = "row", onSelect }: Props) => {
  const isTile = layout === "tile";

  return (
    // Làm cái này trước để cho bài Bike Store khi click lấy data chuyển đến trang chi tiết sản phẩm
    <TouchableOpacity
      onPress={() => onSelect(movie.id)}
      style={[styles.container, isTile && styles.tile]}
    >
      <Card style={styles.card}>
        <View style={[styles.content, isTile && styles.column]}>
          <Image
            source={{ uri: movie.poster }}
            style={[styles.image, isTile && styles.tileImage]}
          />
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.title}>
              {movie.title}
            </Text>
            <Text>{movie.genre}</Text>
            <Text>Năm: {movie.year}</Text>
            <Text>⭐ {movie.rating.toFixed(1)}</Text>
            <Text>{movie.isShowing ? "Đang chiếu ✅" : "Ngừng chiếu ❌"}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  tile: {
    width: "48%",
  },
  card: {
    padding: 8,
  },
  content: {
    flexDirection: "row",
  },

  column: {
    flexDirection: "column",
  },
  tileImage: {
    width: "100%",
    height: 250,
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
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
