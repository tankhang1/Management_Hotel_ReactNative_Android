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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Slider} from '@miblanchard/react-native-slider';
import {useState} from 'react';
import {Checkbox} from 'react-native-paper';
import moment from 'moment';
import {setLike} from '../../../Redux/ListLikeRoom';
import {useEffect} from 'react';
import {collection, onSnapshot} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
import {useCallback} from 'react';
import {
  addCheck,
  deleteCheck,
  resetCheck,
} from '../../../Redux/FacilitiesCheck';
const Booking = ({navigation}) => {
  const Rooms = useSelector(state => state.list_room).rooms;
  const [Data, setData] = useState(Rooms);

  //Facilities
  useEffect(() => {
    async function getDb() {
      onSnapshot(collection(db, 'KindRoom'), snapshot => {
        let kinds = [];
        snapshot.forEach(doc => {
          kinds.push(doc.data().Name);
        });
        setKindRoom([...kinds]);
      });

      onSnapshot(collection(db, 'Facility'), snapshot => {
        let facilities = [];
        snapshot.forEach(doc => {
          facilities.push(doc.data().Name);
        });
        setFacilities([...facilities]);
      });
    }
    getDb();
  }, []);
  const [KindRoom, setKindRoom] = useState([]);
  const [Facilities, setFacilities] = useState([]);
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
    navigation.navigate('Bill');
  };

  const dispatch = useDispatch();
  const dataBooking = useSelector(state => state.booking);
  let name = dataBooking.name;
  let phone = dataBooking.phone;
  let Checkin = moment(dataBooking.date_check_in).format('DD/MM/YYYY');
  let Checkout = moment(dataBooking.date_check_out).format('DD/MM/YYYY');
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
    dispatch(setId(item.id));
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
    if (
      item.status === 1 &&
      new Date(dataBooking.date_check_in) > item.dateFrom.toDate()
    )
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
                right: 0,
                width: 100,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderTopLeftRadius: 20,
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

  //Range

  const [value, setValue] = useState(3000);
  //Rating
  const Rating = [1, 2, 3, 4, 5];

  let CheckFacilities = [];

  const [sortResult, setSortResult] = useState(null);
  const [starPerNight, setStarPerNight] = useState(1);

  const ApplyFilter = () => {
    setShowFilter(!showFilter);

    let tmp = [];
    if (sortResult !== null) {
      Rooms.map(item => {
        if (
          item.status === 1 &&
          item.kind === KindRoom[sortResult] &&
          item.money <= value &&
          item.rating >= starPerNight
        ) {
          let c = 0;

          for (let index = 0; index < checked.length; index++) {
            const element = checked[index];
            if (!item.facility.includes(element)) {
              c = 1;
              break;
            }
          }
          if (c === 0) {
            tmp.push(item);
          }
        }
      });
      setData([...tmp]);
    } else {
      let tmp = [];
      Rooms.map((item, i) => {
        if (item.status === 1) {
          tmp.push(item);
        }
      });
      setData([...tmp]);
    }
  };

  const checked = useSelector(state => state.facility_check);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      {Facilities.length > 0 ? (
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
                {KindRoom.length > 0 &&
                  KindRoom.map((item, index) => {
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
                              sortResult === index
                                ? 'white'
                                : 'hsl(145,67%,47%)',
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
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        if (checked.includes(item)) {
                          dispatch(deleteCheck(item));
                        } else {
                          dispatch(addCheck(item));
                        }
                      }}
                      style={{
                        marginHorizontal: 8,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Checkbox
                          status={
                            checked.includes(item) ? 'checked' : 'unchecked'
                          }
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
                  setSortResult(null),
                    setStarPerNight(1),
                    setValue(3000),
                    dispatch(resetCheck());
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
      ) : null}
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
        <Pressable
          onPress={() => {
            dispatch(setLike()), navigation.navigate('Room');
          }}>
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
          removeClippedSubviews={true}
          initialNumToRender={7}
          showsVerticalScrollIndicator={false}
          extraData={Data}
          ListEmptyComponent={() => (
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <MaterialCommunityIcons
                name="database-off-outline"
                size={50}
                color="hsl(0,0%,73%)"
              />
              <Text
                style={{
                  fontSize: 20,
                  color: 'hsl(0,0%,73%)',
                }}>
                Don't have information
              </Text>
            </View>
          )}
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
