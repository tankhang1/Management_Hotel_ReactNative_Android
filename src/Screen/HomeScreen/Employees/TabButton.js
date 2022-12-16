import {View, Text} from 'react-native';
import React from 'react';

const TabButton = props => {
  const {item, focused, index} = props;
  if (index === 1)
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            transform: [{translateY: -20}],
            backgroundColor: 'hsl(145,67%,47%)',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 5,
          }}>
          <item.Icon_type name={item.icon_name} size={25} color={'white'} />
        </View>
      </View>
    );
  else
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <item.Icon_type
          name={item.icon_name}
          size={25}
          color={focused ? '#605BFF' : 'black'}
        />
        <Text
          style={{
            fontSize: 12,
            color: focused ? '#605BFF' : 'black',
          }}>
          {item.title}
        </Text>
      </View>
    );
};

export default TabButton;
