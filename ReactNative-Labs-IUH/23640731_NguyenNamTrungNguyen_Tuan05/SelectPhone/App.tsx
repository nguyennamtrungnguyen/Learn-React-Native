import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import PhoneDetail from './src/screens/PhoneDetail';
import PhoneSelect from './src/screens/PhoneSelect';

export type RootStackParamList = {
  Home: undefined,
  PhoneDetail: undefined,
  PhoneSelect: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()
export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="PhoneDetail" component={PhoneDetail}></Stack.Screen>
            <Stack.Screen name="PhoneSelect" component={PhoneSelect}></Stack.Screen>
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
