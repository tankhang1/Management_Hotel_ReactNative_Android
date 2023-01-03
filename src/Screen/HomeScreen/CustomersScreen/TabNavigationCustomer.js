import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DataBottomNavigation from './DataBottomNavigation';
import TabButton from './TabButton';
const TabNavigationCustomer = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: '95%',
          borderRadius: 10,
          height: 60,
          position: 'relative',
          bottom: 16,
          backgroundColor: 'white',
          alignContent: 'center',
          alignSelf: 'center',
          elevation: 5,
        },
      }}>
      {DataBottomNavigation.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.route_component}
            options={{
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default TabNavigationCustomer;
