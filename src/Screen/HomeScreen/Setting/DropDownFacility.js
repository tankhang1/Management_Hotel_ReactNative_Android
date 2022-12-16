import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const DropDownFacility = ({
  chip,
  setChip,
  open,
  setOpen,
  dataKind,
  value,
  setValue,
}) => {
  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        position: 'absolute',
        zIndex: 999,
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
            width: '90%',
            color: 'black',
          }}
          placeholderTextColor="hsl(0,0%,60%)"
          placeholder="Kind Room"
          value={value}
          onChangeText={setValue}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            value !== '' && dataKind.indexOf(value) === -1
              ? setChip([...chip, value])
              : null;
          }}
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
                    setValue(item),
                      setOpen(!open),
                      chip.indexOf(item) === -1
                        ? setChip([...chip, item])
                        : null;
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

export default DropDownFacility;
