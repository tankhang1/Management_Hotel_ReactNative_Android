import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState} from 'react';

const DropDownKind = ({width, open, setOpen, dataKind, value, setValue}) => {
  return (
    <View
      style={{
        justifyContent: 'flex-end',
        width: width,
        borderWidth: 1,
        borderRadius: 10,
        position: 'absolute',
        zIndex: 9999,
        backgroundColor: 'white',
        top: 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          style={{
            width: '85%',
            color: 'black',
          }}
          placeholder="Kind Room"
          value={value}
          onChangeText={setValue}
          onFocus={() => setOpen(true)}
          placeholderTextColor="hsl(0,0%,60%)"
        />
        <Pressable
          onPress={() => {
            setOpen(!open);
          }}>
          <Entypo
            name={open === true ? 'chevron-up' : 'chevron-down'}
            color={'black'}
            size={20}
          />
        </Pressable>
      </View>
      <ScrollView>
        {open === true
          ? dataKind.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    setValue(item), setOpen(!open);
                  }}
                  key={index}
                  style={{
                    paddingVertical: 5,
                    paddingLeft: 5,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {item}
                  </Text>
                </Pressable>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
};

export default DropDownKind;
