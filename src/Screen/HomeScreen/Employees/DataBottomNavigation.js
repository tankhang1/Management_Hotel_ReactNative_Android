import Entypo from 'react-native-vector-icons/Entypo';
import EmployeesList from './EmployeesList';
import Feather from 'react-native-vector-icons/Feather';
import AddEmployee from './AddEmployee';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EmployeesProfile from './EmployeesProfile';
export default DataBottom = [
  {
    id: 1,
    title: 'List',
    icon_name: 'list',
    Icon_type: Entypo,
    route: 'EmployeeList',
    route_component: EmployeesList,
  },
  {
    id: 2,
    title: 'Add',
    icon_name: 'plus',
    Icon_type: Feather,
    route: 'EmployeeAdd',
    route_component: AddEmployee,
  },
  {
    id: 3,
    title: 'Profile',
    icon_name: 'profile',
    Icon_type: AntDesign,
    route: 'EmployeeProfile',
    route_component: EmployeesProfile,
  },
];
