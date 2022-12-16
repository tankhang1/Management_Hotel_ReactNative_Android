import {
  View,
  Text,
  TextInput,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import ListComponent from './ListComponent';
import {useSelector} from 'react-redux';

const EmployeesList = () => {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [searchName, setSearchName] = useState(true);
  const [searchPosition, setSearchPosition] = useState(false);
  const [searchId, setSearchId] = useState(false);
  let animatedScroll = Animated.divide(scrollX, 300);
  const [total, setTotal] = useState(0);

  let number = 0;
  useEffect(() => {
    setTotal(number);
  });
  const dataEmployee = useSelector(state => state.data_infor).data.employees;

  const renderItem = ({item, index}) => {
    const animatedRotate = new Animated.Value(0);
    let back = false;
    let rotateFont = animatedRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    let rotateBack = animatedRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    });
    const handlingFlashlist = () => {
      back = !back;
      Animated.timing(animatedRotate, {
        toValue: back ? 1 : 0,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };
    let scaleX = animatedScroll.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });
    if (
      (item.Employee_Name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
        searchName === true) ||
      (item.Position.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
        searchPosition === true) ||
      (item.Employee_Id.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
        searchId === true)
    ) {
      number++;
      return (
        <Animated.View
          style={{
            transform: [{scale: scaleX}],
            paddingLeft: index === 0 ? 10 : 0,
          }}
          key={index}>
          <Pressable onPress={handlingFlashlist}>
            <Animated.View
              style={{
                backfaceVisibility: 'hidden',
                transform: [{rotateY: rotateFont}],
              }}>
              <ListComponent title="font" item={item} />
            </Animated.View>
          </Pressable>

          {/*back */}
          <Pressable
            onPress={handlingFlashlist}
            style={{
              position: 'absolute',
              top: 0,
            }}>
            <Animated.View
              style={{
                backfaceVisibility: 'hidden',
                transform: [{rotateY: rotateBack}],
              }}>
              <ListComponent title="back" item={item} />
            </Animated.View>
          </Pressable>
        </Animated.View>
      );
    }
  };

  const renderDot = ({item, index}) => {
    let opacity = animatedScroll.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.2, 1, 0.2],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        key={index}
        style={{
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: 'black',
          marginHorizontal: 5,
          marginTop: 20,
          opacity,
        }}></Animated.View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 15,
      }}>
      {/*Modal*/}
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        transparent
        statusBarTranslucent
        animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}></View>
      </Modal>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        transparent
        statusBarTranslucent
        animationType="slide">
        <Pressable
          onPress={() => setVisible(!visible)}
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            elevation: 4,
          }}>
          <View
            style={{
              width: 30,
              height: 5,
              borderRadius: 30,
              marginVertical: 5,
              backgroundColor: 'hsl(0,0%,73%)',
              alignSelf: 'center',
            }}
          />

          <TouchableHighlight
            onPress={() => setSearchName(!searchName)}
            underlayColor="hsl(145,67%,80%)"
            style={{
              width: '100%',
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Search after name
              </Text>
              {searchName ? (
                <Entypo name="check" size={24} color="red" />
              ) : null}
            </View>
          </TouchableHighlight>
          <View
            style={{
              alignSelf: 'center',
              width: '80%',
              height: 1,
              backgroundColor: 'hsl(0,0%,73%)',
            }}
          />
          <TouchableHighlight
            onPress={() => setSearchPosition(!searchPosition)}
            underlayColor="hsl(145,67%,80%)"
            style={{
              width: '100%',
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Search after position
              </Text>
              {searchPosition ? (
                <Entypo name="check" size={24} color="red" />
              ) : null}
            </View>
          </TouchableHighlight>
          <View
            style={{
              alignSelf: 'center',
              width: '80%',
              height: 1,
              backgroundColor: 'hsl(0,0%,73%)',
            }}
          />
          <TouchableHighlight
            onPress={() => setSearchId(!searchId)}
            underlayColor="hsl(145,67%,80%)"
            style={{
              width: '100%',
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Search after id
              </Text>
              {searchId ? <Entypo name="check" size={24} color="red" /> : null}
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
      {/*Header */}
      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'hsl(0,0%,93%)',
            width: '95%',
            borderRadius: 10,
            paddingHorizontal: 10,
          }}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search Employees"
            style={{
              width: '92%',
              color: 'black',
            }}
            placeholderTextColor="hsl(0,0%,60%)"
          />
          <Pressable onPress={() => setSearch('')}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,

                backgroundColor: 'hsl(0,0%,80%)',
                borderRadius: 30,
              }}>
              <Feather name="x" size={15} />
            </View>
          </Pressable>
        </View>
        <Pressable onPress={() => setVisible(!visible)}>
          <Entypo name="dots-three-vertical" size={24} color={'black'} />
        </Pressable>
      </View>

      {/*Quantity Employee */}
      <Text
        style={{
          fontSize: 16,
          paddingLeft: 10,
          paddingTop: 10,
          color: 'hsl(0,0%,60%)',
        }}>
        Total {total} employees
      </Text>

      {/*Carousel Employees*/}
      <View
        style={{
          height: 430,
        }}>
        <FlatList
          horizontal
          snapToAlignment={'center'}
          showsHorizontalScrollIndicator={false}
          snapToInterval={305}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          data={dataEmployee}
          renderItem={renderItem}
        />
      </View>

      <View
        style={{
          alignSelf: 'center',
        }}>
        <FlatList
          data={[...new Array(total)]}
          renderItem={renderDot}
          horizontal
        />
      </View>
    </View>
  );
};

export default EmployeesList;
