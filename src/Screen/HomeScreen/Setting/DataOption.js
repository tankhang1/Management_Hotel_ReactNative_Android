import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const DataOption = [
  {
    title: 'Change profile',
    Icon_type: AntDesign,
    icon_name: 'profile',
    transY: 1,
    navigation_name: '',
  },
  {
    title: 'Add room',
    Icon_type: MaterialIcons,
    icon_name: 'add-box',
    transY: 2,
  },
  {
    title: 'Menu',
    Icon_type: Entypo,
    icon_name: 'menu',
    transY: 3,
  },
  {
    title: 'Reset password',
    Icon_type: MaterialCommunityIcons,
    icon_name: 'lock-reset',
    transY: 3,
  },
  {
    title: 'Logout',
    Icon_type: MaterialIcons,
    icon_name: 'exit-to-app',
    transY: 4,
  },
];
export default DataOption;
