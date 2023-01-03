import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Room from './Room';
import Booking from './Booking';
import RoomDetail from './RoomDetail';
import Bill from './Bill';
import Search from './Search';
const BillNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Room" component={Room} />
      <Stack.Screen name="Booking" component={Booking} />
      <Stack.Screen name="RoomDetail" component={RoomDetail} />
      <Stack.Screen name="Bill" component={Bill} />
      <Stack.Screen name="SearchRoom" component={Search} />
    </Stack.Navigator>
  );
};

export default BillNavigation;
