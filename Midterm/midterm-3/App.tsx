import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MovieScreen from "./src/screens/MovieScreen";

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Movie: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
              />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="Movie" component={MovieScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
