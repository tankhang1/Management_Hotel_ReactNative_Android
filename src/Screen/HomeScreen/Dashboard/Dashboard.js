import {View, Text, ScrollView, Pressable, TextInput} from 'react-native';
import React, {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DataTable} from 'react-native-paper';

import {VictoryLegend, VictoryPie, VictoryTooltip} from 'victory-native';
import {useSelector} from 'react-redux';
import moment from 'moment';
const Dashboard = ({navigation}) => {
  const [search, setSearch] = useState('');
  const DataCheckIn = [
    {
      Date_Check_In: '12/10/2022',
      Date_Check_Out: '14/10/2022',
      Room_Id: '4vV9iVjTIppSkNcD1GIj',
    },
    {
      Date_Check_In: '12/10/2022',
      Date_Check_Out: '14/10/2022',
      Room_Id: '4vV9iVjTIppSkNcD1GIj',
    },
    {
      Date_Check_In: '12/10/2022',
      Date_Check_Out: '14/10/2022',
      Room_Id: '4vV9iVjTIppSkNcD1GIj',
    },
    {
      Date_Check_In: '12/10/2022',
      Date_Check_Out: '14/10/2022',
      Room_Id: '4vV9iVjTIppSkNcD1GIj',
    },
  ];
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
  const CheckDate = firt_day => {
    const day_first = firt_day.slice(0, 2);
    const month_first = firt_day.slice(3, 5);
    const year_first = firt_day.slice(6, 10);
    const second = moment().isSameOrBefore(
      moment(year_first + '-' + month_first + '-' + day_first),
    );
    return second;
  };
  let bills = useSelector(state => state.data_infor).data.bills;
  const [seeRecent_Order, setSeeRecent_Order] = useState(3);
  const [checkSeeAll, setCheckSeeAll] = useState(false);
  const showRecentOrder = () => {
    if (checkSeeAll === false) {
      setSeeRecent_Order(bills.length);
      setCheckSeeAll(true);
      return;
    } else {
      setSeeRecent_Order(3);
      setCheckSeeAll(false);
    }
  };
  return (
    <KeyboardAwareScrollView>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 10,
        }}>
        {/*Header */}
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
            onPress={() => {
              navigation.navigate('Setting');
            }}
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
              placeholder="Search by guest,room,..."
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
          {DataCheckIn.map((item, index) => {
            return (
              <View
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
                    backgroundColor: index % 2 !== 0 ? 'hsl(0,0%,90%)' : null,
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
                    {item.Room_Id}
                  </Text>
                </View>
              </View>
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
                  backgroundColor: index % 2 === 0 ? 'hsl(0,0%,90%)' : 'white',
                  paddingVertical: 10,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'black', flex: 1}}>{item.Type}</Text>

                <Text style={{color: 'black', flex: 1}}>{item.Available}</Text>

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
            <Pressable
              onPress={() => {
                showRecentOrder();
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'blue',
                }}>
                {checkSeeAll === false ? 'See All' : 'Reduce'}
              </Text>
            </Pressable>
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
            {bills
              .map((item, index) => {
                if (index < seeRecent_Order)
                  return (
                    <DataTable.Row key={index}>
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
                            color:
                              CheckDate(item.Date) < new Date()
                                ? 'green'
                                : 'red',
                          }}>
                          {CheckDate(item.Date) < new Date()
                            ? 'completed'
                            : 'uncompleted'}
                        </Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  );
                else return;
              })
              .reverse()}
          </ScrollView>
        </DataTable>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Dashboard;
