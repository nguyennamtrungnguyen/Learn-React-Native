import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "BikeDetail">;

const BikeDetailScreen = ({ route }: Props) => {
  const { bike } = route.params;

  const getBikeImage = () => {
    switch (bike.postURL) {
      case "../assets/bike_blue.png":
        return require("../../assets/bike_blue.png");

      case "../assets/bike_red.png":
        return require("../../assets/bike_red.png");

      case "../assets/bike_pink.png":
        return require("../../assets/bike_pink.png");

      case "../assets/bike_violet.png":
        return require("../../assets/bike_violet.png");

      default:
        return require("../../assets/bike_blue.png");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={getBikeImage()} style={styles.image} />
        </View>

        <Text style={styles.title}>{bike.title}</Text>

        <Text style={styles.price}>${bike.price}</Text>

        <Text style={styles.heading}>Description</Text>

        <Text style={styles.description}>
          It is a very important form of writing as we write almost everything
          in paragraphs, be it an answer, essay, story, emails, etc.
        </Text>

        <Button mode="contained" buttonColor="#ef3f43" style={styles.button}>
          Add to card
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BikeDetailScreen;

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 320,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fdeeee",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 15,
  },

  price: {
    fontSize: 22,
    color: "#f39c12",
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 5,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginTop: 25,
  },

  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginHorizontal: 15,
    marginTop: 10,
  },

  button: {
    margin: 15,
    borderRadius: 30,
  },
});
