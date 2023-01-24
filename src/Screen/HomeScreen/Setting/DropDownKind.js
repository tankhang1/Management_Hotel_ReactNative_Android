import {View, Text, TextInput, Pressable, ScrollView} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

const DropDownKind = ({
  width,
  open,
  setOpen,
  dataKind,
  value,
  setValue,
  setOpenModalAdd,
  openModalAdd,
  setKind,
}) => {
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
      <Pressable onPress={() => setOpen(!open)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '85%',
            height: 50,
          }}>
          <Text
            style={{
              width: '100%',
              color: 'black',
              fontSize: 16,
              paddingHorizontal: 10,
            }}>
            {value}
          </Text>

          <Entypo
            name={open === true ? 'chevron-up' : 'chevron-down'}
            color={'black'}
            size={20}
          />
        </View>
      </Pressable>
      <ScrollView>
        {open && (
          <View>
            <Pressable
              onPress={() => {
                setKind(0);
                setOpenModalAdd(!openModalAdd);
                setOpen(!open);
              }}
              style={{
                backgroundColor: 'hsl(208,65%,27%)',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                }}>
                Add New Kind
              </Text>
            </Pressable>
            {dataKind.map((item, index) => {
              return (
                <Pressable
                  onPress={() => {
                    setValue(item), setOpen(!open);
                  }}
                  key={index}
                  style={{
                    paddingVertical: 5,
                    paddingLeft: 5,
                    width: '100%',
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
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DropDownKind;
