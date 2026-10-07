import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { Movie } from "../interface/Movie";

export type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";

  return (
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
            <Text>{movie.isShowing ? "✅ Đang chiếu" : "❌ Ngừng chiếu"}</Text>
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
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
