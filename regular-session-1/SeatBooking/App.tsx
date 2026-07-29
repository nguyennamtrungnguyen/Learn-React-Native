import { useState } from "react";
import { Alert, Button, FlatList, StyleSheet, View } from "react-native";
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

    setSeats((prev) =>
      prev.map((item) => {
        if (item.seatNumber === seatNumber) {
          return {
            ...item,
            isSelected: !item.isSelected,
          };
        }
        return item;
      }),
    );
  };

  const onSubmit = () => {
    setSeats((prev) =>
      prev.map((item) => {
        if (item.isSelected) {
          return {
            ...item,
            isSelected: false,
            isBooked: true,
          };
        }

        return item;
      }),
    );
  };

  const handleConfirm = () => {
    Alert.alert("Xác nhận", "Xác nhận ghế đã đặt!", [
      {
        text: "Xác nhận",
        onPress: () => onSubmit(),
      },
      {
        text: "Hủy bỏ",
      },
    ]);
  };
  return (
    // SafeAreaView: giúp nội dung của app nằm bên trong không đè lên các thành phần mặc định
    <SafeAreaView style={styles.container}>
      {/* thư viện nút chọn */}
      <FlatList
        data={seats}
        numColumns={4}
        keyExtractor={(seat) => seat.seatNumber.toString()}
        renderItem={({ item }) => (
          <SeatCard onClick={handleSelect} seat={item}></SeatCard>
        )}
      ></FlatList>

      <View style={styles.buttonBook}>
        <Button title="Đặt Ghế" onPress={() => handleConfirm()}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  buttonBook: {
    padding: 10,
  },
});
