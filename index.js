/**
 * @format
 */

import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import {Log} from 'victory-core';
LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
