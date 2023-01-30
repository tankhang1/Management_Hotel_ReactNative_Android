import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
const ChangeProfile = () => {
  const dataEmployee = useSelector(state => state.data_infor).data
    .currentEmployee;
  const [picture, setPicture] = useState(dataEmployee.Employee_Image);
  const [name, setName] = useState(dataEmployee.Employee_Name);
  const [Employee_code, setEmployee_code] = useState(dataEmployee.Employee_Id);
  const [identification, setIdentification] = useState(
    dataEmployee.Identification,
  );
  const [dateBirth, setDateBirth] = useState(dataEmployee.Birthday);
  const [gender, setGender] = useState(dataEmployee.Gender);
  const [phoneNumber, setPhoneNumber] = useState(dataEmployee.Phone);
  const [email, setEmail] = useState(dataEmployee.Email);
  const [address, setAddress] = useState(dataEmployee.Address);
  const [nationality, setNationality] = useState(dataEmployee.Nationality);
  const firstdayworking = dataEmployee.Date_Join;
  const [onModalCalendar, setOnModalCalendar] = useState(false);
  const onDateChange = date => {
    setDateBirth(moment(date).format('DD/MM/YYYY'));
    setOnModalCalendar(!onModalCalendar);
  };

  const q = query(
    collection(db, 'Employee_Information'),
    where('Employee_Id', '==', dataEmployee.Employee_Id),
  );
  // let ID= getDocs(q).docs().id;
  const Change = async () => {
    const querySnapshot = await getDocs(q);
    let id;
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      id = doc.id;
    });
    let employee = doc(db, 'Employee_Information', id);
    await updateDoc(employee, {
      Address: address,
      Birthday: dateBirth,
      Date_Join: firstdayworking,
      Email: email,
      Employee_Id: Employee_code,
      Employee_Image: picture,
      Employee_Name: name,
      Gender: gender,
      Identification: identification,
      Nationality: nationality,
      Phone: phoneNumber,
    });
    ToastAndroid.show('Profile has been updated', ToastAndroid.LONG);
  };

  const [onOptionC_L, setOnOptionC_L] = useState(false);
  const onLunchCamera = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchCamera(options, response => {
      if (response.didCancel === true) Alert.alert('Camera is cancel');
      else
        response.assets.map(item => {
          if (item.uri !== null) setPicture(item.uri.toString());
        });
    });
    setOnOptionC_L(!onOptionC_L);
  };
  const onLunchLibary = () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel === true) Alert.alert('Camera is cancel');
      else
        response.assets.map(item => {
          if (item.uri !== null) setPicture(item.uri.toString());
        });
    });
    setOnOptionC_L(!onOptionC_L);
  };
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}>
      <Modal
        animationType="fade"
        visible={onModalCalendar}
        transparent
        statusBarTranslucent
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setOnModalCalendar(!onModalCalendar);
        }}>
        <Pressable
          onPress={() => setOnModalCalendar(!onModalCalendar)}
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
              onDateChange={date => onDateChange(date)}
            />
          </View>
        </Pressable>
      </Modal>
      <Modal
        visible={onOptionC_L}
        animationType="fade"
        onRequestClose={() => {
          setOnOptionC_L(!onOptionC_L);
        }}
        transparent
        statusBarTranslucent>
        <Pressable
          onPress={() => setOnOptionC_L(!onOptionC_L)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        />
        <View
          style={{
            width: '80%',

            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            alignSelf: 'center',

            borderRadius: 5,
            elevation: 5,
            position: 'absolute',
            top: 200,
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '600',
              marginVertical: 20,
            }}>
            Would you like access your libary or camera to collect image
          </Text>
          <TouchableOpacity
            onPress={onLunchCamera}
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              width: '100%',
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'hsl(0,0%,80%)',
            }}>
            <Text
              style={{
                color: 'hsl(224,75%,53%)',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Access Camera
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onLunchLibary}
            style={{
              borderBottomWidth: 1,
              width: '100%',
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: 'hsl(0,0%,80%)',
            }}>
            <Text
              style={{
                color: 'hsl(224,75%,53%)',
                fontSize: 16,
                fontWeight: '400',
              }}>
              Access Library
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setOnOptionC_L(!onOptionC_L);
            }}
            style={{
              width: '100%',
              paddingVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'hsl(224,75%,53%)',
                fontSize: 16,
                fontWeight: '400',
              }}>
              Deny
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <KeyboardAvoidingView>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '700',
            }}>
            Change Profile
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 30,
            }}>
            <Image
              source={{uri: picture}}
              style={{
                width: 150,
                height: 150,

                borderRadius: 100,
              }}
            />
            <Pressable onPress={() => setOnOptionC_L(!onOptionC_L)}>
              <View
                style={{
                  backgroundColor: 'hsl(224,75%,60%)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  width: 35,
                  height: 35,
                  position: 'absolute',
                  bottom: 5,
                  right: 0,
                }}>
                <Feather name="camera" size={20} color="white" />
              </View>
            </Pressable>
          </View>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Name:
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Name"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Employee code:
            </Text>
            <View
              style={{
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                paddingHorizontal: 20,
                borderRadius: 100,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '600',

                  color: 'black',
                }}>
                {Employee_code}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Identification:
            </Text>
            <TextInput
              value={identification}
              onChangeText={setIdentification}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Identification"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View>

          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Birthday:
            </Text>
            <View
              style={{
                backgroundColor: 'hsl(222,56%,96%)',
                borderRadius: 100,
                paddingHorizontal: 20,
                height: 55,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: 'black',
              }}>
              <TextInput
                value={dateBirth}
                onChangeText={setDateBirth}
                style={{
                  fontWeight: '600',
                  color: 'black',
                  width: '80%',
                }}
                placeholder="Birthday"
                placeholderTextColor="hsl(0,0%,60%)"
              />
              <TouchableOpacity
                onPress={() => setOnModalCalendar(!onModalCalendar)}>
                <AntDesign name="calendar" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          {/* <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Age:
            </Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Age"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View> */}
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Gender:
            </Text>
            {/* <TextInput
              value={gender}
              onChangeText={setGender}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Gender"
              placeholderTextColor="hsl(0,0%,60%)"
            /> */}
            <View
              style={{
                backgroundColor: 'hsl(222,56%,96%)',
                borderRadius: 20,
                paddingHorizontal: 10,
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
                    backgroundColor: 'hsl(222,56%,96%)',
                  }}
                />
                <Picker.Item
                  label="Male"
                  value="Male"
                  style={{
                    color: 'black',
                    backgroundColor: 'hsl(222,56%,96%)',
                  }}
                />
              </Picker>
            </View>
          </View>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Phone number:
            </Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Phone number"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Email:
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Email"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Address:
            </Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Address"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View>
          <View
            style={{
              width: '90%',
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                marginLeft: 20,
                marginBottom: 5,
                color: 'black',
              }}>
              Nationality:
            </Text>
            <TextInput
              value={nationality}
              onChangeText={setNationality}
              style={{
                borderRadius: 100,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Nationality"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: 'black',
              }}>
              Joined <Text style={{fontWeight: '700'}}>{firstdayworking}</Text>
            </Text>
          </View>
          <Pressable
            style={{
              marginBottom: 25,
            }}
            onPress={Change}>
            <View
              style={{
                width: 150,
                height: 50,
                marginBottom: 10,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'hsl(221,100%,80%)',
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  color: 'white',
                }}>
                Add
              </Text>
            </View>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ChangeProfile;
