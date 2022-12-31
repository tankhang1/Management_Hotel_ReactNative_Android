import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import JiggleDeleteView from 'react-native-jiggle-delete-view';
import {Checkbox, Divider} from 'react-native-paper';
import {deleteLike} from '../../../Redux/ListLikeRoom';
import {useState} from 'react';
import Template_Bill from './Template_Bill';
import {addInfor} from '../../../Redux/InforBooking';
import CalendarPicker from 'react-native-calendar-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';
import Feather from 'react-native-vector-icons/Feather';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const Bill = ({navigation, route}) => {
  const [data, setData] = React.useState(route.params.bill);
  const rooms = useSelector(state => state.data_infor).data.rooms;
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      let x = [];
      data.map((item, index) => {
        let position = x.map(e => e.key).indexOf(item.kind);
        if (position === -1) {
          x.push({key: item.kind, value: [item], quantity: 1});
        } else {
          x[position].value.push(item), x[position].quantity++;
        }
      });
      setGroupByData([...x]);

      let y = [];
      rooms.map((item, index) => {
        let position = y.map(e => e.key).indexOf(item.kind);
        if (position === -1) {
          y.push({key: item.kind, quantity: 1});
        } else {
          y[position].quantity++;
        }
      });
      setGroupByMaxRoom([...y]);
    });
    return subscribe;
  }, [navigation]);

  const [groupByData, setGroupByData] = useState([]);

  const [groupByMaxRoom, setGroupByMaxRoom] = useState([]);
  console.log(groupByMaxRoom);
  const dispatch = useDispatch();
  const InforBooking = useSelector(state => state.booking);
  const [name, setName] = useState(InforBooking.name);
  const [phone, setPhone] = useState(InforBooking.phone);
  const [passport, setPassport] = useState(InforBooking.passport);

  const [checkCustomer, setCheckCustomer] = useState(false);
  const [modalVisibleBirthday, setModalVisibleBirthday] = useState(false);
  const [gender, setGender] = useState('Male');

  const [visibleModal, setVisibleModal] = React.useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [Birthday, setBirthday] = useState('');
  const onPlus = index => {
    if (groupByData[index].quantity < groupByMaxRoom[index].quantity) {
      let tmp = [...groupByData];
      tmp[index].quantity++;
      setGroupByData([...tmp]);
    }
  };
  const onMinus = index => {
    if (groupByData[index].quantity > 1) {
      let tmp = [...groupByData];
      tmp[index].quantity--;
      setGroupByData([...tmp]);
    }
  };
  const onDeleteRoom = index => {
    groupByData[index].value.map((item, index) => {
      dispatch(
        deleteLike({
          id: item.id,
        }),
      );
    });
    let tmp = [...groupByData];
    tmp.splice(index, 1);
    setGroupByData([...tmp]);
  };
  useEffect(() => {
    let sum = 0;
    groupByData.map((item, index) => {
      sum += item.quantity;
    });
    setSumRoom(sum);
  }, [groupByData]);
  const [sumRoom, setSumRoom] = useState(0);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Modal
        visible={changeModal}
        onRequestClose={() => {
          setChangeModal(!changeModal);
        }}
        statusBarTranslucent
        transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(186,186,186,0.5)',
          }}>
          <Pressable
            style={{
              flex: 1,
            }}
            onPress={() => setChangeModal(!changeModal)}
          />
          <KeyboardAvoidingView behavior={'position'}>
            <View
              style={{
                backgroundColor: 'white',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                padding: 20,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: 'black',
                }}>
                Name
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Name"
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    height: 50,
                    color: 'black',
                  }}
                  placeholderTextColor="hsl(0,0%,60%)"
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: 'black',
                }}>
                Phone Number
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone"
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    height: 50,
                    color: 'black',
                  }}
                  placeholderTextColor="hsl(0,0%,60%)"
                />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: 'black',
                }}>
                Passport/Identification
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}>
                <TextInput
                  value={passport}
                  onChangeText={setPassport}
                  placeholder="Passport"
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    height: 50,
                    color: 'black',
                  }}
                  placeholderTextColor="hsl(0,0%,60%)"
                />
              </View>
              <Pressable
                onPress={() => {
                  dispatch(
                    addInfor({
                      name: name,
                      date_check_in: InforBooking.date_check_in,
                      date_check_out: InforBooking.date_check_out,
                      phone: phone,
                      passport: passport,
                    }),
                  ),
                    setChangeModal(!changeModal);
                }}
                style={{
                  width: '60%',
                  paddingVertical: 20,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'hsl(220,61%,30%)',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                    fontWeight: '600',
                  }}>
                  Change
                </Text>
              </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      <Template_Bill
        visible={visibleModal}
        setVisible={setVisibleModal}
        Data_Image={data}
        Infor_Customer={InforBooking}
        checkCustomer={checkCustomer}
        Birthday={Birthday}
        Gender={gender}
      />
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingTop: 10,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Pressable onPress={() => navigation.navigate('Booking')}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'hsl(0,0%,80%)',
              }}>
              <Entypo name="arrow-bold-left" size={24} />
            </View>
          </Pressable>
          <Text
            style={{
              fontSize: 24,
              letterSpacing: 1,
              color: 'black',
              fontWeight: '700',
            }}>
            Checkout
          </Text>
        </View>
        <Pressable onLongPress={() => setShowDeleteJiggle(false)}>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                letterSpacing: 1,
              }}>
              List room have choosed
            </Text>
            <Text>({sumRoom} Room)</Text>
          </View>

          {groupByData.map((item, index) => {
            return (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  height: 30,
                }}>
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                    fontSize: 16,
                  }}>
                  {item.key} x {item.quantity}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    borderColor: 'hsl(0,0%,73%)',
                  }}>
                  <Pressable
                    onPress={() => {
                      onMinus(index);
                    }}>
                    <Entypo name="minus" size={16} color="hsl(0,0%,50%)" />
                  </Pressable>
                  <Text
                    style={{
                      color: 'hsl(0,0%,50%)',
                      fontSize: 14,
                      marginHorizontal: 10,
                    }}>
                    {item.quantity}
                  </Text>
                  <Pressable
                    onPress={() => {
                      onPlus(index);
                    }}>
                    <Entypo name="plus" size={16} color="hsl(0,0%,50%)" />
                  </Pressable>
                </View>
                <Pressable onPress={() => onDeleteRoom(index)}>
                  <Feather name="trash" size={16} color="black" />
                </Pressable>
                <Feather name="chevrons-left" size={24} color="black" />
              </View>
            );
          })}
        </Pressable>

        <View
          style={{
            //flex:1,
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                letterSpacing: 1,
              }}>
              Information Customer:
            </Text>
            <Pressable onPress={() => setChangeModal(!changeModal)}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 12,
                }}>
                change
              </Text>
            </Pressable>
          </View>
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
                {InforBooking.name}
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
                {InforBooking.passport}
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
                {InforBooking.phone}
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
                {InforBooking.date_check_in}
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
                {InforBooking.date_check_out}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
              }}>
              Do you want turn into my customers
            </Text>
            <Checkbox
              status={checkCustomer === true ? 'checked' : 'unchecked'}
              onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.spring),
                  setCheckCustomer(!checkCustomer);
              }}
            />
          </View>
          {checkCustomer === true ? (
            <View>
              <Modal
                visible={modalVisibleBirthday}
                transparent
                statusBarTranslucent
                onRequestClose={() =>
                  setModalVisibleBirthday(!modalVisibleBirthday)
                }>
                <View
                  style={{
                    flex: 1,
                    backgroundColor: 'rgba(186,186,186,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'white',
                      paddingVertical: 10,
                    }}>
                    <CalendarPicker
                      onDateChange={START_DATE => {
                        setBirthday(moment(START_DATE).format('DD/MM/YYYY')),
                          setModalVisibleBirthday(!modalVisibleBirthday);
                      }}
                    />
                  </View>
                </View>
              </Modal>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: 'black',
                }}>
                Birthday
              </Text>
              <View
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginVertical: 10,
                }}>
                <TextInput
                  value={Birthday}
                  onChangeText={setBirthday}
                  placeholder="Birthday"
                  style={{
                    width: '80%',
                    backgroundColor: 'transparent',
                    borderWidth: 0,
                    height: 40,
                    color: 'black',
                  }}
                  placeholderTextColor="hsl(0,0%,60%)"
                />
                <Pressable
                  onPress={() =>
                    setModalVisibleBirthday(!modalVisibleBirthday)
                  }>
                  <AntDesign
                    name="calendar"
                    style={{
                      resizeMode: 'contain',
                    }}
                    color="black"
                    size={24}
                  />
                </Pressable>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: 'black',
                }}>
                Gender
              </Text>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Male" value="Male" />
              </Picker>
            </View>
          ) : null}
          <Pressable onPress={() => setVisibleModal(!visibleModal)}>
            <View
              style={{
                width: 200,
                height: 50,
                marginBottom: 20,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                backgroundColor: '#25A2CA',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                }}>
                Check out
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default Bill;
