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
import {Timestamp} from 'firebase/firestore';
import {VictoryLegend, VictoryPie, VictoryTooltip} from 'victory-native';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
import {setBillList} from '../../../Redux/slices/dataBills';
import Template_Bill from './Teamplate_Bill';
const Dashboard = ({navigation}) => {
  const dispath = useDispatch();
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      const q = query(collection(db, 'Bill_List'), orderBy('Date', 'desc'));
      onSnapshot(q, snapshot => {
        let bill = [];
        snapshot.forEach(doc => {
          let tmp = {...doc.data()};
          tmp.Date = moment(tmp.Date?.toDate()).format('DD/MM/YYYY');
          tmp.Date_Check_Out = moment(tmp.Date_Check_Out?.toDate()).format(
            'DD/MM/YYYY',
          );

          tmp.Date_Check_In = moment(tmp.Date_Check_In?.toDate()).format(
            'DD/MM/YYYY',
          );
          // console.log(tmp);

          const data = {
            Bill_Id: doc.data().Bill_Id,
            CheckIn: doc.data().CheckIn,
            Customer_Id: doc.data().Customer_Id,
            Date: moment(doc.data().Date.toDate()).format('DD/MM/YYYY'),
            Date_Check_In: moment(doc.data().Date_Check_In.toDate()).format(
              'DD/MM/YYYY',
            ),
            Date_Check_Out: moment(doc.data().Date_Check_Out.toDate()).format(
              'DD/MM/YYYY',
            ),
            Employee_Id: doc.data().Employee_Id,
            List_Room_Id: doc.data().List_Room_Id,
            Phone_Number: doc.data().Phone_Number,
            Status: doc.data().Status,
            Total_Money: doc.data().Total_Money,
          };
          bill.push(tmp);
        });
        dispath(setBillList(bill));
      });
    });
    return subscribe;
  }, [navigation]);
  const bills = useSelector(state => state.list_bill);
  const [search, setSearch] = useState('');
  const [bill_Id, setBill_Id] = useState('OEGRPP8RrgAQDsmdb6L9');
  const [checkOut, setCheckOut] = useState(false);
  const DataRoomsStatus = [
    {
      Type: 'Single',
      Available: 22,
      Unavailable: 11,
    },
    {
      Type: 'Double',
      Available: 22,
      Unavailable: 22,
    },
    {
      Type: 'Big',
      Available: 13,
      Unavailable: 11,
    },
    {
      Type: 'Resident',
      Available: 22,
      Unavailable: 11,
    },
  ];
  const [showTemplate, setShowTemplate] = useState(false);
  const [searchBooking, setSearchBooking] = useState('');
  if (bills.length !== 0) {
    return (
      <KeyboardAwareScrollView>
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
                  3
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <VictoryPie
              width={260}
              height={300}
              colorScale={['#fdbe57', '#3be5c6', '#df8026', '#6a9111']}
              data={[
                {x: 'New', y: 35},
                {x: 'Due in', y: 40},
                {x: 'Due out', y: 55},
                {x: 'Checked in', y: 30},
              ]}
              innerRadius={100}
              labelRadius={({innerRadius}) => innerRadius + 10}
              labelComponent={<VictoryTooltip active renderInPortal={false} />}
              labels={({datum}) => datum.y}
              style={{
                labels: {fill: 'black', fontSize: 15, fontWeight: 'bold'},
              }}
              labelPosition="centroid"
            />
            <VictoryLegend
              orientation="vertical"
              x={20}
              y={50}
              gutter={20}
              colorScale={['#fdbe57', '#3be5c6', '#df8026', '#6a9111']}
              data={[
                {name: 'New'},
                {name: 'Due in'},
                {name: 'Due out'},
                {name: 'Checked in'},
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
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 10,
            }}>
            {bills.map((item, index) => {
              if (
                item.CheckIn === 1 &&
                item.Phone_Number.indexOf(search) > -1 &&
                index < (search === '' ? 4 : bills.length)
              )
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
            })}
          </ScrollView>
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
                  527
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
                  443
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
                  15
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
                  363 Adults
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginHorizontal: 10,
                  }}>
                  76 Children
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
                    width: '40%',
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
                40%
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
                  363 Adults
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: 'black',
                    marginHorizontal: 10,
                  }}>
                  76 Children
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
                    width: '60%',
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
                60%
              </Text>
            </View>
          </View>
          {/*Reservation Type */}
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
                  Reservation type
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
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <VictoryPie
              width={250}
              height={250}
              colorScale={['#fdbe57', '#3be5c6']}
              data={[
                {x: 'Single', y: 60},
                {x: 'Group', y: 40},
              ]}
              labels={({datum}) => `${datum.y}%`}
              labelRadius={25}
              style={{
                labels: {fill: 'white', fontSize: 15, fontWeight: 'bold'},
              }}
              labelPosition="centroid"
            />
            <VictoryLegend
              orientation="vertical"
              x={15}
              y={50}
              colorScale={['#fdbe57', '#3be5c6']}
              data={[{name: 'Single'}, {name: 'Group'}]}
            />
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
            {DataRoomsStatus.map((item, index) => {
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
                  <Text style={{color: 'black', flex: 1}}>{item.Type}</Text>

                  <Text style={{color: 'black', flex: 1}}>
                    {item.Available}
                  </Text>

                  <Text style={{color: 'black', flex: 1}}>
                    {item.Unavailable}
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
                          item.Available - item.Unavailable > 0
                            ? 'hsl(162,95%,63%)'
                            : 'red',
                        marginRight: 10,
                      }}
                    />
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {item.Available - item.Unavailable > 0
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
