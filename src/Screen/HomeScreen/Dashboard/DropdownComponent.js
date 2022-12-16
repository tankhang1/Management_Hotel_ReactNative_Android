import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import DataDropDown from './DataDropDown';
import Entypo from 'react-native-vector-icons/Entypo';
const DropdownComponent = ({value, setValue, open, setOpen}) => {
  return (
    <View
      style={{
        width: 120,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'hsl(0,0%,73%)',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          paddingVertical: 7,
          paddingHorizontal: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <value.icon_type name={value.icon_name} size={20} color="black" />
          <Text
            style={{
              color: 'black',
              marginLeft: 5,
            }}>
            {value.title}
          </Text>
        </View>
        <Entypo
          name={open === true ? 'chevron-up' : 'chevron-down'}
          color={'black'}
        />
      </View>
      {open === true
        ? DataDropDown.map((item, index) => {
            if (item.title !== value.title)
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setValue({
                      title: item.title,
                      icon_type: item.icon_type,
                      icon_name: item.icon_name,
                    }),
                      setOpen(!open);
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 7,
                      paddingHorizontal: 5,
                    }}>
                    <item.icon_type
                      name={item.icon_name}
                      size={20}
                      color="black"
                    />
                    <Text
                      style={{
                        color: 'black',
                        marginLeft: 5,
                      }}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
          })
        : null}
    </View>
  );
};

export default DropdownComponent;
