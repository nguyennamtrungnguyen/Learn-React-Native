import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "./src/types/Movie";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import MovieListScreen from "./src/screens/MovieListScreen";
import MovieDetailScreen from "./src/screens/MovieDetailScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <PaperProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Movie">
              <Stack.Screen
                name="Movie"
                options={{ title: "Movie App" }}
                component={MovieListScreen}
              />
              <Stack.Screen name="Detail" component={MovieDetailScreen} />
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
