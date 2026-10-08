import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Movie } from "../interface/Movie";
import { Card } from "react-native-paper";

type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};
const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "row";
  return (
    <TouchableOpacity
      onPress={() => onSelect(movie.id)}
      style={[styles.container, isTile && styles.tile]}
    >
      <Card style={{ padding: 8 }}>
        <View style={[styles.content, isTile && styles.column]}>
          <Image
            style={[styles.image, isTile && styles.tileImage]}
            source={{ uri: movie.poster }}
          />
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.title}>
              {movie.title}
            </Text>
            <Text>Thể loại: {movie.genre}</Text>
            <Text>Năm: {movie.year}</Text>
            <Text>⭐{movie.rating.toFixed(1)}</Text>
            <Text>{movie.isShowing ? "Đang chiếu✅" : "Ngừng Chiếu❌"}</Text>
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
  image: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  tileImage: {
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
  content: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
});
