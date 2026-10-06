import { FlatList, StyleSheet, Text, View } from "react-native";

import React, { useEffect, useState } from "react";

import { useFetch } from "../hooks/useFetch";
import { Bike } from "../interface/Bike";
import { SafeAreaView } from "react-native-safe-area-context";
import BikeCard from "../components/BikeCard";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "BikeStore">;

const baseURL = "https://697c4082889a1aecfeb1caab.mockapi.io/";

const BikeStoreScreen = ({ navigation }: Props) => {
  const { isLoading, error, get } = useFetch(baseURL);

  const [bikes, setBikes] = useState<Bike[]>([]);

  const handleFetch = async () => {
    const res = await get("/bikes");

    if (res) {
      setBikes(res);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (isLoading)
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            color: "blue",
          }}
        >
          Loading...
        </Text>
      </View>
    );

  if (error)
    return (
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
            color: "red",
          }}
        >
          Lỗi...{error}
        </Text>
      </View>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {!isLoading && (
        <FlatList
          numColumns={2}
          data={bikes}
          keyExtractor={(item) => item.id}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
          renderItem={({ item }) => (
            <BikeCard bike={item} navigation={navigation} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default BikeStoreScreen;

const styles = StyleSheet.create({});
