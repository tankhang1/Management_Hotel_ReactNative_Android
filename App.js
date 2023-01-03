import {View, StatusBar} from 'react-native';
import React from 'react';
import AllScreenNavigation from './src/AllScreenNavigation/Navigation';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import Search from './src/Screen/HomeScreen/Bill/Search';

const App = () => {
  return (
    <Provider store={Store}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <AllScreenNavigation />
      </View>
    </Provider>
  );
};

export default App;
