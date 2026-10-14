import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import TourScreen from './src/screens/TourScreen';
import TourDetail from './src/screens/TourDetail';

export type RootStackParamList = {
  Home: undefined,
  Profile: undefined,
  Tour: undefined,
  Detail: {id: string}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name='Home' component={HomeScreen}/>
              <Stack.Screen name='Profile' component={ProfileScreen}/>
              <Stack.Screen name='Tour' component={TourScreen}/>
              <Stack.Screen name='Detail' component={TourDetail}/>
            </Stack.Navigator>
          </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
