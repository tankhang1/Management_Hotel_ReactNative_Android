import {View, Text} from 'react-native';
import React from 'react';
import {memo} from 'react';
import {Picker} from '@react-native-picker/picker';

const DropdownYear = ({year, changYear}) => {
  return (
    <Picker
      style={{
        width: 150,
        backgroundColor: 'transparent',
      }}
      selectedValue={year}
      onValueChange={(itemValue, itemIndex) => {
        changYear(itemValue);
      }}
      mode="dropdown">
      {[...new Array(3)].map((_, i) => (
        <Picker.Item
          key={i}
          label={`${year + i}`}
          value={year + i}
          style={{
            color: 'black',
            backgroundColor: 'transparent',
            textAlign: 'center',
            width: 100,
            alignSelf: 'center',
            borderWidth: 1,
          }}
        />
      ))}
    </Picker>
  );
};

export default memo(DropdownYear);
