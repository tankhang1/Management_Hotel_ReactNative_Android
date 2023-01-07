import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataTable} from 'react-native-paper';
import {VictoryLegend, VictoryPie, VictoryTooltip} from 'victory-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
import {setBillList} from '../../../Redux/slices/dataBills';
import Template_Bill from './Teamplate_Bill';
import {setRoomList} from '../../../Redux/slices/dataRoom';
const Dashboard = ({navigation}) => {
  const dispath = useDispatch();
  useEffect(() => {
    //const subscribe = navigation.addListener('focus', () => {
    const q = query(collection(db, 'Bill_List'), orderBy('Date', 'desc'));
    onSnapshot(q, snapshot => {
      let bill = [];
      let groupGest = {
        Local: {
          Adults: 0,
          Children: 0,
        },
        Foreign: {
          Adults: 0,
          Children: 0,
        },
      };
      snapshot.forEach(doc => {
        let tmp = {...doc.data()};
        tmp.Date = moment(tmp.Date?.toDate()).format('DD/MM/YYYY');
        tmp.Date_Check_Out = moment(tmp.Date_Check_Out?.toDate()).format(
          'DD/MM/YYYY',
        );

        tmp.Date_Check_In = moment(tmp.Date_Check_In?.toDate()).format(
          'DD/MM/YYYY',
        );

        if (
          doc.data().Date_Check_In.toDate() <= new Date() &&
          doc.data().Date_Check_Out.toDate() >= new Date() &&
          doc.data().CheckIn === 1
        ) {
          if (tmp.Foreign === 1) {
            groupGest.Foreign.Adults += tmp.Adults;
            groupGest.Foreign.Children += tmp.Children;
          } else {
            groupGest.Local.Adults += tmp.Adults;
            groupGest.Local.Children += tmp.Children;
          }
        }
        bill.push(tmp);
      });
      setGroupByGest({...groupGest});
      let currentDay = moment(new Date()).format('DD/MM/YYYY');
      let tmp = {...reservation};
      if (tmp.Day === currentDay) {
        tmp.Duein = 0;
        tmp.Dueout = 0;
        tmp.New = 0;
      } else {
        tmp.New = 0;
        (tmp.Duein = 0),
          (tmp.Dueout = 0),
          (tmp.CheckedIn = 0),
          (tmp.CheckedOut = 0),
          (tmp.Day = currentDay);
      }
      bill.map((item, index) => {
        if (item.Date_Check_In === currentDay) {
          tmp.Duein++;
        } else if (item.Date_Check_Out === currentDay) {
          tmp.Dueout++;
        }
        if (item.Date === currentDay) {
          tmp.New++;
        }
      });
      setReservation({...tmp});
      dispath(setBillList(bill));
    });

    onSnapshot(collection(db, 'DataRoom'), snapshot => {
      let rooms = [];
      let groupRoom = [];
      snapshot.forEach(doc => {
        rooms.push(doc.data());
        let position = groupRoom.map(e => e.key).indexOf(doc.data().kind);
        if (position === -1) {
          groupRoom.push({
            key: doc.data().kind,
            value: [doc.data()],
            quantity: 1,
            available: doc.data().status,
          });
        } else {
          groupRoom[position].value.push(doc.data());
          groupRoom[position].quantity++;
          if (doc.data().status === 1) {
            groupRoom[position].available++;
          }
        }
      });
      dispath(setRoomList({rooms, groupRoom}));
    });
    // });
    // return subscribe;
  }, []);
  const bills = useSelector(state => state.list_bill);
  const [search, setSearch] = useState('');
  const [bill_Id, setBill_Id] = useState('OEGRPP8RrgAQDsmdb6L9');
  const [checkOut, setCheckOut] = useState(false);

  const [reservation, setReservation] = useState({
    New: 0,
    Duein: 0,
    Dueout: 0,
    CheckedIn: 0,
    CheckedOut: 0,
    Day: moment(new Date()).format('DD/MM/YYYY'),
  });
  const [groupByGest, setGroupByGest] = useState({
    Local: {
      Adults: 0,
      Children: 0,
    },
    Foreign: {
      Adults: 0,
      Children: 0,
    },
  });

  const [showTemplate, setShowTemplate] = useState(false);
  const [searchBooking, setSearchBooking] = useState('');
  const SumPeople =
    groupByGest.Foreign.Adults +
    groupByGest.Foreign.Children +
    groupByGest.Local.Adults +
    groupByGest.Local.Children;
  const SumLocal = groupByGest.Local.Adults + groupByGest.Local.Children;
  const SumForeign = groupByGest.Foreign.Adults + groupByGest.Foreign.Children;
  const collectRoom = useSelector(state => state.list_room).groupRoom;
  const renderGuests = ({item, index}) => {
    let checkin = item.Date_Check_In;
    let checkout = item.Date_Check_Out;
    if (
      new Date(
        `${checkin.slice(6, 10)}-${checkin.slice(3, 5)}-${checkin.slice(0, 2)}`,
      ) <= new Date() &&
      new Date(
        `${checkout.slice(6, 10)}-${checkout.slice(3, 5)}-${checkout.slice(
          0,
          2,
        )}`,
      ) >= new Date() &&
      item.CheckIn === 1 &&
      item.Phone_Number.indexOf(search) > -1
    ) {
      return (
        <TouchableOpacity
          onPress={() => {
            setBill_Id(item.Bill_Id);
            setCheckOut(true);
            setShowTemplate(!showTemplate);
          }}
          key={index}
          style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 10,
          }}>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: index % 2 === 0 ? 'hsl(0,0%,90%)' : null,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}>
            <MaterialCommunityIcons
              name="tag-arrow-right"
              size={15}
              style={{color: 'hsl(0,0%,50%)'}}
            />
            <Text style={{color: 'hsl(0,0%,50%)'}}>{item.Date_Check_In}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              paddingVertical: 10,
              backgroundColor: index % 2 !== 0 ? 'hsl(0,0%,90%)' : null,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}>
            <MaterialCommunityIcons
              name="tag-arrow-left"
              size={15}
              style={{color: 'hsl(0,0%,50%)'}}
            />

            <Text style={{color: 'hsl(0,0%,50%)'}}>{item.Date_Check_Out}</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: index % 2 === 0 ? 'hsl(0,0%,90%)' : null,
              borderRadius: 5,
              paddingHorizontal: 5,
            }}>
            <Ionicons
              name="key-outline"
              size={15}
              style={{color: 'hsl(0,0%,50%)'}}
            />
            <Text numberOfLines={1} style={{color: 'hsl(0,0%,50%)'}}>
              {item.List_Room_Id[0]}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  if (bills.length !== 0) {
    return (
      <KeyboardAwareScrollView nestedScrollEnabled={true}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: 10,
          }}>
          {/*Header */}
          <Template_Bill
            visible={showTemplate}
            setVisible={setShowTemplate}
            Bill_Id={bill_Id}
            CheckOut={checkOut}
            reservation={reservation}
            setReservation={setReservation}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}>
            <Pressable
              onPress={() => navigation.openDrawer()}
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                backgroundColor: 'hsl(0,0%,95%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="menu" size={20} color="black" />
            </Pressable>
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
                fontSize: 20,
              }}>
              CHKM Hotel Management
            </Text>
            <Pressable
              onPress={() => {}}
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                backgroundColor: 'hsl(0,0%,95%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="bell-ring-outline"
                size={20}
                color="black"
              />
              <View
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}>
                <Text
                  style={{
                    fontSize: 10,
                    color: 'white',
                  }}>
                  {reservation.New}
                </Text>
              </View>
            </Pressable>
          </View>
          {/*Reservations*/}
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: 'hsl(0,0%,85%)',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="dots-grid"
                  size={20}
                  color="hsl(0,0%,73%)"
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: '600',
                    marginLeft: 10,
                  }}>
                  Reservations
                </Text>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'hsl(0,0%,73%)',
                  borderRadius: 5,
                }}>
                <Ionicons
                  name="ios-settings-outline"
                  size={20}
                  color="hsl(0,0%,73%)"
                />
              </View>
            </View>
          </View>
          {/*Victory Pie */}
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <VictoryPie
              width={250}
              height={250}
              colorScale={[
                '#fdbe57',
                '#3be5c6',
                '#df8026',
                '#6a9111',
                '#3ee363',
              ]}
              data={[
                {x: 'New', y: reservation.New},
                {x: 'Due in', y: reservation.Duein},
                {x: 'Due out', y: reservation.Dueout},
                {x: 'Checked in', y: reservation.CheckedIn},
                {x: 'Check out', y: reservation.CheckedOut},
              ]}
              innerRadius={40}
              labelRadius={({innerRadius}) => innerRadius + 10}
              labels={({datum}) => {
                if (datum.y !== 0) return datum.y;
              }}
              style={{
                labels: {fill: 'white', fontSize: 16, fontWeight: 'bold'},
              }}
              labelPosition="centroid"
            />

            <VictoryLegend
              orientation="vertical"
              gutter={20}
              y={60}
              colorScale={[
                '#fdbe57',
                '#3be5c6',
                '#df8026',
                '#6a9111',
                '#3ee363',
              ]}
              data={[
                {name: 'New'},
                {name: 'Due in'},
                {name: 'Due out'},
                {name: 'Checked in'},
                {name: 'Checked out'},
              ]}
            />
          </View>
          {/*Check-in guest*/}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderColor: 'hsl(0,0%,85%)',
              paddingVertical: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name="dots-grid"
                size={20}
                color="hsl(0,0%,73%)"
              />
              <Text
                style={{
                  fontSize: 20,
                  color: 'black',
                  fontWeight: '600',
                  marginLeft: 10,
                }}>
                Check-in Guests
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                justifyContent: 'space-between',
                borderWidth: 1,
                borderColor: 'hsl(0,0%,73%)',
                borderRadius: 5,
                width: '45%',
              }}>
              <Ionicons name="search-outline" size={12} color="hsl(0,0%,73%)" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                style={{
                  fontSize: 12,
                  width: '90%',
                }}
                numberOfLines={1}
                multiline={false}
                placeholder="Search by phone"
              />
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'hsl(145,67%,90%)',
                  marginRight: 5,
                }}>
                <MaterialCommunityIcons
                  name="calendar-arrow-right"
                  size={20}
                  color="hsl(145,67%,47%)"
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Arrivals
              </Text>
            </View>
            <View
              style={{
                flex: 1,

                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 5,
                  backgroundColor: 'hsl(0,99%,95%)',
                }}>
                <MaterialCommunityIcons
                  name="calendar-arrow-left"
                  size={20}
                  color="hsl(0,99%,49%)"
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Departures
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: 25,
                  height: 25,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'hsl(224,75%,95%)',
                  marginRight: 5,
                }}>
                <FontAwesome5 name="hotel" size={15} color="hsl(224,75%,53%)" />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '600',
                }}>
                Arrivals
              </Text>
            </View>
          </View>
          {/* <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}>
            {bills.map((item, index) => {
              if (
                new Date(moment(item.Date_Check_In, 'YYYY-MM-DD')) <=
                  new Date() &&
                new Date(moment(item.Date_Check_Out, 'YYYY-MM-DD')) >=
                  new Date() &&
                item.CheckIn === 1 &&
                item.Phone_Number.indexOf(search) > -1
              ) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setBill_Id(item.Bill_Id);
                      setCheckOut(true);
                      setShowTemplate(!showTemplate);
                    }}
                    key={index}
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor:
                          index % 2 === 0 ? 'hsl(0,0%,90%)' : null,
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}>
                      <MaterialCommunityIcons
                        name="tag-arrow-right"
                        size={15}
                        style={{color: 'hsl(0,0%,50%)'}}
                      />
                      <Text style={{color: 'hsl(0,0%,50%)'}}>
                        {item.Date_Check_In}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingVertical: 10,
                        backgroundColor:
                          index % 2 !== 0 ? 'hsl(0,0%,90%)' : null,
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}>
                      <MaterialCommunityIcons
                        name="tag-arrow-left"
                        size={15}
                        style={{color: 'hsl(0,0%,50%)'}}
                      />

                      <Text style={{color: 'hsl(0,0%,50%)'}}>
                        {item.Date_Check_Out}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor:
                          index % 2 === 0 ? 'hsl(0,0%,90%)' : null,
                        borderRadius: 5,
                        paddingHorizontal: 5,
                      }}>
                      <Ionicons
                        name="key-outline"
                        size={15}
                        style={{color: 'hsl(0,0%,50%)'}}
                      />
                      <Text numberOfLines={1} style={{color: 'hsl(0,0%,50%)'}}>
                        {item.List_Room_Id[0]}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }
            })}
          </ScrollView> */}
          <View
            style={{
              marginVertical: 10,
            }}>
            <FlatList
              data={bills}
              renderItem={renderGuests}
              keyExtractor={item => item.Bill_Id}
              initialNumToRender={4}
              removeClippedSubviews={true}
              nestedScrollEnabled={true}
            />
          </View>

          {/*Number of Guest */}
          <View
            style={{
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: 'hsl(0,0%,85%)',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="dots-grid"
                  size={20}
                  color="hsl(0,0%,73%)"
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: '600',
                    marginLeft: 10,
                  }}>
                  Guest
                </Text>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'hsl(0,0%,73%)',
                  borderRadius: 5,
                }}>
                <Ionicons
                  name="ios-settings-outline"
                  size={20}
                  color="hsl(0,0%,73%)"
                />
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
              }}>
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'hsl(0,0%,73%)',
                    fontWeight: '600',
                  }}>
                  Guests
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {SumPeople}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'hsl(0,0%,73%)',
                    fontWeight: '600',
                  }}>
                  Adults
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {groupByGest.Foreign.Adults + groupByGest.Local.Adults}
                </Text>
              </View>
              <View
                style={{
                  marginHorizontal: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'hsl(0,0%,73%)',
                    fontWeight: '600',
                  }}>
                  Children
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  {groupByGest.Foreign.Children + groupByGest.Local.Children}
                </Text>
              </View>
            </View>
            {/*Progresss */}
            {/*Local people */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: '600',
                  marginHorizontal: 10,
                }}>
                Local people
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginHorizontal: 10,
                  }}>
                  {groupByGest.Local.Adults} Adults
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginHorizontal: 10,
                  }}>
                  {groupByGest.Local.Children} Children
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: '90%',
                  height: 10,
                  borderRadius: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'hsl(0,0%,80%)',
                }}>
                <View
                  style={{
                    width: `${(SumLocal / SumPeople).toFixed(2) * 100}%`,
                    height: 10,
                    backgroundColor: 'red',
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  color: 'hsl(0,0%,50%)',
                }}>
                {(SumLocal / SumPeople).toFixed(2) * 100}%
              </Text>
            </View>
            {/*Foreign people */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: '600',
                  marginHorizontal: 10,
                }}>
                Foreign people
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginHorizontal: 10,
                  }}>
                  {groupByGest.Foreign.Adults} Adults
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginHorizontal: 10,
                  }}>
                  {groupByGest.Foreign.Children} Children
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  width: '90%',
                  height: 10,
                  borderRadius: 100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'hsl(0,0%,80%)',
                }}>
                <View
                  style={{
                    width: `${(SumForeign / SumPeople).toFixed(2) * 100}%`,
                    height: 10,
                    backgroundColor: 'hsl(32,92%,72%)',
                    borderRadius: 100,
                  }}
                />
              </View>
              <Text
                style={{
                  color: 'hsl(0,0%,50%)',
                }}>
                {(SumForeign / SumPeople).toFixed(2) * 100}%
              </Text>
            </View>
          </View>
          {/*Rooms Status */}
          <View
            style={{
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: 'hsl(0,0%,85%)',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="dots-grid"
                  size={20}
                  color="hsl(0,0%,73%)"
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: '600',
                    marginLeft: 10,
                  }}>
                  Rooms
                </Text>
              </View>
              <View
                style={{
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'hsl(0,0%,73%)',
                  borderRadius: 5,
                }}>
                <Ionicons
                  name="ios-settings-outline"
                  size={20}
                  color="hsl(0,0%,73%)"
                />
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
              }}>
              Type
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
              }}>
              Availbale
            </Text>

            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
              }}>
              Unavailable
            </Text>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
              }}>
              Status
            </Text>
          </View>

          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}>
            {collectRoom?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flex: 1,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 10,
                    backgroundColor:
                      index % 2 === 0 ? 'hsl(0,0%,90%)' : 'white',
                    paddingVertical: 10,
                    borderRadius: 5,
                  }}>
                  <Text style={{color: 'black', flex: 1}}>{item.key}</Text>

                  <Text style={{color: 'black', flex: 1}}>
                    {item.available}
                  </Text>

                  <Text style={{color: 'black', flex: 1}}>
                    {item.quantity - item.available}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 100,
                        backgroundColor:
                          item.quantity - item.available < item.available
                            ? 'hsl(162,95%,63%)'
                            : 'red',
                        marginRight: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {item.quantity - item.available < item.available
                        ? 'Available'
                        : 'Unavailable'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          {/*Recent Booking */}
          <View
            style={{
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderColor: 'hsl(0,0%,85%)',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="dots-grid"
                  size={20}
                  color="hsl(0,0%,73%)"
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: '600',
                    marginLeft: 10,
                  }}>
                  Recent Booking
                </Text>
              </View>

              <TextInput
                value={searchBooking}
                onChangeText={setSearchBooking}
                style={{
                  fontSize: 12,
                  width: '50%',
                  paddingHorizontal: 10,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: 'hsl(0,0%,73%)',
                }}
                numberOfLines={1}
                multiline={false}
                placeholder="Search by phone"
              />
            </View>
          </View>

          <DataTable
            style={{
              marginBottom: 10,
            }}>
            <DataTable.Header>
              <DataTable.Title
                style={{
                  flex: 2,
                }}>
                Bill ID
              </DataTable.Title>
              <DataTable.Title
                style={{
                  flex: 2,
                }}>
                Date
              </DataTable.Title>
              <DataTable.Title
                style={{
                  flex: 2,
                }}>
                Price
              </DataTable.Title>
              <DataTable.Title
                style={{
                  flex: 1,
                }}>
                Status
              </DataTable.Title>
            </DataTable.Header>
            <ScrollView>
              {bills.map((item, index) => {
                if (
                  item.Phone_Number.indexOf(searchBooking) > -1 &&
                  index < (searchBooking === '' ? 4 : bills.length)
                )
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setBill_Id(item.Bill_Id);
                        setCheckOut(false);
                        setShowTemplate(!showTemplate);
                      }}>
                      <DataTable.Row>
                        <DataTable.Cell
                          style={{
                            flex: 2,
                          }}>
                          {item.Bill_Id}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            flex: 2,
                          }}>
                          {item.Date}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            flex: 2,
                          }}>
                          {item.Total_Money}
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            flex: 1,
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              color: item.Status === 1 ? 'green' : 'red',
                            }}>
                            {item.Status === 1 ? 'completed' : 'uncompleted'}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    </TouchableOpacity>
                  );
              })}
            </ScrollView>
          </DataTable>
        </View>
      </KeyboardAwareScrollView>
    );
  }
  return <Text>Loading...</Text>;
};

export default Dashboard;
