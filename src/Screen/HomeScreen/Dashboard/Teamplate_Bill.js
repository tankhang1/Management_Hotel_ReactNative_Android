import {
  View,
  Text,
  Modal,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  Dimensions,
  Animated,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Checkbox, Divider} from 'react-native-paper';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
import {doc, Timestamp, updateDoc} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
import {async} from '@firebase/util';

const Template_Bill = ({
  visible,
  setVisible,
  Bill_Id,
  CheckOut,
  reservation,
  setReservation,
}) => {
  const dataBills = useSelector(state => state.list_bill);
  const dataRooms = useSelector(state => state.list_room).rooms;
  const dataCustomers = useSelector(state => state.data_infor).data.customers;
  const bill = dataBills.filter(value => value.Bill_Id === Bill_Id);
  const customer = dataCustomers.filter(
    value => value.Customer_Id === bill[0]?.Customer_Id,
  );

  const [data_Image, setData_Image] = useState([]);
  useEffect(() => {
    let tmp = [];
    for (let i = 0; i < bill[0].List_Room_Id.length; i++) {
      for (let j = 0; j < dataRooms?.length; j++) {
        if (bill[0].List_Room_Id[i] === dataRooms[j].id) {
          tmp.push(dataRooms[j]);
          break;
        }
      }
    }
    setData_Image(tmp);
  }, []);
  const {width, height} = Dimensions.get('screen');
  const Dot_Line = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: color_,
            position: 'relative',
            left: -15,
            zIndex: 999,
          }}
        />
        {[...Array(6)].map((item, index) => {
          return (
            <View
              key={index}
              style={{
                height: 2,
                backgroundColor: color_,
                width: 15,
                borderRadius: 100,
              }}
            />
          );
        })}
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: color_,
            position: 'relative',
            right: -15,
            zIndex: 999,
          }}
        />
      </View>
    );
  };
  const Dot = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: color_,
            position: 'relative',
            left: -15,
            zIndex: 999,
          }}
        />
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: color_,
            position: 'relative',
            right: -15,
            zIndex: 999,
          }}
        />
      </View>
    );
  };
  const TotalMoneyRoom = () => {
    let sum = 0;
    for (let i = 0; i < bill[0].List_Room_Id.length; i++) {
      for (let j = 0; j < dataRooms.length; j++) {
        if (dataRooms[j].id === bill[0].List_Room_Id[i]) {
          sum += dataRooms[j].money;
          break;
        }
      }
    }
    return sum;
  };
  const onCheck = async () => {
    if (CheckOut === true) {
      const updateBill = doc(db, 'Bill_List', Bill_Id);
      await updateDoc(updateBill, {
        Status: 1,
        Date_Check_Out: new Timestamp.fromDate(new Date()),
        Total_Money:
          Math.ceil(
            (new Date() -
              new Date(
                `${bill[0].Date_Check_In.slice(
                  6,
                  10,
                )}-${bill[0].Date_Check_In.slice(
                  3,
                  5,
                )}-${bill[0].Date_Check_In.slice(0, 2)}`,
              )) /
              (1000 * 60 * 60 * 24),
          ) * TotalMoneyRoom(),
      });
      Alert.alert('Bill has check out success');
      let tmp = {...reservation};
      tmp.CheckedOut++;
      setReservation({...tmp});
      setVisible(!visible);
    } else {
      setShowForm(!showForm);
    }
  };
  const [adult, setAdult] = useState('');
  const [children, setChildren] = useState('');
  const [checkForeign, setCheckForeign] = useState(false);
  const SumMoney = () => {
    let sum = 0;
    data_Image.forEach(element => {
      sum += Number(element.money);
    });
    return sum;
  };
  const Confirm = async () => {
    const updateBill = doc(db, 'Bill_List', Bill_Id);
    await updateDoc(updateBill, {
      CheckIn: 1,
      Adults: Number(adult),
      Children: Number(children),
      Foreign: checkForeign ? 1 : 0,
      Date_Check_In: new Timestamp.fromDate(new Date()),
    });
    Alert.alert('Bill has check in success');
    let tmp = {...reservation};
    tmp.CheckedIn++;
    setReservation({...tmp});
    setShowForm(!showForm);
    setVisible(!visible);
  };
  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  let color_ = 'hsl(220,61%,80%)';
  const [showForm, setShowForm] = useState(false);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        setVisible(!visible);
      }}
      statusBarTranslucent>
      <Modal
        visible={showForm}
        onRequestClose={() => setShowForm(!showForm)}
        transparent
        statusBarTranslucent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              height: 300,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'hsl(0,0%,50%)',
                }}>
                Number of Adults:
              </Text>
              <TextInput
                value={adult}
                onChangeText={setAdult}
                placeholder="Number"
                style={{
                  color: 'black',
                  fontSize: 18,
                }}
                keyboardType="number-pad"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'hsl(0,0%,50%)',
                }}>
                Number of Children:
              </Text>
              <TextInput
                value={children}
                onChangeText={setChildren}
                placeholder="Number"
                style={{
                  color: 'black',
                  fontSize: 18,
                }}
                keyboardType="number-pad"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                }}>
                Are you a foreigner?
              </Text>
              <Checkbox
                color="black"
                onPress={() => {
                  setCheckForeign(!checkForeign);
                }}
                status={checkForeign ? 'checked' : 'unchecked'}
              />
            </View>
            <TouchableOpacity
              onPress={Confirm}
              style={{
                width: 150,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'hsl(224,75%,53%)',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: color_,
        }}>
        <View
          style={{
            width: '95%',
            backgroundColor: 'white',
            alignSelf: 'center',
            borderRadius: 10,
            paddingBottom: 30,
            marginTop: StatusBar.currentHeight,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../asset/Logo_CHKM.png')}
                style={{
                  resizeMode: 'contain',
                  width: 70,
                  height: 100,
                }}
              />
              <View
                style={{
                  paddingLeft: 10,
                }}>
                <Text
                  style={{
                    color: 'hsl(229,100%,29%)',
                    fontWeight: '700',
                    letterSpacing: 1,
                    fontSize: 20,
                  }}>
                  CHKM Hotel
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    color: 'hsl(0,0%,73%)',
                  }}>
                  69 NVL, KP5 , PPLam
                </Text>
              </View>
            </View>
            <MaterialCommunityIcons
              name="image-filter-center-focus-weak"
              size={24}
              color="hsl(224,75%,53%)"
            />
          </View>
          <Dot />
          <View>
            <ScrollView
              style={{
                marginTop: -15,
                marginBottom: -15,
              }}
              snapToAlignment={'center'}
              snapToInterval={width}
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
              )}>
              {data_Image.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{uri: item.image}}
                    style={{
                      width: width,
                      height: 200,
                      resizeMode: 'cover',
                    }}
                  />
                );
              })}
            </ScrollView>
          </View>
          <Dot />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: -30,
            }}>
            {data_Image.map((item, index) => {
              let opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0.2, 1, 0.2],
                extrapolate: 'clamp',
              });
              let tranWidth = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [10, 40, 10],
                extrapolate: 'clamp',
              });

              return (
                <Animated.View
                  key={index}
                  style={{
                    width: tranWidth,
                    height: 10,
                    backgroundColor: 'white',
                    opacity,
                    marginHorizontal: 10,
                    borderRadius: 100,
                  }}></Animated.View>
              );
            })}
          </View>
          <View
            style={{
              marginTop: 30,
            }}>
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: 'black',
                }}>
                Information Customer
              </Text>
              <View
                style={{
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    Name:
                  </Text>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    {customer.length === 0
                      ? 'anonymous'
                      : customer[0].Customer_Name}
                  </Text>
                </View>
                <Divider />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    Passport / Identification:
                  </Text>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    {' '}
                    {customer.length === 0
                      ? 'anonymous'
                      : customer[0].Identification}
                  </Text>
                </View>
                <Divider />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    Phone:
                  </Text>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    {bill[0]?.Phone_Number}
                  </Text>
                </View>

                <Divider />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    Date check in:
                  </Text>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    {bill[0]?.Date_Check_In}
                  </Text>
                </View>
                <Divider />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 5,
                  }}>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    Date check out:
                  </Text>
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    {bill[0]?.Date_Check_Out}
                  </Text>
                </View>
              </View>
            </View>
            <Dot_Line />
            <View
              style={{
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                  }}>
                  Bill No:
                </Text>
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                  }}>
                  {bill[0]?.Bill_Id}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                  }}>
                  Date:
                </Text>
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                  }}>
                  {moment(new Date()).format('DD/MM/YYYY')}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginVertical: 5,
                }}>
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                  }}>
                  Paid by:
                </Text>
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                  }}>
                  {customer.length === 0
                    ? 'anonymous'
                    : customer[0].Customer_Name}
                </Text>
              </View>
            </View>
            <Dot_Line />
            <View
              style={{
                paddingHorizontal: 20,
              }}>
              {data_Image.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginVertical: 5,
                    }}>
                    <Text
                      style={{
                        color: 'hsl(0,0%,60%)',
                      }}>
                      {index + 1}. {item.no_room}
                    </Text>
                    <Text
                      style={{
                        color: 'hsl(0,0%,60%)',
                      }}>
                      ${item.money}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
              }}>
              {[...Array(15)].map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: 10,
                      height: 2,
                      borderRadius: 10,
                      backgroundColor: 'hsl(0,0%,73%)',
                      marginVertical: 10,
                    }}
                  />
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  color: 'hsl(0,0%,60%)',
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                Grand Total:
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  fontSize: 20,
                }}>
                ${SumMoney()}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={{
              width: '45%',
              height: 50,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                letterSpacing: 1,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onCheck}
            // disabled={() => {
            //   if (CheckOut === true) {
            //     if (bill[0]?.Status === 0) {
            //       return false;
            //     }
            //     return true;
            //   } else {
            //     if (bill[0]?.CheckIn === 0) {
            //       return false;
            //     }
            //     return true;
            //   }
            // }}
            style={{
              width: '45%',
              height: 50,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                letterSpacing: 1,
              }}>
              {CheckOut === true ? 'Check out' : 'Check in'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default Template_Bill;
