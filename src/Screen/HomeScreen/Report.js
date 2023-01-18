import {
  View,
  Text,
  Image,
  ScrollView,
  LogBox,
  Pressable,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {cloneElement, useEffect, useRef, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import {query, collection, orderBy, limit, getDocs} from 'firebase/firestore';
import {db} from '../../Firebase/firebase';
import moment from 'moment';
const Report = ({navigation}) => {
  LogBox.ignoreLogs([
    'Require cycle: node_modules\victory-vendorlib-vendord3-interpolatesrc\value.js -> node_modules\victory-vendorlib-vendord3-interpolatesrcobject.js -> node_modules\victory-vendorlib-vendord3-interpolatesrc\value.js',
  ]);

  useEffect(() => {
    async function GetDB() {
      setMapIncome([]);
      setMapOutcome([]);
      let income = 0;
      let outcome = 0;
      if (kindFilter === 0) {
        console.log('kind', kindFilter);
        console.log(kindFilter);
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

        getDbDate.forEach(monthItem => {
          let dataIncome = {
            x: moment(monthItem.data().Date.toDate()).format('DD/MM'),
            y: monthItem.data().Money,
          };

          income += monthItem.data().Money;
          monthIncome.push(dataIncome);
        });
        setMapIncome([...monthIncome]);

        setSumIncome(income);
        setSumOutcome(outcome);
      }
      if (kindFilter === 1) {
        console.log(kindFilter);
        const getDbMonth = await getDocs(
          query(
            collection(db, `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly`),
            orderBy('Date', 'asc'),
          ),
        );
        let monthIncome = [];
        let monthOutcome = [];

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
        setMapIncome([...monthIncome]);
        setMapOutcome([...monthOutcome]);

        setSumIncome(income);
        setSumOutcome(outcome);
      }
      if (kindFilter === 2) {
        const getDbMonth = await getDocs(
          query(collection(db, 'Revenue'), orderBy('Date', 'asc')),
        );
        let monthIncome = [];
        let monthOutcome = [];

        getDbMonth.forEach(monthItem => {
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
        setMapIncome([...monthIncome]);
        setMapOutcome([...monthOutcome]);

        setSumIncome(income);
        setSumOutcome(outcome);
      }
    }
    GetDB();
  }, []);

  const getMonth = async index => {
    setKindFilter(index);
    setMapIncome([]);
    setMapOutcome([]);
    let income = 0;
    let outcome = 0;
    if (index === 0) {
      console.log(index);
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

      getDbDate.forEach(monthItem => {
        let dataIncome = {
          x: moment(monthItem.data().Date.toDate()).format('DD/MM'),
          y: monthItem.data().Money,
        };

        income += monthItem.data().Money;
        monthIncome.push(dataIncome);
      });
      setMapIncome([...monthIncome]);

      setSumIncome(income);
      setSumOutcome(outcome);
    }
    if (index === 1) {
      const getDbMonth = await getDocs(
        query(
          collection(db, `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly`),
          orderBy('Date', 'asc'),
        ),
      );
      let monthIncome = [];
      let monthOutcome = [];

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
      setMapIncome([...monthIncome]);
      setMapOutcome([...monthOutcome]);

      setSumIncome(income);
      setSumOutcome(outcome);
    }

    if (index === 2) {
      const getDbMonth = await getDocs(
        query(collection(db, 'Revenue'), orderBy('Date', 'asc')),
      );
      let monthIncome = [];
      let monthOutcome = [];

      getDbMonth.forEach(monthItem => {
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
      setMapIncome([...monthIncome]);
      setMapOutcome([...monthOutcome]);

      setSumIncome(income);
      setSumOutcome(outcome);
    }
  };

  const [sumIncome, setSumIncome] = useState(0);
  const [sumOutcome, setSumOutcome] = useState(0);
  const [mapIncome, setMapIncome] = useState([]);
  const [mapOutcome, setMapOutcome] = useState([]);

  const [multiTouchFilter, setMultiTouchFilter] = useState([
    'Week',
    'Month',
    'Year',
  ]);
  console.log(sumIncome);
  const [kindFilter, setKindFilter] = useState(0);
  const renderFilter = ({item, index}) => {
    return (
      <Pressable
        onPress={() => getMonth(index)}
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
  const Avg = money => {
    let avg = 0;
    for (let i = 0; i < money.length - 1; i++)
      for (let j = i + 1; j < money.length; j++) {
        avg += (money[j].y - money[i].y) / money[i].y;
      }

    console.log(avg);
    return avg > 0
      ? (avg / money.length).toFixed(2) * 100
      : -(Math.abs(avg) / money.length).toFixed(2) * 100;
  };
  return (
    <ScrollView
      style={{
        backgroundColor: 'hsl(213,21%,90%)',
        flex: 1,
      }}>
      {/*Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          elevation: 5,
          backgroundColor: 'white',
          paddingVertical: 10,
        }}>
        <Lottie
          source={{
            uri: 'https://assets7.lottiefiles.com/packages/lf20_xufsq6mg.json',
          }}
          style={{
            width: 50,
            height: 50,
          }}
          loop
          autoPlay
        />
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '600',
          }}>
          CKHM Hotel Organisation
        </Text>
        <Image
          source={require('./asset/thunder.png')}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',
          }}
        />
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
            marginLeft: 20,
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

        <View
          style={{
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <FlatList
            data={multiTouchFilter}
            renderItem={renderFilter}
            horizontal
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
            $ {sumIncome - sumOutcome}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Net Profit
          </Text>
        </View>
        {mapIncome.length === 0 && mapOutcome.length === 0 ? (
          <ActivityIndicator color={'blue'} size={30} />
        ) : kindFilter === 2 ? (
          <View
            style={{
              flex: 1,
            }}>
            {mapIncome.length === 1 ? (
              <VictoryPie
                colorScale={['hsl(171,62%,48%)', 'hsl(215,62%,60%)']}
                data={[
                  {x: 'Income', y: sumIncome},
                  {x: 'Expenses', y: sumOutcome},
                ]}
              />
            ) : (
              <VictoryChart theme={VictoryTheme.material}>
                <VictoryGroup>
                  <VictoryLine
                    style={{
                      data: {stroke: '#c43a31'},
                      parent: {border: '1px solid hsl(171,62%,48%)'},
                    }}
                    data={mapIncome}
                  />
                  <VictoryLine
                    style={{
                      data: {stroke: '#c43a31'},
                      parent: {border: '1px solid hsl(215,62%,60%)'},
                    }}
                    data={mapOutcome}
                  />
                </VictoryGroup>
              </VictoryChart>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
            }}>
            {mapIncome.length !== 0 ? (
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
                  data={mapIncome}
                  style={{
                    data: {
                      fill: 'hsl(171,62%,48%)',
                      width: 10,
                    },
                  }}
                  cornerRadius={{top: 5, bottom: 5}}
                />
              </VictoryChart>
            ) : null}
            {mapOutcome.length !== 0 ? (
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
                  data={mapOutcome}
                  style={{
                    data: {
                      fill: 'hsl(215,62%,60%)',
                      width: 10,
                    },
                  }}
                  cornerRadius={{top: 5, bottom: 5}}
                />
              </VictoryChart>
            ) : null}
          </View>
        )}
        {/*Legend */}
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
              $ {sumIncome}
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
              $ {sumOutcome}
            </Text>
          </View>
        </View>
      </View>
      {/*Review */}
      <View
        style={{
          backgroundColor: 'white',
          marginVertical: 10,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
          }}>
          Average revenue:{' '}
          <Text>
            ${(sumIncome / 12).toFixed(2)} per{' '}
            {multiTouchFilter[kindFilter].toLocaleLowerCase()} {'  '}
          </Text>
          <Text
            style={{
              color: 'red',
            }}>
            ({Avg(mapIncome)}%)
          </Text>
          <Ionicons
            name={
              Avg(mapIncome) > 0
                ? 'trending-up-outline'
                : 'trending-down-outline'
            }
            size={24}
            color={Avg(mapIncome) > 0 ? 'green' : 'red'}
          />
        </Text>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
          }}>
          Average expense:{' '}
          <Text>
            ${(sumOutcome / 12).toFixed(2)} per{' '}
            {multiTouchFilter[kindFilter].toLocaleLowerCase()}
            {'  '}
          </Text>
          <Text
            style={{
              color: Avg(mapOutcome) > 0 ? 'green' : 'red',
            }}>
            ({Avg(mapOutcome)}%)
          </Text>
          <Ionicons
            name={
              Avg(mapOutcome) > 0
                ? 'trending-up-outline'
                : 'trending-down-outline'
            }
            size={24}
            color={Avg(mapOutcome) > 0 ? 'green' : 'red'}
          />
        </Text>
      </View>
    </ScrollView>
  );
};

export default Report;
