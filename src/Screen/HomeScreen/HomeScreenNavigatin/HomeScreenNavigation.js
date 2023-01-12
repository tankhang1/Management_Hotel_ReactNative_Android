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
import DashBoard from '../../HomeScreen/Dashboard/Dashboard';
import BillNavigation from '../Bill/BillNavigation';
import {useSelector} from 'react-redux';

const Drawer = createDrawerNavigator();

const HomeScreenNavigation = () => {
  const currentEmployee = useSelector(state => state.data_infor).data
    .currentEmployee;
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      // drawerContent={props => <CustomizeDrawer {...props} />}
    >
      {/* <Drawer.Screen name="Home" component={DashBoard} />
      <Drawer.Screen name="BillNavigation" component={BillNavigation} />
      <Drawer.Screen name="Setting" component={Setting} /> */}
      <Drawer.Screen name="Report" component={Report} />
      {/* {currentEmployee.Level < 2 ? (
        <Drawer.Group
          navigationKey={
            currentEmployee.Level === 0 || currentEmployee.Level === 1
              ? 'manager'
              : 'employee'
          }>
          <Drawer.Screen name="Employee" component={EmployeeNavigation} />
          <Drawer.Screen name="Report" component={Report} />
        </Drawer.Group>
      ) : null}
      {currentEmployee.Level === 0 ? (
        <Drawer.Screen name="Customer" component={TabNavigationCustomer} />
      ) : null} */}
    </Drawer.Navigator>
  );
};

export default HomeScreenNavigation;
