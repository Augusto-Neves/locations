import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/colors';
import { IconButton } from './components/UI/IconButton';

// Screens
import { AllPlaces } from './screens/AllPlaces';
import { AddPlace } from './screens/AddPlace';
import { MapScreen } from './screens/Map';
import { useEffect, useCallback, useState } from 'react';
import { init } from './utils/database';

const Stack = createStackNavigator();

export default function App() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        init();
      } catch (error) {
        console.error(error);
      } finally {
        setIsDbInitialized(true);
      }
    })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isDbInitialized) await SplashScreen.hideAsync();
  }, [isDbInitialized]);

  if (!isDbInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            cardStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
        >
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your favorites places',
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="add"
                  color={tintColor}
                  size={24}
                  onPress={() => navigation.navigate('AddPlace')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a new place',
            }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
