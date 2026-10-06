import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Bike } from "../interface/Bike";
import { RootStackParamList } from "../../App";

export type BikeProp = {
  bike: Bike;
  navigation: NativeStackNavigationProp<RootStackParamList, "BikeStore">;
};

const BikeCard = ({ bike, navigation }: BikeProp) => {
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
    <TouchableOpacity
      style={{
        width: 170,
        marginBottom: 10,
      }}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("BikeDetail", {
          bike: bike,
        })
      }
    >
      <Card
        style={{
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: "#fff5ed",
        }}
      >
        <Image
          source={getBikeImage()}
          style={{
            width: "100%",
            height: 150,
            resizeMode: "contain",
          }}
        />

        <Text
          style={{
            fontSize: 16,
            margin: 8,
            color: "#666",
          }}
          numberOfLines={1}
        >
          {bike.title}
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#f39c12",
            marginHorizontal: 8,
            marginBottom: 8,
            fontWeight: "500",
          }}
        >
          $ {bike.price}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

export default BikeCard;
