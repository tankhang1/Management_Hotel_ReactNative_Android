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
        position: 'relative',
        zIndex: 999,
        backgroundColor: 'white',
        top: 0,
      }}>
      <Pressable
        onPress={() => {
          setOpen(!open);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            width: '90%',
            color: 'black',
            fontSize: 16,
          }}>
          {value}
        </Text>

        <Entypo
          name={open === true ? 'chevron-up' : 'chevron-down'}
          color={'black'}
          size={20}
        />
      </Pressable>

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
                    height: 40,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 16,
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
