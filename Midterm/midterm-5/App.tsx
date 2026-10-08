import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import MovieDetailScreen from "./src/screen/MovieDetailScreen";
import MovieScreen from "./src/screen/MovieScreen";
import ProfileScreen from "./src/screen/ProfileScreen";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Movie: undefined;
  MovieDetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="MovieDetail" component={MovieDetailScreen} />
              <Stack.Screen name="Movie" component={MovieScreen} />
              <Stack.Screen name="Profile" component={ProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
