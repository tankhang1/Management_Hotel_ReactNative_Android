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
  setOpenModalAdd,
  openModalAdd,
  setKind,
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
        {open && (
          <View>
            <Pressable
              onPress={() => {
                setKind(1);
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
                Add New Facility
              </Text>
            </Pressable>
            {dataKind?.map((item, index) => {
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
                    {item.Name}
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

export default DropDownFacility;
