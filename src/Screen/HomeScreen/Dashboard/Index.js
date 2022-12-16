import {
  View,
  Text,
  ScrollView,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import React, {useState, useReducer} from 'react';
import DataHeader from './DataHeader';
import DropdownComponent from './DropdownComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
  VictoryAxis,
  VictoryLabel,
  VictoryBar,
  VictoryTooltip,
} from 'victory-native';
import {DataTable} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import moment from 'moment';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Index = ({navigation}) => {
  const [kind_Overview, setKind_Overview] = useState({
    title: 'Sales',
    icon_type: MaterialCommunityIcons,
    icon_name: 'tag-multiple',
  });
  const [open_Dropdown, setOpen_Dropdown] = useState(false);

  const DataLineChart = [
    {x: 'Jan', y: 2},
    {x: 'Feb', y: 3},
    {x: 'March', y: 5},
    {x: 'Apr', y: 4},
    {x: 'May', y: 7},
    {x: 'Jun', y: 1},
    {x: 'Jul', y: 8},
    {x: 'Aug', y: 6},
    {x: 'Sep', y: 5},
  ];

  const DataRencentOrder = [
    {
      name_customer: 'Doan Tan Khang',
      date: '02/08/2022',
      price: '$320.999',
      status: 1,
    },
    {
      name_customer: 'Doan Tan Khang',
      date: '02/08/2022',
      price: '$320.999',
      status: 0,
    },
    {
      name_customer: 'Doan Tan Khang',
      date: '02/08/2022',
      price: '$320.999',
      status: 0,
    },
    {
      name_customer: 'Doan Tan Khang',
      date: '02/08/2022',
      price: '$320.999',
      status: 0,
    },
    {
      name_customer: 'Doan Tan Khang',
      date: '02/08/2022',
      price: '$320.999',
      status: 0,
    },
    {
      name_customer: 'Doan Tan Khang',
      date: '02/08/2022',
      price: '$320.999',
      status: 0,
    },
  ];

  const CheckDate = firt_day => {
    const day_first = firt_day.slice(0, 2);
    const month_first = firt_day.slice(3, 5);
    const year_first = firt_day.slice(6, 10);
    const second = moment().isSameOrBefore(
      moment(year_first + '-' + month_first + '-' + day_first),
    );
    // const first = moment(
    //   year_first + '-' + month_first + '-' + day_first,
    // ).toDate();
    // console.log(first);
    console.log(second);
    return second;
  };
  let Order = [];
  let bills = useSelector(state => state.data_infor).data.bills;

  console.log(bills);
  const [seeRecent_Order, setSeeRecent_Order] = useState(3);
  const [checkSeeAll, setCheckSeeAll] = useState(false);
  const showRecentOrder = () => {
    if (checkSeeAll === false) {
      setSeeRecent_Order(DataRencentOrder.length);
      setCheckSeeAll(true);
      return;
    } else {
      setSeeRecent_Order(3);
      setCheckSeeAll(false);
    }
  };

  const YEAR_CLICK = 'year_click';

  const reducer = (state, action) => {
    if (action.type === YEAR_CLICK) {
      return {
        ...state,
        year: action.year,
        dataMonth: action.dataMonth,
      };
    } else return state;
  };

  const [state, dispatch] = useReducer(reducer, {
    year: '',
    dataMonth: [],
  });

  const renderDataLine = year => {
    dispatch({
      type: YEAR_CLICK,
      year: year,
      dataMonth: DataLineChart,
    });
  };

  const pressClickHandler = () => {
    return [
      {
        target: 'labels',
        mutation: props => {
          renderDataLine(props.datum.x);
        },
      },
    ];
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 20,
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
          <Ionicons name="pencil" size={20} color="black" />
        </Pressable>
      </View>
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}>
        {/*Title Header */}
        <Text
          style={{
            fontSize: 24,
            color: 'black',
            fontWeight: '700',
            marginLeft: 10,
          }}>
          Dashboard
        </Text>

        {/*Statictis*/}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DataHeader.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  width: 230,
                  marginHorizontal: 20,
                  borderWidth: 1,
                  marginVertical: 10,
                  borderColor: 'hsl(0,0%,90%)',
                  borderRadius: 10,
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'black',
                    }}>
                    {item.title}
                  </Text>
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: 'hsl(220,98%,95%)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <item.icon_type
                      name={item.icon_name}
                      size={24}
                      color={'hsl(220,98%,60%)'}
                    />
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  ${item.sales}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 5,
                  }}>
                  <View
                    style={{
                      width: 25,
                      height: 25,
                      borderRadius: 20,
                      backgroundColor: item.back_color_change,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <item.change_icon_type
                      name={item.change_icon_name}
                      size={16}
                      color={item.color_change}
                    />
                  </View>
                  <Text
                    style={{
                      color: item.color_change,
                      fontWeight: '700',
                      fontSize: 16,
                    }}>
                    {' '}
                    {item.sales_change}
                  </Text>
                  <Text> {item.subtitle}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        {/*Overview */}
        <View
          style={{
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  color: 'black',
                  fontWeight: '700',
                }}>
                Overview
              </Text>
              {state.year !== '' ? (
                <Pressable
                  onPress={() => {
                    dispatch({
                      type: YEAR_CLICK,
                      year: '',
                      dataMonth: [],
                    });
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: 10,
                    }}>
                    go back
                  </Text>
                </Pressable>
              ) : null}
            </View>
            <Pressable
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                ),
                  setOpen_Dropdown(!open_Dropdown);
              }}
              style={{
                position: 'absolute',
                right: 0,
                zIndex: 999,
              }}>
              <DropdownComponent
                value={kind_Overview}
                setValue={setKind_Overview}
                open={open_Dropdown}
                setOpen={setOpen_Dropdown}
              />
            </Pressable>
          </View>
        </View>
        {/*Line chart*/}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          {state.year === '' ? (
            <VictoryChart
              domainPadding={{x: 20, y: 10}}
              theme={VictoryTheme.material}
              padding={{top: 20, left: 40, right: 10, bottom: 40}}>
              <VictoryAxis
                dependentAxis
                style={{
                  axis: {stroke: 'none'},
                }}
              />
              <VictoryAxis
                style={{
                  axis: {stroke: 'none'},
                }}
              />

              <VictoryBar
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onClick: pressClickHandler,
                      onPress: pressClickHandler,
                    },
                  },
                ]}
                style={{
                  labels: {fill: 'black'},
                }}
                animate={{
                  duration: 1000,
                  onLoad: {duration: 1000},
                  useNativeDriver: true,
                }}
                labelComponent={<VictoryLabel dy={-10} />}
                data={[
                  {x: '2019', y: 125, label: '125'},
                  {x: '2020', y: 400, label: '400'},
                  {x: '2021', y: 345, label: '345'},
                  {x: '2022', y: 515, label: '515'},
                ]}
              />
              <VictoryLine
                data={[
                  {x: '2019', y: 125},
                  {x: '2020', y: 400},
                  {x: '2021', y: 345},
                  {x: '2022', y: 515},
                ]}
                style={{
                  data: {stroke: 'red'},
                }}
                animate={{
                  duration: 1000,
                  onLoad: {duration: 1000},
                  useNativeDriver: true,
                }}
              />
              <VictoryScatter
                data={[
                  {x: '2019', y: 125},
                  {x: '2020', y: 400},
                  {x: '2021', y: 345},
                  {x: '2022', y: 515},
                ]}
                size={5}
                style={{data: {fill: '#c43a31'}}}
              />
            </VictoryChart>
          ) : (
            <VictoryChart
              domainPadding={{x: 10, y: 30}}
              theme={VictoryTheme.material}
              padding={{top: 10, left: 40, right: 10, bottom: 40}}>
              <VictoryAxis
                dependentAxis
                style={{
                  axis: {stroke: 'none'},
                }}
              />
              <VictoryAxis
                style={{
                  axis: {stroke: 'none'},
                }}
              />

              <VictoryLine
                interpolation={'catmullRom'}
                style={{
                  labels: {fill: 'black'},
                }}
                animate={{
                  duration: 1000,
                  onLoad: {duration: 1000},
                  useNativeDriver: true,
                }}
                labels={({datum}) => datum.y}
                labelComponent={<VictoryLabel dy={-10} />}
                data={DataLineChart}
              />
              <VictoryScatter
                data={[{x: 'March', y: 5}]}
                size={5}
                style={{
                  data: {
                    fill: 'white',
                    stroke: 'hsl(214,82%,50%)',
                    strokeWidth: 3,
                  },
                  labels: {
                    fontSize: 12,
                    fill: 'black',
                  },
                }}
                labels={() => ['March 2022', '$430.999']}
                labelComponent={
                  <VictoryTooltip
                    dy={-10}
                    flyoutStyle={{
                      fill: 'white',
                    }}
                    active
                    renderInPortal={false}
                  />
                }
              />
            </VictoryChart>
          )}
        </View>

        {/*Recent Order */}
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                color: 'black',
                fontWeight: '700',
              }}>
              Recent Order
            </Text>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
