import {
  View,
  Text,
  Image,
  ScrollView,
  Animated,
  PanResponder,
  FlatList,
  Pressable,
  Dimensions,
  Modal,
} from 'react-native';
import React, {useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setId} from '../../../Redux/ManageId';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Slider} from '@miblanchard/react-native-slider';
import {useState} from 'react';
import {Checkbox} from 'react-native-paper';
const Booking = ({navigation}) => {
  const Rooms = useSelector(state => state.data_infor).data.rooms;
  const [Data, setData] = useState(Rooms);
  //panresponder
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    }),
  ).current;

  const onBook = () => {
    let tmp = [];
    listlikeroom1.map((item, index) => {
      Data.map((Item, Index) => {
        if (Item.id === item && tmp.indexOf(Item) === -1) tmp.push(Item);
      });
    });
    navigation.navigate('Bill', {bill: tmp});
  };

  const dispatch = useDispatch();
  const dataBooking = useSelector(state => state.booking);
  let name = dataBooking.name;
  let phone = dataBooking.phone;
  let Checkin = dataBooking.date_check_in;
  let Checkout = dataBooking.date_check_out;
  let passport = dataBooking.passport;

  const DataChip = [
    {
      id: 1,
      title: name,
      icon: 'https://img.icons8.com/color/48/null/employee-card.png',
    },
    {
      id: 2,
      title: phone,
      icon: 'https://img.icons8.com/emoji/96/null/mobile-phone.png',
    },
    {
      id: 3,
      title: passport,
      icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-passport-vacation-planning-skiing-and-snowboarding-flaticons-lineal-color-flat-icons.png',
    },
    {
      id: 4,
      title: Checkin,
      icon: 'https://img.icons8.com/officel/80/000000/hotel-check-in.png',
    },
    {
      id: 5,
      title: Checkout,
      icon: 'https://img.icons8.com/officel/80/000000/hotel-chekc-out.png',
    },
  ];

  const listlikeroom1 = useSelector(state => state.listlikeroom);
  const {width, height} = Dimensions.get('screen');
  const onDetail = item => {
    dispatch(
      setId({
        id: item.id,
      }),
    );
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'RoomDetail',
          params: {
            bookMark: listlikeroom1.indexOf(item.id) > -1 ? true : false,
          },
        },
      ],
    });
  };
  const renderItem = ({item}) => {
    return (
      <View
        key={item.id}
        style={{
          width: '100%',
          height: 250,
          marginBottom: 20,
          justifyContent: 'flex-start',
        }}>
        <Image
          source={{uri: item.image}}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
            borderRadius: 30,
          }}
        />
        <Pressable
          onPress={() => {
            onDetail(item);
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: 100,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomLeftRadius: 30,
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'hsl(205,100%,38%)',
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: 'white',
              }}>
              View Detail
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  const [showFilter, setShowFilter] = useState(false);

  const SortResult = [
    'Single Room',
    'Twin Room',
    'Double Room',
    'Deluxe',
    'President',
  ];

  //Range

  const [value, setValue] = useState(0);
  //Rating
  const Rating = [1, 2, 3, 4, 5];

  //Facilities
  const Facilities = ['Wifi', 'Swimming Pool', 'Parking', 'Restaurant'];
  let CheckFacilities = [];

  const [sortResult, setSortResult] = useState(null);
  const [starPerNight, setStarPerNight] = useState(null);

  const ApplyFilter = () => {
    setShowFilter(!showFilter);

    let tmp = [];
    console.log(sortResult);
    if (sortResult !== null || starPerNight !== null || value !== 0) {
      Rooms.map(item => {
        if (sortResult !== null) {
          if (item.kind === SortResult[sortResult]) {
            if (value > 0) {
              if (item.money < value) {
                if (starPerNight !== null) {
                  if (item.rating > starPerNight) tmp.push(item);
                } else tmp.push(item);
              }
            } else tmp.push(item);
          }
        } else {
          if (value > 0) {
            if (item.money < value) {
              if (starPerNight !== null) {
                if (item.rating > starPerNight) tmp.push(item);
              } else tmp.push(item);
            }
          }
        }
      });
      setData([...tmp]);
    } else {
      setData([...Rooms]);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <Modal
        visible={showFilter}
        onRequestClose={() => setShowFilter(!showFilter)}
        animationType="fade"
        statusBarTranslucent
        transparent>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(187,187,187,0.8)',
          }}
          onPress={() => setShowFilter(!showFilter)}
        />
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            paddingBottom: 30,
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <View
            style={{
              alignSelf: 'center',
              width: 80,
              height: 5,
              backgroundColor: 'black',
              marginTop: 10,
              borderRadius: 30,
            }}
          />

          {/*Sort Result */}
          <View
            style={{
              paddingLeft: 15,
              paddingTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '600',
              }}>
              Sort Result
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginVertical: 5,
              }}>
              {/*Highest Popularity */}
              {SortResult.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => setSortResult(index)}
                    key={index}
                    style={{
                      borderWidth: 2,
                      paddingVertical: 10,
                      paddingHorizontal: 20,
                      borderColor: 'hsl(145,67%,47%)',
                      borderRadius: 30,
                      marginHorizontal: 10,
                      backgroundColor:
                        sortResult === index ? 'hsl(145,67%,47%)' : 'white',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          sortResult === index ? 'white' : 'hsl(145,67%,47%)',
                      }}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          {/*Price Range Per Night */}
          <View
            style={{
              paddingHorizontal: 15,
              paddingTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '600',
                paddingBottom: 35,
              }}>
              Price Range Per Night
            </Text>
            <Slider
              value={value}
              onValueChange={setValue}
              thumbStyle={{
                height: 25,
                width: 25,
                borderRadius: 30,
                backgroundColor: 'white',
                elevation: 5,
                borderWidth: 4,
                borderColor: 'hsl(145,67%,40%)',
              }}
              renderAboveThumbComponent={() => {
                return (
                  <View
                    style={{
                      width: 45,
                      height: 30,
                      borderRadius: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'hsl(145,67%,50%)',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '600',
                      }}>
                      ${value}
                    </Text>
                  </View>
                );
              }}
              trackStyle={{
                height: 10,
                borderRadius: 10,
              }}
              minimumTrackTintColor="hsl(145,67%,47%)"
              maximumTrackTintColor="hsl(0,0%,80%)"
              animateTransitions={true}
              maximumValue={3000}
              minimumValue={0}
              step={1}
            />
          </View>
          {/*Star Rating */}
          <View
            style={{
              paddingLeft: 15,
              paddingTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '600',
                paddingBottom: 10,
              }}>
              Star Rating
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Rating.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => setStarPerNight(item)}
                    key={index}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 30,
                      borderWidth: 2,
                      borderColor: 'hsl(145,67%,47%)',
                      borderRadius: 30,
                      marginHorizontal: 10,
                      backgroundColor:
                        starPerNight === item ? 'hsl(145,67%,47%)' : 'white',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <AntDesign
                        name="star"
                        size={20}
                        color={
                          starPerNight === item ? 'white' : 'hsl(145,67%,47%)'
                        }
                      />
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          paddingLeft: 10,
                          color:
                            starPerNight === item
                              ? 'white'
                              : 'hsl(145,67%,47%)',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          {/*Facility */}
          <View
            style={{
              paddingLeft: 15,
              paddingTop: 20,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '600',
                paddingBottom: 10,
              }}>
              Facilities
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Facilities.map((item, index) => {
                const [checked, setChecked] = useState(false);
                if (checked === true) {
                  CheckFacilities.push(item);
                } else {
                  if (CheckFacilities.indexOf(item) > -1)
                    CheckFacilities.splice(CheckFacilities.indexOf(item), 1);
                }
                return (
                  <Pressable
                    key={index}
                    onPress={() => setChecked(!checked)}
                    style={{
                      marginHorizontal: 8,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        uncheckedColor={'black'}
                        color="hsl(145,67%,47%)"
                      />
                      <Text
                        style={{
                          color: 'black',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <Pressable
              onPress={() => {
                setSortResult(null), setStarPerNight(null), setValue(0);
              }}
              style={{
                width: '40%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: 'hsl(145,67%,60%)',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 20,
                }}>
                Reset
              </Text>
            </Pressable>
            <Pressable
              onPress={ApplyFilter}
              style={{
                width: '40%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                alignSelf: 'center',
                marginTop: 20,
                backgroundColor: 'hsl(145,67%,60%)',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 20,
                }}>
                Apply Filter
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 35,
            color: 'black',
            fontWeight: '800',
            letterSpacing: 1,
          }}>
          DISCOVER{'\n'}YOUR PLACE{'\n'}TO STAY
        </Text>
        <Pressable onPress={() => navigation.navigate('Room')}>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: 'hsl(0,0%,90%)',
            }}>
            <AntDesign name="caretleft" size={24} color="black" />
          </View>
        </Pressable>
      </View>
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}>
          {DataChip.map((item, index) => {
            if (item.title !== '')
              return (
                <View
                  key={index}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      backgroundColor: 'hsl(210,25%,90%)',
                      flexDirection: 'row',
                      alignItems: 'center',
                      width: 75,
                      height: 75,
                      justifyContent: 'center',
                      borderTopRightRadius: index % 2 === 0 ? 30 : 0,
                      borderBottomLeftRadius: index % 2 === 0 ? 30 : 0,
                      borderBottomRightRadius: index % 2 !== 0 ? 30 : 0,
                      borderTopLeftRadius: index % 2 !== 0 ? 30 : 0,
                      paddingHorizontal: 20,
                      marginHorizontal: 10,
                    }}>
                    <Image
                      source={{uri: item.icon}}
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 14,
                      paddingHorizontal: 5,
                      fontWeight: '600',
                      maxWidth: 95,
                      color: 'hsl(0,0%,60%)',
                    }}
                    numberOfLines={1}>
                    {item.title}
                  </Text>
                </View>
              );
          })}
        </ScrollView>
      </View>
      <Pressable
        onPress={() => setShowFilter(!showFilter)}
        style={{
          alignSelf: 'flex-end',
        }}>
        <Text
          style={{
            color: 'hsl(220,98%,57%)',
          }}>
          Filter Detail
        </Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          height: height,
        }}>
        <FlatList
          data={Data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{
            marginTop: 30,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Animated.View
        style={{
          transform: [{translateX: pan.x}, {translateY: pan.y}],
          position: 'absolute',
          zIndex: 999,
          top: 500,
        }}
        {...panResponder.panHandlers}>
        <Pressable onPress={onBook}>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',

              backgroundColor: 'hsl(220,61%,30%)',
              borderRadius: 100,
            }}>
            <Entypo name="shopping-cart" size={24} color="white" />
            <View
              style={{
                position: 'absolute',
                width: 15,
                height: 15,
                borderRadius: 100,
                backgroundColor: 'red',
                top: 2,
                right: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: '700',
                }}>
                {listlikeroom1.length}
              </Text>
            </View>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Booking;
