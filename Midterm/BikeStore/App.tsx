import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import BikeStoreScreen from "./src/screens/BikeStoreScreen";
import BikeDetailScreen from "./src/screens/BikeDetailScreen";

import { Bike } from "./src/interface/Bike";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  BikeStore: undefined;
  BikeDetail: {
    bike: Bike;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: "Student Information",
              }}
            />

            <Stack.Screen
              name="BikeStore"
              component={BikeStoreScreen}
              options={{
                title: "The world's Best Bike",
              }}
            />

            <Stack.Screen
              name="BikeDetail"
              component={BikeDetailScreen}
              options={{
                title: "",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
