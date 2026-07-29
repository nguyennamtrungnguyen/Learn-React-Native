import React from "react";
import { Seat } from "../App";
import { Text, View } from "react-native";

interface SeatProps {
  seat: Seat;
}
const SeatCard = ({ seat }: SeatProps) => {
  return (
    <View>
      <Text>{seat.seatNumber}</Text>
    </View>
  );
};

export default SeatCard;
