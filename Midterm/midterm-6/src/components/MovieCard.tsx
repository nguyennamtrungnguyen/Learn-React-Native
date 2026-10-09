import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Movie } from "../types/Movie";
import { Card } from "react-native-paper";

type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
};

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";
  return (
    <TouchableOpacity
      style={[{ width: "100%", marginBottom: 12 }, isTile && { width: "48%" }]}
      onPress={() => onSelect(movie.id)}
    >
      <Card style={{ padding: 8 }}>
        <View
          style={[
            { flexDirection: "row" },
            isTile && { flexDirection: "column" },
          ]}
        >
          <Image
            style={[
              { width: 70, height: 100, borderRadius: 8 },
              isTile && { width: "100%", height: 250 },
            ]}
            source={{ uri: movie.poster }}
          />
          {isTile && (
            <Text
              style={{ position: "absolute", top: 6, right: 6, color: "white" }}
            >
              ⭐ {movie.rating.toFixed(1)}
            </Text>
          )}

          <View style={{ flex: 1, marginLeft: 10, marginTop: 5 }}>
            <Text numberOfLines={1}>{movie.title}</Text>
            <Text>{movie.genre}</Text>
            <Text>{movie.year}</Text>
            {!isTile && <Text>⭐{movie.rating.toFixed(1)}</Text>}
            <Text>{movie.isShowing ? "✅ Đang chiếu" : "❌ Ngừng Chiếu"}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
