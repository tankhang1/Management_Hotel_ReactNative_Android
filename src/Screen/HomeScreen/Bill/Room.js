import {
  View,
  Text,
  ScrollView,
  Platform,
  Modal,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  LogBox,
} from 'react-native';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {addInfor} from '../../../Redux/InforBooking';
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Room = ({navigation}) => {
  LogBox.ignoreLogs([
    'Warning: Failed prop type: Invalid props.style key `resizeMode` supplied to `Text`.',
  ]);
  const dispatch = useDispatch();
  const [modalVisibleCheckIn, setModalVisibleCheckIn] = useState(false);
  const [modalVisibleCheckOut, setModalVisibleCheckOut] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateCheckIn, setDateCheckIn] = useState('');
  const [dateCheckOut, setDateCheckOut] = useState('');
  const [passport, setPassport] = useState('');
  const CheckIn = date => {
    setDateCheckIn(date);
    setModalVisibleCheckIn(!modalVisibleCheckIn);
  };
  const CheckOut = date => {
    setDateCheckOut(date);
    setModalVisibleCheckOut(!modalVisibleCheckOut);
  };
  const onConfirm = () => {
    if (
      dateCheckIn === '' ||
      dateCheckOut === '' ||
      name === '' ||
      phone === '' ||
      passport === ''
    )
      Alert.alert('Please complete the form!!!!!');
    else {
      setDateCheckIn('');
      setDateCheckOut('');
      setName('');
      setPhone('');
      setPassport('');

      dispatch(
        addInfor({
          name: name,
          date_check_in: dateCheckIn,
          date_check_out: dateCheckOut,
          phone: phone,
          passport: passport,
        }),
      );
      navigation.navigate('Booking');
    }
  };
  const [checkName, setCheckName] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkIden, setCheckIden] = useState(false);
  const validateInput = (text, kind) => {
    switch (kind) {
      case 1: {
        for (let i = 0; i < text.length; i++) {
          if (
            (text.charCodeAt(i) < 65 && text.charCodeAt(i) > 32) ||
            (text.charCodeAt(i) > 90 && text.charCodeAt(i) < 97) ||
            text.charCodeAt(i) > 122
          ) {
            setCheckName(true);
            return;
          }
        }
        setCheckName(false);
        return;
      }
      case 2: {
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) < 48 || text.charCodeAt(i) > 57) {
            setCheckNumber(true);
            return;
          }
        }
        setCheckNumber(false);
        return;
      }
      case 3: {
        for (let i = 0; i < text.length; i++) {
          if (text.charCodeAt(i) < 48 || text.charCodeAt(i) > 57) {
            setCheckIden(true);
            return;
          }
        }
        setCheckIden(false);
        return;
      }
      default:
        break;
    }
  };
  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingHorizontal: 10,
        }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 10,
          }}>
          <Text
            style={{
              fontSize: 30,
              fontWeight: '700',
              color: 'black',
              letterSpacing: 1,
            }}>
            Welcome to my hotel
          </Text>
          <Lottie
            source={{
              uri: 'https://assets9.lottiefiles.com/private_files/lf30_ttgwkuhd.json',
            }}
            style={{
              width: 50,
              height: 50,
            }}
            resizeMode="contain"
            autoPlay
            loop
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'hsl(0,0%,60%)',
            }}>
            Please enter your information in here!!!
          </Text>
          <Image
            source={require('../asset/important.png')}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: 'black',
          }}>
          Name{' '}
          {checkName ? (
            <Text style={{color: 'red', fontSize: 14}}>
              ( Name must character )
            </Text>
          ) : null}
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
            onBlur={() => {
              validateInput(name, 1);
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: 'black',
          }}>
          Phone Number{' '}
          {checkNumber ? (
            <Text style={{color: 'red', fontSize: 14}}>
              ( Phone must number1 )
            </Text>
          ) : null}
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
            onBlur={() => {
              validateInput(phone, 2);
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
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
        {/*Date Check In */}

        <Modal
          animationType="fade"
          visible={modalVisibleCheckIn}
          transparent
          statusBarTranslucent
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleCheckIn(!modalVisibleCheckIn);
          }}>
          <Pressable
            onPress={() => setModalVisibleCheckIn(!modalVisibleCheckIn)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '50%',
              }}>
              <CalendarPicker
                todayBackgroundColor="red"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={CheckIn}
                minDate={new Date()}
              />
            </View>
          </Pressable>
        </Modal>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: 'black',
          }}>
          Date Check In
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
            value={moment(dateCheckIn).format('DD/MM/YYYY')}
            onChangeText={setDateCheckIn}
            placeholder="Date Check In"
            style={{
              width: '80%',
              backgroundColor: 'transparent',
              borderWidth: 0,
              height: 50,
              color: 'black',
            }}
            placeholderTextColor="hsl(0,0%,60%)"
          />
          <Pressable
            onPress={() => setModalVisibleCheckIn(!modalVisibleCheckIn)}>
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
        {/*Date Check Out */}

        <Modal
          animationType="fade"
          visible={modalVisibleCheckOut}
          transparent
          statusBarTranslucent
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisibleCheckOut(!modalVisibleCheckOut);
          }}>
          <Pressable
            onPress={() => setModalVisibleCheckOut(!modalVisibleCheckOut)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height: '50%',
              }}>
              <CalendarPicker
                todayBackgroundColor="red"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
                onDateChange={CheckOut}
                minDate={new Date()}
              />
            </View>
          </Pressable>
        </Modal>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: 'black',
          }}>
          Date Check Out
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
            value={moment(dateCheckOut).format('DD/MM/YYYY')}
            onChangeText={setDateCheckOut}
            placeholder="Date Check Out"
            style={{
              width: '80%',
              backgroundColor: 'transparent',
              borderWidth: 0,
              height: 50,
              color: 'black',
            }}
            placeholderTextColor="hsl(0,0%,60%)"
          />
          <Pressable
            onPress={() => setModalVisibleCheckOut(!modalVisibleCheckOut)}>
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

        <TouchableOpacity onPress={onConfirm}>
          <View
            style={{
              alignSelf: 'center',
              width: 200,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#25A2CA',
              borderRadius: 20,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
              }}>
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default Room;
