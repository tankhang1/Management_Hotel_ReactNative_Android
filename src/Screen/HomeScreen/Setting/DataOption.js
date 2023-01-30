import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
const DataOption = [
  {
    title: 'Change Profile',
    Icon_type: AntDesign,
    icon_name: 'profile',
    transY: 1,
    navigation_name: '',
  },
  {
    title: 'Add Room',
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
    title: 'Exit',
    Icon_type: MaterialIcons,
    icon_name: 'exit-to-app',
    transY: 4,
  },
];
export default DataOption;
