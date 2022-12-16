import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthScreenNavigation from '../Screen/AuthScreen/Navigation/AuthScreenNavigation';
import HomeScreenNavigation from '../Screen/HomeScreen/HomeScreenNavigatin/HomeScreenNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Introduce from '../Screen/Introduce/Introduce';
const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="AuthScreen" component={AuthScreenNavigation} />
        <Stack.Screen name="HomeScreen" component={HomeScreenNavigation} />
        <Stack.Screen name="IntroScreen" component={Introduce} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
