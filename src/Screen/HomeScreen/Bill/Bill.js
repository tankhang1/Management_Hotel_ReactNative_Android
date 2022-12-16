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
import React from 'react';
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
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const Bill = ({navigation, route}) => {
  const [data, setData] = React.useState(route.params.bill);
  const dispatch = useDispatch();
  const InforBooking = useSelector(state => state.booking);
  const [name, setName] = useState(InforBooking.name);
  const [phone, setPhone] = useState(InforBooking.phone);
  const [passport, setPassport] = useState(InforBooking.passport);
  const onDelete = (index, Id) => {
    const tmp = [...data];
    tmp.splice(index, 1);
    setData(tmp);
    dispatch(
      deleteLike({
        id: Id,
      }),
    );
  };

  const [showDeleteJiggle, setShowDeleteJiggle] = React.useState(false);
  const [checkCustomer, setCheckCustomer] = useState(false);
  const [modalVisibleBirthday, setModalVisibleBirthday] = useState(false);
  const [gender, setGender] = useState('Male');
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        onLongPress={() => {
          setShowDeleteJiggle(!showDeleteJiggle);
        }}
        key={item.id}
        style={{
          width: '90%',
          alignSelf: 'center',
        }}>
        <JiggleDeleteView
          showDeleteJiggle={showDeleteJiggle}
          onDelete={() => {
            onDelete(index, item.id);
          }}>
          <View
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              source={{uri: item.image}}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'cover',
                borderRadius: 20,
              }}
            />
            <View
              style={{
                width: 130,
                height: 150,
                justifyContent: 'flex-start',
                alignItems: 'center',
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderRightWidth: 0.5,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: 'black',
                }}>
                {item.no_room}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: '100%',
                  marginLeft: 2,
                }}>
                {[0, 0, 0, 0, 0].map((Item, index) => {
                  if (index <= item.rating - 1)
                    return (
                      <Fontisto
                        key={index}
                        name="star"
                        size={10}
                        color="hsl(44,99%,50%)"
                        style={{
                          marginRight: 2,
                        }}
                      />
                    );
                  else if (index - item.rating + 1 <= 0.5)
                    return (
                      <Fontisto
                        key={index}
                        name="star-half"
                        size={10}
                        color="hsl(44,99%,50%)"
                        style={{
                          marginRight: 2,
                        }}
                      />
                    );
                  else return;
                })}
                <Text
                  style={{
                    fontSize: 18,
                    marginLeft: 2,
                    color: 'hsl(0,0%,60%)',
                  }}>
                  {item.rating}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Rent cost :{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'hsl(35,97%,55%)',
                  }}>
                  {item.money}$
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  position: 'absolute',
                  bottom: 0,
                  borderBottomRightRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'hsl(221,100%,64%)',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  View Detail
                </Text>
              </View>
            </View>
          </View>
        </JiggleDeleteView>
      </Pressable>
    );
  };
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [Birthday, setBirthday] = useState('');
  console.log(Birthday, gender);
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
            <Text>({data.length} Room)</Text>
          </View>
          {data.map((item, index) => {
            return renderItem({item});
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
