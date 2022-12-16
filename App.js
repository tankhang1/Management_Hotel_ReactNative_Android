import {View, StatusBar, LogBox} from 'react-native';
import React from 'react';
import AllScreenNavigation from './src/AllScreenNavigation/Navigation';
import {Provider, useSelector} from 'react-redux';
import Store from './src/Redux/Store';

LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={Store}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 40,
        }}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={'transparent'}
          translucent={true}
        />
        <AllScreenNavigation />
      </View>
    </Provider>
  );
};

export default App;
