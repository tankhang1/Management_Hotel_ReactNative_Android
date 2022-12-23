/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
AppRegistry.registerComponent(appName, () => App);
