import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { Movie } from "../interface/Movie";

type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: number) => void;
};
const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTitle = layout === "title";
  const ratingText = `⭐ ${movie.rating.toFixed(1)}`;
  const statusIcon = movie.isShowing ? "✅" : "❌";
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(movie.id)}
      style={[{ marginBottom: 12 }, isTitle && { width: "48%" }]}
    >
      <Card style={{ padding: 8 }}>
        <View
          style={[
            { flexDirection: "row" },
            isTitle && { flexDirection: "column" },
          ]}
        >
          <View
            style={isTitle ? { width: "100%" } : { width: 70, height: 100 }}
          >
            <Image
              source={{ uri: movie.poster }}
              style={[
                { borderRadius: 8, backgroundColor: "#ddd" },
                isTitle
                  ? { width: "100%", aspectRatio: 2 / 3 }
                  : { width: 70, height: 100 },
              ]}
            />
            {isTitle && (
              <View
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  backgroundColor: "rgba(0,0,0,0.7)",
                  borderRadius: 6,
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 12, fontWeight: "600" }}
                >
                  {ratingText}
                </Text>
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text></Text>
          </View>
          <Card.Title title={movie.title} />
          <Card.Content>
            <Text>{movie.title}</Text>
          </Card.Content>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default MovieCard;

const styles = StyleSheet.create({});
