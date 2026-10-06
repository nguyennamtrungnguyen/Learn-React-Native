import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { Movie } from "../interface/Movie";

export type MovieCardProps = {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: number) => void;
};

const MovieCard = ({ movie, layout = "row", onSelect }: MovieCardProps) => {
  const isTile = layout === "tile";
  const ratingText = `⭐ ${movie.rating.toFixed(1)}`;
  const statusIcon = movie.isShowing ? "✅" : "❌";

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(movie.id)}
      style={[{ marginBottom: 12 }, isTile && { width: "48%" }]}
    >
      <Card style={{ padding: 8 }}>
        <View
          style={[
            { flexDirection: "row" },
            isTile && { flexDirection: "column" },
          ]}
        >
          {/* Poster */}
          <View style={isTile ? { width: "100%" } : { width: 70, height: 100 }}>
            <Image
              source={{ uri: movie.poster }}
              resizeMode="cover"
              style={[
                { borderRadius: 8, backgroundColor: "#ddd" },
                isTile
                  ? { width: "100%", aspectRatio: 2 / 3 }
                  : { width: 70, height: 100 },
              ]}
            />
            {isTile && (
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

          {/* Thông tin */}
          <View
            style={[
              { flex: 1, justifyContent: "center" },
              isTile ? { marginTop: 8 } : { marginLeft: 12 },
            ]}
          >
            <Text
              numberOfLines={isTile ? 1 : 2}
              style={{ fontSize: 16, fontWeight: "bold" }}
            >
              {movie.title}
            </Text>

            {!isTile && (
              <>
                <Text style={{ color: "#666", marginTop: 2 }}>
                  {movie.genre}
                </Text>
                <Text style={{ color: "#666" }}>Năm: {movie.year}</Text>
                <Text style={{ marginTop: 4 }}>{ratingText}</Text>
              </>
            )}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Text>{statusIcon}</Text>
              <Text style={{ marginLeft: 4, fontSize: 12, color: "#444" }}>
                {movie.isShowing ? "Đang chiếu" : "Ngừng chiếu"}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);
