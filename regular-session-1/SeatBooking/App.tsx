import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import SeatCard from "./components/SeatCard";
import { SafeAreaView } from "react-native-safe-area-context";

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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={seats}
        numColumns={4}
        keyExtractor={(seat) => seat.seatNumber.toString()}
        renderItem={({ item }) => <SeatCard seat={item}></SeatCard>}
      ></FlatList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
