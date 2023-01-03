import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
} from 'victory-native';
import {Divider} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  query,
  collection,
  onSnapshot,
  orderBy,
  limit,
} from 'firebase/firestore';
import {db} from '../../Firebase/firebase';
import moment from 'moment';
const Report = ({navigation}) => {
  useEffect(() => {
    LogBox.ignoreLogs([
      'Require cycle: node_modules\victory-vendorlib-vendord3-interpolatesrc\value.js -> node_modules\victory-vendorlib-vendord3-interpolatesrcobject.js -> node_modules\victory-vendorlib-vendord3-interpolatesrc\value.js',
    ]);
    const subscribe = navigation.addListener('focus', () => {
      const q = query(
        collection(db, 'History_Revenue'),
        orderBy('Date', 'desc'),
        limit(5),
      );
      onSnapshot(q, snapShot => {
        const tmp = [];
        snapShot.forEach(doc => {
          tmp.push(doc.data());
        });
        const income = [];
        let sumIncome = 0;
        const outcome = [];
        let sumOutcome = 0;
        tmp.reverse().map((item, index) => {
          const m = Number(moment(item.Date.toDate()).format('M'));
          const month = convertMonth(m);
          sumIncome += item.Income;
          sumOutcome += item.Outcome;
          income.push({x: month, y: item.Income});
          outcome.push({x: month, y: item.Outcome});
        });
        setIncome([...income]);
        setOutcome([...outcome]);
        setSumIncome(sumIncome);
        setSumOutcome(sumOutcome);
      });
      const queryDaily = query(
        collection(db, 'History_Daily_Revenue'),
        orderBy('Date', 'desc'),
        limit(4),
      );
      onSnapshot(queryDaily, snaps => {
        const tmp = [];
        snaps.forEach(doc => {
          const data = {
            title: 'Default Bank Account',
            bankNumber: doc.data().Bank_Number,
            lastUpdate: moment(doc.data().Date.toDate()).format('DD/MM/YYYY'),
            money: doc.data().Revenue,
          };
          tmp.push(data);
        });
        setDataBanking([...tmp]);
      });
    });
    return subscribe;
  }, [navigation]);

  const [Income, setIncome] = useState([]);
  const [Outcome, setOutcome] = useState([]);
  const [sumIncome, setSumIncome] = useState(0);
  const [sumOutcome, setSumOutcome] = useState(0);

  const convertMonth = month => {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        break;
    }
  };
  const [dataBanking, setDataBanking] = useState([]);

  const ConvertBankNumber = number => {
    for (let i = 0; i < number.length - 4; i++) {
      number = number.replace(number[i], '*');
    }

    return number;
  };

  const Overdue = 3555.4;
  const Unpaid = 6000;
  const rate = Overdue / Unpaid.toFixed(1);

  return (
    <View
      style={{
        backgroundColor: 'backgroundColor:hsl(213,21%,90%)',
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
      <ScrollView style={{}} showsVerticalScrollIndicator={false}>
        {/*Profit and Loss */}
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 20,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            elevation: 4,
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
          <View
            style={{
              flex: 1,
            }}>
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
              <VictoryGroup offset={12}>
                <VictoryBar
                  data={Income}
                  style={{
                    data: {
                      fill: 'hsl(171,62%,48%)',
                      width: 10,
                    },
                  }}
                  cornerRadius={{top: 5, bottom: 5}}
                />
                <VictoryBar
                  data={Outcome}
                  style={{
                    data: {
                      fill: 'hsl(215,62%,60%)',
                      width: 10,
                    },
                  }}
                  cornerRadius={{top: 5, bottom: 5}}
                />
              </VictoryGroup>
            </VictoryChart>
          </View>
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
        {/*Banking*/}
        <View
          style={{
            marginTop: 20,
          }}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome name="bank" size={20} color={'hsl(0,0%,73%)'} />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'hsl(203,37%,32%)',
                    fontWeight: '700',
                    paddingLeft: 10,
                    letterSpacing: 0.8,
                  }}>
                  Average daily revenue
                </Text>
              </View>
              <AntDesign name="right" size={16} />
            </View>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {dataBanking.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderRadius: 10,
                    elevation: 4,
                    backgroundColor: 'white',
                    marginRight: 20,
                    marginVertical: 10,
                    marginLeft: index === 0 ? 30 : 0,
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
                        color: 'hsl(203,37%,32%)',
                        fontWeight: '700',
                        marginRight: 30,
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontWeight: '600',
                        color: 'hsl(0,0%,60%)',
                      }}>
                      {ConvertBankNumber(item.bankNumber)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      paddingVertical: 10,
                      color: 'hsl(0,0%,60%)',
                    }}>
                    Last update: {item.lastUpdate}
                  </Text>
                  <Divider
                    style={{
                      width: '100%',
                      height: 2,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: 'hsl(203,37%,32%)',
                      }}>
                      $ {item.money}
                    </Text>
                    <Pressable
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 20,
                        backgroundColor: 'hsl(215,62%,50%)',
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '600',
                        }}>
                        Details
                      </Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        {/*Revenue*/}
        <View
          style={{
            paddingVertical: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 4,
            marginVertical: 20,
          }}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginLeft: 20,
                marginRight: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('./asset/icons8-revenue-64.png')}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'cover',
                  }}
                />

                <Text
                  style={{
                    fontSize: 20,
                    color: 'hsl(203,37%,32%)',
                    fontWeight: '700',
                    paddingLeft: 10,
                    letterSpacing: 0.8,
                  }}>
                  Sales
                </Text>
              </View>
              <AntDesign name="right" size={16} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <Text
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'hsl(338,68%,90%)',
                borderRadius: 30,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: '700',
                color: 'hsl(338,68%,49%)',
              }}>
              {Math.round(rate * 10)}
            </Text>
            {/* <ProgressCircle
              style={{
                height: 175,
                width: 200,
                transform: [{rotateZ: '-90deg'}],
              }}
              progress={rate}
              progressColor={'hsl(338,68%,49%)'}
              startAngle={0}
              endAngle={Math.PI}
              strokeWidth={10}
              cornerRadius={10}
            /> */}
            <Text
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'hsl(0,0%,90%)',
                borderRadius: 30,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontWeight: '700',
                color: 'hsl(0,0%,49%)',
              }}>
              {Math.round((1 - rate) * 10)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginTop: -20,
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
                    backgroundColor: 'hsl(338,68%,49%)',
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: '600',
                    paddingLeft: 5,
                  }}>
                  Overdue
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'hsl(338,68%,49%)',
                  letterSpacing: 1,
                  lineHeight: 30,
                  fontWeight: '600',
                }}>
                ${Overdue}
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
                  Unpaid
                </Text>
                <View
                  style={{
                    width: 10,
                    height: 30,
                    borderRadius: 10,
                    backgroundColor: 'hsl(0,0%,49%)',
                  }}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  color: 'hsl(0,0%,49%)',
                  letterSpacing: 1,
                  lineHeight: 30,
                  fontWeight: '600',
                  textAlign: 'right',
                }}>
                ${Unpaid}
              </Text>
            </View>
          </View>
          <Divider
            style={{
              width: '95%',
              height: 1,
              marginVertical: 10,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: 'hsl(0,0%,60%)',
              }}>
              Paid
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: 'hsl(0,0%,60%)',
              }}>
              $ {Overdue + Unpaid}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Report;
