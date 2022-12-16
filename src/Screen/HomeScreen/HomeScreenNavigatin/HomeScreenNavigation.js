import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Report from '../Report';
import Room from '../Bill/Room';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomizeDrawer from './CustomizeDrawer';
import Booking from '../Bill/Booking';
import RoomDetail from '../Bill/RoomDetail';
import Bill from '../Bill/Bill';
import Setting from '../Setting/Setting';
import TabNavigationCustomer from '../CustomersScreen/TabNavigationCustomer';
import EmployeeNavigation from '../Employees/EmployeeNavigation';
import DashBoard from '../../HomeScreen/Dashboard/Index';
import {fetchData} from '../../../Redux/thunk/fetchData';
import {useDispatch, useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

const HomeScreenNavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomizeDrawer {...props} />}>
      <Drawer.Screen name="Home" component={DashBoard} />
      <Drawer.Screen name="Customer" component={TabNavigationCustomer} />
      <Drawer.Screen name="Employee" component={EmployeeNavigation} />
      <Drawer.Screen name="Report" component={Report} />
      <Drawer.Screen name="Room" component={Room} />
      <Drawer.Screen name="Booking" component={Booking} />
      <Drawer.Screen name="RoomDetail" component={RoomDetail} />
      <Drawer.Screen name="Bill" component={Bill} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
};

export default HomeScreenNavigation;
