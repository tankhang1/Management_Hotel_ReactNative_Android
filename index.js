/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
import {decode, encode} from 'base-64';
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
