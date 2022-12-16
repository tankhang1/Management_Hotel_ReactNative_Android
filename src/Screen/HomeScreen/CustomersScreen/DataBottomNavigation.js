import AddCustomers from './AddCustomers';
import CustomersProfile from './CustomersProfile';
import SearchCustomer from './SearchCustomer';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomersList from './CustomersList';
const DataBottomNavigation = [
  {
    id: 1,
    title: 'List',
    icon_name: 'list',
    Icon_type: Entypo,
    route: 'CustomerList',
    route_component: CustomersList,
  },
  {
    id: 2,
    title: 'Add',
    icon_name: 'person-add',
    Icon_type: Ionicons,
    route: 'AddCustomer',
    route_component: AddCustomers,
  },
  {
    id: 3,
    title: 'Search',
    icon_name: 'ios-search-sharp',
    Icon_type: Ionicons,
    route: 'SearchCustomer',
    route_component: SearchCustomer,
  },
  {
    id: 4,
    title: 'Profile',
    icon_name: 'profile',
    Icon_type: AntDesign,
    route: 'CustomerProfile',
    route_component: CustomersProfile,
  },
];
export default DataBottomNavigation;
