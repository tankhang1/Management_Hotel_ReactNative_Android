'use strict';
import {
  View,
  Text,
  Image,
  ScrollView,
  LogBox,
  Pressable,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {cloneElement, useEffect, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';
import CalendarPicker from 'react-native-calendar-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  query,
  collection,
  orderBy,
  limit,
  getDocs,
  where,
} from 'firebase/firestore';
import {db} from '../../Firebase/firebase';
import moment from 'moment';
import {DataTable, Modal} from 'react-native-paper';
import {useCallback} from 'react';
import ModalOptionReport from './ModalOptionReport';
import {FirebaseError, map} from '@firebase/util';
const Report = ({navigation}) => {
  LogBox.ignoreLogs([
    'Require cycle: node_modules\victory-vendorlib-vendord3-interpolatesrc\value.js -> node_modules\victory-vendorlib-vendord3-interpolatesrcobject.js -> node_modules\victory-vendorlib-vendord3-interpolatesrc\value.js',
  ]);

  useEffect(() => {
    const getDb = async () => {
      let mapIncome = [];
      let mapOutcome = [];
      let mapSumIncome = [];
      let mapSumOutcome = [];
      {
        /* Week */
      }
      let income = 0;
      let outcome = 0;
      const getDbDate = await getDocs(
        query(
          collection(
            db,
            `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly/12a7e0fb-f8e1-4488-b174-9fce340d9eb5/Revenue_Daily`,
          ),

          orderBy('Date', 'desc'),
          limit(7),
        ),
      );
      let monthIncome = [];
      let monthOutcome = [];
      let bills = [];

      getDbDate.forEach(monthItem => {
        let dataIncome = {
          x: moment(monthItem.data().Date.toDate()).format('DD/MM'),
          y: monthItem.data().Money,
        };
        bills.push({
          id: monthItem.data().List_Bill,
          date: moment(monthItem.data().Date.toDate()).format('DD/MM/YYYY'),
        });
        income += monthItem.data().Money;
        monthIncome.push(dataIncome);
      });
      mapIncome.push({key: 'Week', data: monthIncome.reverse()});
      mapOutcome.push({key: 'Week', data: monthOutcome.reverse()});
      setBillId([...bills]);
      setFirstDay(bills[bills.length - 1].date);
      setSecondDay(bills[0].date);
      mapSumIncome.push({key: 'Week', data: income});
      mapSumOutcome.push({key: 'Week', data: outcome});

      {
        /*Month */
      }

      const getDbMonth = await getDocs(
        query(
          collection(db, `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly`),
          orderBy('Date', 'asc'),
        ),
      );
      monthIncome = [];
      monthOutcome = [];
      income = 0;
      outcome = 0;
      getDbMonth.forEach(monthItem => {
        let dataIncome = {
          x: moment(monthItem.data().Date.toDate()).format('MM'),
          y: monthItem.data().Income,
        };
        let dataOutcome = {
          x: moment(monthItem.data().Date.toDate()).format('MM'),
          y: monthItem.data().Outcome,
        };
        income += monthItem.data().Income;
        outcome += monthItem.data().Outcome;
        monthIncome.push(dataIncome);
        monthOutcome.push(dataOutcome);
      });
      mapIncome.push({key: 'Month', data: monthIncome});
      mapOutcome.push({key: 'Month', data: monthOutcome});
      mapSumIncome.push({key: 'Month', data: income});
      mapSumOutcome.push({key: 'Month', data: outcome});

      {
        /*Year */
      }

      const getDbYear = await getDocs(
        query(collection(db, 'Revenue'), orderBy('Date', 'asc')),
      );
      monthIncome = [];
      monthOutcome = [];
      income = 0;
      outcome = 0;
      getDbYear.forEach(monthItem => {
        let dataIncome = {
          x: moment(monthItem.data().Date.toDate()).format('YYYY'),
          y: monthItem.data().Income,
        };
        let dataOutcome = {
          x: moment(monthItem.data().Date.toDate()).format('YYYY'),
          y: monthItem.data().Outcome,
        };
        income += monthItem.data().Income;
        outcome += monthItem.data().Outcome;
        monthIncome.push(dataIncome);
        monthOutcome.push(dataOutcome);
      });
      mapIncome.push({key: 'Year', data: monthIncome});
      mapOutcome.push({key: 'Year', data: monthOutcome});
      mapSumIncome.push({key: 'Year', data: income});
      mapSumOutcome.push({key: 'Year', data: outcome});

      return {
        mapIncome,
        mapOutcome,
        mapSumIncome,
        mapSumOutcome,
      };
    };
    getDb().then(({mapIncome, mapOutcome, mapSumIncome, mapSumOutcome}) => {
      setMapIncome([...mapIncome]);
      setMapOutcome([...mapOutcome]);
      setSumIncome([...mapSumIncome]);
      setSumOutcome([...mapSumOutcome]);
    });
  }, [navigation]);
  const [sumIncome, setSumIncome] = useState([]);
  const [sumOutcome, setSumOutcome] = useState([]);
  const [mapIncome, setMapIncome] = useState([]);
  const [mapOutcome, setMapOutcome] = useState([]);
  const [billId, setBillId] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [firstDay, setFirstDay] = useState('');
  const [secondDay, setSecondDay] = useState('');

  const [multiTouchFilter, setMultiTouchFilter] = useState([
    'Week',
    'Month',
    'Year',
  ]);
  console.log(billId);

  const [kindFilter, setKindFilter] = useState(0);
  const renderFilter = ({item, index}) => {
    return (
      <Pressable
        onPress={() => setKindFilter(index)}
        key={index}
        style={{
          width: 100,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: 'black',
          marginHorizontal: 10,
          borderRadius: 10,
          backgroundColor: kindFilter === index ? 'hsl(151,82%,72%)' : null,
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
  };
  const changeModal = useCallback(() => {
    setOpenModal(!openModal);
  }, [openModal]);

  const changeDate = useCallback(async () => {
    changeModal();
    let income = 0;
    let outcome = 0;
    let tmpMapIncome = [...mapIncome];
    let tmpMapOutcome = [...mapOutcome];
    let tmpMapSumIncome = [...sumIncome];
    let tmpMapSumOutcome = [...sumOutcome];
    let tmpFirstDay = new Date(
      `${firstDay.slice(6, 10)}-${firstDay.slice(3, 5)}-${firstDay.slice(
        0,
        2,
      )}`,
    );
    let tmpSecondDay = new Date(
      `${secondDay.slice(6, 10)}-${secondDay.slice(3, 5)}-${secondDay.slice(
        0,
        2,
      )}`,
    );
    const getDbDate = await getDocs(
      query(
        collection(
          db,
          `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly/12a7e0fb-f8e1-4488-b174-9fce340d9eb5/Revenue_Daily`,
        ),
        where('Date', '>=', tmpFirstDay),
        where('Date', '<=', tmpSecondDay),
        orderBy('Date', 'desc'),
        limit(7),
      ),
    );
    let monthIncome = [];
    let monthOutcome = [];
    let bills = [];

    getDbDate.forEach(monthItem => {
      let dataIncome = {
        x: moment(monthItem.data().Date.toDate()).format('DD/MM'),
        y: monthItem.data().Money,
      };
      bills.push({
        id: monthItem.data().List_Bill,
        date: moment(monthItem.data().Date.toDate()).format('DD/MM/YYYY'),
      });
      income += monthItem.data().Money;
      monthIncome.push(dataIncome);
    });
    tmpMapIncome[0].data = monthIncome.reverse();
    tmpMapOutcome[0].data = monthOutcome.reverse();
    tmpMapSumIncome[0].data = income;
    tmpMapSumOutcome[0].data = outcome;
    setMapIncome([...tmpMapIncome]);
    setMapOutcome([...tmpMapOutcome]);
    setSumIncome([...tmpMapSumIncome]);
    setSumOutcome([...tmpMapSumOutcome]);
    setBillId([...bills]);
    setFirstDay(bills[bills.length - 1].date);
    setSecondDay(bills[0].date);
  }, [firstDay, secondDay]);

  const [exportExcel, setExportExcel] = useState(false);
  return (
    <ScrollView
      style={{
        backgroundColor: 'hsl(213,21%,90%)',
        flex: 1,
      }}>
      <ModalOptionReport
        openModal={openModal}
        changeModal={changeModal}
        setFirstDay={setFirstDay}
        setSecondDay={setSecondDay}
        changeDate={changeDate}
        exportExcel={exportExcel}
        setExportExcel={setExportExcel}
      />

      {/*Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          elevation: 5,
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 10,
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
            fontSize: 20,
            color: 'black',
            fontWeight: '600',
          }}>
          CKHM Hotel Organisation
        </Text>

        <Pressable
          onPress={() => {
            changeModal(), setExportExcel(true);
          }}>
          <MaterialCommunityIcons
            name="microsoft-excel"
            size={30}
            color="green"
          />
        </Pressable>
      </View>
      {/*Body */}
      {/*Profit and Loss */}
      <View
        style={{
          backgroundColor: 'white',
          paddingVertical: 20,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Entypo name="bar-graph" size={20} color={'hsl(0,0%,73%)'} />
            <Text
              style={{
                fontSize: 20,
                color: 'hsl(203,37%,32%)',
                fontWeight: '700',
                paddingLeft: 10,
                letterSpacing: 0.8,
              }}>
              Profit and Loss
            </Text>
          </View>
          {kindFilter === 0 && (
            <Pressable
              onPress={() => {
                changeModal(), setExportExcel(false);
              }}>
              <AntDesign name="calendar" size={24} color="black" />
            </Pressable>
          )}
        </View>

        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <FlatList
            data={multiTouchFilter}
            renderItem={renderFilter}
            horizontal
            removeClippedSubviews
            extraData={multiTouchFilter}
          />
        </View>

        <View
          style={{
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontSize: 24,
              color: 'hsl(203,37%,32%)',
              fontWeight: '700',
              paddingVertical: 5,
              letterSpacing: 1,
              textAlign: 'center',
            }}>
            $ {sumIncome[kindFilter]?.data - sumOutcome[kindFilter]?.data}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Net Profit
          </Text>

          {kindFilter === 0 && (
            <Text
              style={{
                position: 'absolute',
                left: '-35%',
                fontSize: 10,
                color: 'black',
              }}>
              {firstDay} -{secondDay}
            </Text>
          )}
        </View>
        {kindFilter === 2 && mapIncome[kindFilter]?.data?.length === 1 && (
          <VictoryPie
            colorScale={['hsl(171,62%,48%)', 'hsl(215,62%,60%)']}
            data={[
              {x: 'Income', y: sumIncome[kindFilter]?.data},
              {x: 'Expenses', y: sumOutcome[kindFilter]?.data},
            ]}
          />
        )}
        {kindFilter === 2 && mapIncome[kindFilter]?.data?.length > 1 && (
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryGroup>
              <VictoryLine
                style={{
                  data: {stroke: '#c43a31'},
                  parent: {border: '1px solid hsl(171,62%,48%)'},
                }}
                data={mapIncome[kindFilter].data}
              />
              <VictoryLine
                style={{
                  data: {stroke: '#c43a31'},
                  parent: {border: '1px solid hsl(215,62%,60%)'},
                }}
                data={mapOutcome[kindFilter].data}
              />
            </VictoryGroup>
          </VictoryChart>
        )}
        {kindFilter < 2 && (
          <View>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryAxis
                style={{
                  axis: {stroke: 'none'},
                }}
              />
              <VictoryAxis
                style={{
                  axis: {stroke: 'none'},
                }}
                dependentAxis
              />
              <VictoryBar
                data={mapIncome[kindFilter]?.data}
                style={{
                  data: {
                    fill: 'hsl(171,62%,48%)',
                    width: 10,
                  },
                }}
                cornerRadius={{top: 5, bottom: 5}}
              />
            </VictoryChart>
            {kindFilter === 1 && (
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryAxis
                  style={{
                    axis: {stroke: 'none'},
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: {stroke: 'none'},
                  }}
                  dependentAxis
                />
                <VictoryBar
                  data={mapOutcome[kindFilter]?.data}
                  style={{
                    data: {
                      fill: 'hsl(215,62%,60%)',
                      width: 10,
                    },
                  }}
                  cornerRadius={{top: 5, bottom: 5}}
                />
              </VictoryChart>
            )}
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: 'hsl(171,62%,48%)',
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '600',
                  paddingLeft: 5,
                }}>
                Income
              </Text>
            </View>
            <Text
              style={{
                fontSize: 18,
                color: 'hsl(171,62%,48%)',
                letterSpacing: 1,
                lineHeight: 30,
                fontWeight: '600',
              }}>
              $ {sumIncome[kindFilter]?.data}
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                  fontWeight: '600',
                  paddingRight: 5,
                }}>
                Expenses
              </Text>
              <View
                style={{
                  width: 10,
                  height: 30,
                  borderRadius: 10,
                  backgroundColor: 'hsl(215,62%,60%)',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                color: 'hsl(215,62%,60%)',
                letterSpacing: 1,
                lineHeight: 30,
                fontWeight: '600',
              }}>
              $ {sumOutcome[kindFilter]?.data}
            </Text>
          </View>
        </View>
      </View>

      {kindFilter === 0 && (
        <DataTable
          style={{
            backgroundColor: 'white',
            marginVertical: 10,
            borderRadius: 10,
          }}>
          <DataTable.Header>
            <DataTable.Title style={{flex: 2}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                }}>
                Bill ID
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{flex: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                }}>
                Date
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <ScrollView>
            {billId.map((b, i) =>
              b.id.map((id, index) => (
                <TouchableOpacity key={index}>
                  <DataTable.Row>
                    <DataTable.Cell
                      style={{
                        flex: 2,
                      }}>
                      {id}
                    </DataTable.Cell>
                    <DataTable.Cell
                      style={{
                        flex: 1,
                      }}>
                      {b.date}
                    </DataTable.Cell>
                  </DataTable.Row>
                </TouchableOpacity>
              )),
            )}
          </ScrollView>
        </DataTable>
      )}
    </ScrollView>
  );
};

export default Report;
