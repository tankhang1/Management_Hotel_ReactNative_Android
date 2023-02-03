import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useReducer} from 'react';
import {useState} from 'react';
import Custom_Skill from './Custom_Skill';
import Feather from 'react-native-vector-icons/Feather';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteSkill} from '../../../Redux/English_Level';
const DropDownSkill = () => {
  const Data_Skill = ['Reading', 'Writting', 'Listening', 'Speaking'];
  const english_level = useSelector(state => state.english_level);
  const dispatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState(false);
  const convertColor = level => {
    switch (level) {
      case 1:
        return 'hsl(360,99%,49%)';
      case 2:
        return 'hsl(46,99%,50%)';
      case 3:
        return 'hsl(90,57%,62%)';
      case 4:
        return 'hsl(120,100%,29%)';
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(deleteSkill(item.x));
          }}
          style={{
            position: 'absolute',
            zIndex: 999,
            top: 5,
            left: -5,
          }}>
          <Feather name="x" size={20} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'black',
            paddingHorizontal: 10,
            paddingVertical: 5,
            fontSize: 18,
            color: 'white',
            backgroundColor: convertColor(item.y),
            borderRadius: 10,
          }}>
          {item.x}
        </Text>
      </View>
    );
  };
  return (
    <TouchableOpacity
      onPress={() => setOpenDropDown(!openDropDown)}
      disabled={openDropDown}
      style={{
        width: '100%',
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'hsl(222,56%,96%)',
      }}>
      <View
        style={{
          width: '100%',
          height: 55,

          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '90%',
          }}>
          <FlatList
            data={english_level}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity onPress={() => setOpenDropDown(!openDropDown)}>
          <AntDesign name="caretdown" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {openDropDown
        ? Data_Skill.map((item, index) => {
            return (
              <Custom_Skill
                key={index}
                width={'100%'}
                height={55}
                skill={item}
                setOpenDropDown={setOpenDropDown}
                openDropDown={openDropDown}
              />
            );
          })
        : null}
    </TouchableOpacity>
  );
};

export default DropDownSkill;
