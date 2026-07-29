import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SeatCard from "./components/SeatCard";

export interface Seat {
  seatNumber: number;
  isSelected: boolean;
  isBooked: boolean;
}

const initSeat: Seat[] = Array.from({ length: 40 }, (_, i) => {
  return {
    seatNumber: i + 1,
    isSelected: false,
    isBooked: false,
  };
});

export default function App() {
  const [seats, setSeats] = useState<Seat[]>(initSeat);
  return (
    <View style={styles.container}>
      <FlatList
        data={seats}
        numColumns={4}
        keyExtractor={(seat) => seat.seatNumber.toString()}
        renderItem={({ item }) => <SeatCard seat={item}></SeatCard>}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
