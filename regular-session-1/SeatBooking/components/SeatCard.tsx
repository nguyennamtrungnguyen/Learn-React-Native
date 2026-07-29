import React from "react";
import { Seat } from "../App";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface SeatProps {
  seat: Seat;
  onClick: (seatNumber: number) => void;
}
const SeatCard = ({ seat, onClick }: SeatProps) => {
  let seatStatusColor = "blue";
  if (seat.isBooked) seatStatusColor = "gray";
  else if (seat.isSelected) seatStatusColor = "red";
  return (
    <Pressable
      onPress={() => onClick(seat.seatNumber)}
      style={[style.cardContainer, { backgroundColor: seatStatusColor }]}
    >
      <Text style={style.title}>{seat.seatNumber}</Text>
    </Pressable>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SeatCard;
