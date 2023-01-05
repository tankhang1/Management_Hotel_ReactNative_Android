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
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider} from 'react-native-paper';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {addCustomer} from '../../../Redux/slices/dataSlice';
import {collection, doc, setDoc, Timestamp} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
import {uuidv4} from '@firebase/util';
import {setLike} from '../../../Redux/ListLikeRoom';
import {useNavigation} from '@react-navigation/native';
import {addBill} from '../../../Redux/slices/dataBills';
const Template_Bill = ({
  visible,
  setVisible,
  Data_Image,
  Infor_Customer,
  checkCustomer,
  Birthday,
  Gender,
}) => {
  useEffect(() => {
    let tmp = [];
    Data_Image.map((item, index) => {
      item.value.map((Item, Index) => {
        tmp.push(Item);
      });
    });
    setData([...tmp]);
  }, [Data_Image]);
  const bill_Id = uuidv4();
  const currentEmployee = useSelector(state => state.data_infor).data
    .currentEmployee;
  const [data, setData] = useState([]);
  const navigation = useNavigation();
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

  const SumMoney = () => {
    let sum = 0;
    data.forEach(element => {
      sum += Number(element.money);
    });
    return sum;
  };
  const List_Room_Id = () => {
    let tmp = [];
    data.map((item, index) => {
      tmp.push(item.id.toString());
    });
    return tmp;
  };
  const createId = number => {
    if (number < 10) return `C00000${number + 1}`;
    else if (number < 100) return `C0000${number + 1}`;
  };
  const dataCustomer = useSelector(state => state.data_infor).data.customers;

  const dispatch = useDispatch();
  const AddNewCustomer = async () => {
    const cusomter_Id = createId(dataCustomer.length);
    const DataCustomer = {
      Customer_Id: cusomter_Id,
      Customer_Name: Infor_Customer.name,
      Birthday: Birthday,
      Gender: Gender,
      Identification: Infor_Customer.passport,
      Phone: Infor_Customer.phone,
      Status: 'New Customer',
      Date: new Timestamp.fromDate(new Date()),
      Phone_Number: Infor_Customer.phone,
    };
    const Data = {
      Bill_Id: bill_Id,
      Customer_Id: cusomter_Id,
      Date_Check_In: new Timestamp.fromDate(
        new Date(Infor_Customer.date_check_in),
      ),
      Date_Check_Out: new Timestamp.fromDate(
        new Date(Infor_Customer.date_check_out),
      ),
      Employee_Id: currentEmployee.Employee_Id,
      List_Room_Id: List_Room_Id(),
      Total_Money: SumMoney(),
      Date: new Timestamp.fromDate(new Date()),
      Phone_Number: Infor_Customer.phone,
      Status: 0,
      CheckIn: 0,
    };
    dispatch(addCustomer(DataCustomer));
    await setDoc(
      doc(collection(db, 'Customer_Information'), cusomter_Id),
      DataCustomer,
    );
    await setDoc(doc(collection(db, 'Bill_List'), bill_Id), Data);
    Alert.alert('Noticable', 'You has book success');
  };

  const NoAddCustomer = async () => {
    const Data = {
      Bill_Id: bill_Id,
      Customer_Id: cusomter_Id,
      Date_Check_In: new Timestamp.fromDate(
        new Date(Infor_Customer.date_check_in),
      ),
      Date_Check_Out: new Timestamp.fromDate(
        new Date(Infor_Customer.date_check_out),
      ),
      Employee_Id: currentEmployee.Employee_Id,
      List_Room_Id: List_Room_Id(),
      Total_Money: SumMoney(),
      Date: new Timestamp.fromDate(new Date()),
      Phone_Number: Infor_Customer.phone,
      Status: 0,
      CheckIn: 0,
    };
    await setDoc(doc(collection(db, 'Bill_List'), bill_Id), Data);
    Alert.alert('Noticable', 'You has book success');
  };
  const AddNewBill = () => {
    if (checkCustomer === true) {
      AddNewCustomer();
    } else {
      NoAddCustomer();
    }
    //dispatch(setLike());
    //navigation.navigate('Room');
  };

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  let color_ = 'hsl(220,61%,80%)';
  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={() => {
        setVisible(!visible);
      }}
      statusBarTranslucent>
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
              {data.map((item, index) => {
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
            {data.map((item, index) => {
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
                    {Infor_Customer.name}
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
                    {Infor_Customer.passport}
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
                    {Infor_Customer.phone}
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
                    {moment(Infor_Customer.date_check_in).format('DD/MM/YYYY')}
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
                    {moment(Infor_Customer.date_check_out).format('DD/MM/YYYY')}
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
                  {bill_Id}
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
                  {Infor_Customer.name}
                </Text>
              </View>
            </View>
            <Dot_Line />
            <View
              style={{
                paddingHorizontal: 20,
              }}>
              {data.map((item, index) => {
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
            width: '80%',
            alignSelf: 'center',
            marginVertical: 10,
            justifyContent: 'space-between',
          }}>
          <Pressable
            onPress={() => setVisible(!visible)}
            style={{
              width: '45%',
              height: 50,
              backgroundColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                letterSpacing: 1,
              }}>
              Cancel
            </Text>
          </Pressable>
          <Pressable
            onPress={AddNewBill}
            style={{
              width: '45%',
              height: 50,
              backgroundColor: 'hsl(44,99%,50%)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Text
              style={{
                color: 'hsl(229,100%,10%)',
                fontWeight: '700',
                letterSpacing: 1,
              }}>
              Accept
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default Template_Bill;
