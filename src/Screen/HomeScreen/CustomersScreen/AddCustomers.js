import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Modal,
  ToastAndroid,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CalendarPicker from 'react-native-calendar-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import {addDoc, collection, doc, setDoc} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
import {useDispatch, useSelector} from 'react-redux';
import {addCustomer} from '../../../Redux/slices/dataSlice';
import AlertWarning from '../../Component/AlertWarning';
import {Picker} from '@react-native-picker/picker';

const AddCustomers = () => {
  const Data = [
    {
      id: 1,
      title: 'Customer Name',
      value: name,
      setValue: setName,
    },
    {
      id: 2,
      title: 'Identification',
      value: identification,
      setValue: setIdentification,
    },
    {
      id: 3,
      title: 'Phone Number',
      value: phone_number,
      setValue: setPhone_number,
    },
    {
      id: 4,
      title: 'Birthday',
      value: date_of_birth,
      setValue: setDate_of_birth,
      icon: 1,
    },
  ];

  const dataCustomer = useSelector(state => state.data_infor).data.customers;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [date_of_birth, setDate_of_birth] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [gender, setGender] = useState('');
  const [identification, setIdentification] = useState('');
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const createId = number => {
    if (number < 10) return `C00000${number + 1}`;
    else if (number < 100) return `C0000${number + 1}`;
  };
  const AddNewCustomer = async () => {
    if (
      name === '' ||
      date_of_birth === '' ||
      phone_number === '' ||
      gender === '' ||
      identification === ''
    ) {
      setVisible(!visible);
      return;
    }
    const Id = createId(dataCustomer.length);

    const Data = {
      Customer_Id: Id,
      Customer_Name: name,
      Birthday: date_of_birth,
      Gender: gender,
      Identification: identification,
      Phone: phone_number,
      Status: 'New Customer',
    };
    await setDoc(doc(collection(db, 'Customer_Information'), Id), Data);

    dispatch(addCustomer(Data));
    setName('');
    setDate_of_birth('');
    setGender('');
    setPhone_number('');
    setIdentification('');
    ToastAndroid.show('Information customer has been added', 2000);
  };
  const [visible, setVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
      }}>
      <AlertWarning
        visible={visible}
        setVisible={setVisible}
        header={'Warning'}
        body={'Input all of information above before adding'}
      />
      <ScrollView
        style={{
          marginBottom: 20,
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}>
        <Modal
          visible={visibleCalendar}
          onRequestClose={() => {
            setVisibleCalendar(!visibleCalendar);
          }}>
          <View style={{flex: 1}}>
            <CalendarPicker
              onDateChange={date => {
                setDate_of_birth(moment(date).format('DD/MM/YYYY').toString()),
                  setVisibleCalendar(!visibleCalendar);
              }}
              maxDate={new Date()}
            />
          </View>
        </Modal>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              backgroundColor: 'hsl(145,67%,50%)',
            }}>
            <Ionicons name="md-person-sharp" size={24} color="white" />
          </View>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Add New Customer
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
            width: '95%',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          {Data.map((item, index) => {
            const animatedWidth = useRef(new Animated.Value(0)).current;
            let transitiontoWidth = animatedWidth.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.2],
              extrapolate: 'clamp',
            });

            const onFocus = () => {
              Animated.timing(animatedWidth, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
            };

            const onBlur = () => {
              Animated.timing(animatedWidth, {
                toValue: 0,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start();
            };
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                  }}>
                  {item.title}
                </Text>
                <Animated.View
                  style={{
                    backgroundColor: 'hsl(0,0%,95%)',
                    width: '50%',
                    transform: [{scaleX: transitiontoWidth}],
                    borderWidth: 1,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                  }}>
                  {item.title === 'Customer Name' ? (
                    <TextInput
                      value={name}
                      onChangeText={setName}
                      placeholder={item.title}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      style={{
                        width: '90%',
                        color: 'black',
                      }}
                      placeholderTextColor="hsl(0,0%,60%)"
                    />
                  ) : item.title === 'Identification' ? (
                    <TextInput
                      value={identification}
                      onChangeText={setIdentification}
                      placeholder={item.title}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      style={{
                        width: '90%',
                        color: 'black',
                      }}
                      placeholderTextColor="hsl(0,0%,60%)"
                    />
                  ) : item.title === 'Phone Number' ? (
                    <TextInput
                      value={phone_number}
                      onChangeText={setPhone_number}
                      placeholder={item.title}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      style={{
                        width: '90%',
                        color: 'black',
                      }}
                      placeholderTextColor="hsl(0,0%,60%)"
                    />
                  ) : item.title === 'Birthday' ? (
                    <TextInput
                      value={date_of_birth}
                      onChangeText={setDate_of_birth}
                      placeholder={item.title}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      style={{
                        width: '90%',
                        color: 'black',
                      }}
                      placeholderTextColor="hsl(0,0%,60%)"
                    />
                  ) : null}
                  {item.icon === 1 ? (
                    <Pressable
                      onPress={() => setVisibleCalendar(!visibleCalendar)}>
                      <FontAwesome
                        name="calendar"
                        size={20}
                        color={'hsl(0,0%,73%)'}
                      />
                    </Pressable>
                  ) : null}
                </Animated.View>
              </View>
            );
          })}
          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 16,

                marginBottom: 5,
                color: 'black',
              }}>
              Gender:
            </Text>
            <View
              style={{
                borderRadius: 10,
                fontWeight: '600',
                backgroundColor: 'hsl(0,0%,95%)',
                color: 'black',
                paddingHorizontal: 10,
                width: '48%',
                marginRight: 10,
                borderWidth: 1,
              }}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                mode="dropdown">
                <Picker.Item
                  label="Female"
                  value="Female"
                  style={{
                    color: 'black',
                    backgroundColor: 'hsl(0,0%,95%)',
                    fontSize: 16,
                  }}
                />
                <Picker.Item
                  label="Male"
                  value="Male"
                  style={{
                    color: 'black',
                    backgroundColor: 'hsl(0,0%,95%)',
                    borderRadius: 10,
                  }}
                />
              </Picker>
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={AddNewCustomer}
          style={{
            width: '80%',
            height: 40,
            marginBottom: 30,
            backgroundColor: '#FF8F6B',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: 'white',
              fontWeight: '600',
            }}>
            Add
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddCustomers;
