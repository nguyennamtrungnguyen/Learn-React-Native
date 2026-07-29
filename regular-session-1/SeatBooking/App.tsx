import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
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
    isBooked: i >= 30 ? true : false,
  };
});

export default function App() {
  const [seats, setSeats] = useState<Seat[]>(initSeat);

  const handleSelect = (seatNumber: number) => {
    const seat = seats.find((item) => item.seatNumber === seatNumber);
    if (!seat) return;

    if (seat.isBooked) {
      Alert.alert("Thông báo", "Ghế này đã có người đặt");
      return;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={seats}
        numColumns={4}
        keyExtractor={(seat) => seat.seatNumber.toString()}
        renderItem={({ item }) => (
          <SeatCard onClick={handleSelect} seat={item}></SeatCard>
        )}
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
