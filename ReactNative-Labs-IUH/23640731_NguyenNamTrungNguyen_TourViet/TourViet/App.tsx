import { SafeAreaProvider } from 'react-native-safe-area-context';
import TourScreen from './src/screens/TourScreen';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Tour: undefined;
  Detail: { id: string };
};

export default function App() {
  return (
    <SafeAreaProvider>
      <TourScreen />
    </SafeAreaProvider>
  );
}
