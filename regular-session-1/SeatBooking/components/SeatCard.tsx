import React from "react";
import { Seat } from "../App";
import { StyleSheet, Text, View } from "react-native";

interface SeatProps {
  seat: Seat;
}
const SeatCard = ({ seat }: SeatProps) => {
  return (
    <View style={style.cardContainer}>
      <Text style={style.title}>{seat.seatNumber}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: "blue",
    margin: 5,
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontSize:24,
    fontWeight:"bold",

  }
});

export default SeatCard;
