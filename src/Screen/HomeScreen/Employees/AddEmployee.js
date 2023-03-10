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
import {useDispatch, useSelector} from 'react-redux';
import {setDoc, doc, collection} from 'firebase/firestore';
import {db, storage} from '../../../Firebase/firebase';
import DropDownSkill from './DropDownSkill';
import {addEmployee} from '../../../Redux/slices/dataSlice';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {resetSkill} from '../../../Redux/English_Level';
import {Picker} from '@react-native-picker/picker';
import {Checkbox} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getDownloadURL, ref, uploadString} from 'firebase/storage';
import {uuidv4} from '@firebase/util';
import AlertWarning from '../../Component/AlertWarning';

const AddEmployee = () => {
  const dispatch = useDispatch();
  const [picture, setPicture] = useState('');
  const [name, setName] = useState('');
  const [identification, setIdentification] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [nationality, setNationality] = useState('');
  const firstdayworking = moment(new Date()).format('DD/MM/YYYY');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const dataEmployee = useSelector(state => state.data_infor).data.employees;
  const english_level = useSelector(state => state.english_level);
  const [onModalCalendar, setOnModalCalendar] = useState(false);
  const [levelAccount, setLevelAccount] = useState(0);
  const onDateChange = date => {
    setDateBirth(moment(date).format('DD/MM/YYYY'));
    setOnModalCalendar(!onModalCalendar);
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
          if (item.uri !== null) {
            setPicture(item);
          }
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
          if (item.uri !== null) {
            setPicture(item);
          }
        });
    });
    setOnOptionC_L(!onOptionC_L);
  };

  const createId = number => {
    if (number < 10) return `E00000${number + 1}`;
    else if (number < 100) return `E0000${number + 1}`;
  };
  const AddImage = async () => {
    if (
      picture === '' ||
      name === '' ||
      identification === '' ||
      phoneNumber === '' ||
      dateBirth === '' ||
      email === '' ||
      address === '' ||
      nationality === '' ||
      position === '' ||
      salary === '' ||
      english_level.length === 0
    ) {
      setVisible(!visible);
      return;
    }

    const imageRef = ref(storage, `Employees/${name}`);
    if (typeof global.atob === 'undefined') {
      global.atob = a => Buffer.from(a, 'base64').toString('binary');
    }
    const Blob = global.Blob;
    delete global.Blob; // Blob must be undefined (setting it to null won't work)

    await uploadString(imageRef, picture.base64, 'base64', {
      contentType: picture.type,
    }).then(() => {
      getDownloadURL(imageRef)
        .then(url => {
          AddNewEmployee(url);
        })
        .then(() => {
          global.Blob = Blob;
        });
    });
  };
  const AddNewEmployee = async url => {
    const Id = createId(dataEmployee.length);
    const Data = {
      Address: address,
      Birthday: dateBirth,
      Date_Join: firstdayworking,
      Email: email,
      Employee_Id: Id,
      Employee_Image: url,
      Employee_Name: name,
      Gender: gender,
      Identification: identification,
      List_Skill_Id: english_level,
      Nationality: nationality,
      Phone: phoneNumber,
      Position: position,
      Salary: Number(salary),
    };
    await setDoc(doc(collection(db, 'Employee_Information'), Id), Data);
    dispatch(addEmployee(Data));

    const auth = getAuth();
    const password =
      'abcdef' + (Math.floor(Math.random() * 10000) + 1000).toString();
    createUserWithEmailAndPassword(auth, email, password);
    Alert.alert(
      'New Account has been added',
      `Email: ${email}\t Password:${password}`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
    );
    setName('');
    setIdentification('');
    setPhoneNumber('');
    setDateBirth('');
    setGender('');
    setEmail('');
    setAddress('');
    setNationality('');
    setPosition('');
    setSalary('');
    dispatch(resetSkill());
  };

  const Position = [
    'General Manager',
    'Deputy General Manager',
    'Rooms Division Manager',
    'Front Office Manager',
    'Chief Accountant',
    'Receptionist',
    'Reservation Agent',
    'Cashier',
    'Concierge',
    'Bell man',
    'Door man',
    'Housekeeper',
  ];
  const [visible, setVisible] = useState(false);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      showsVerticalScrollIndicator={false}>
      <AlertWarning
        visible={visible}
        setVisible={setVisible}
        header="Warning"
        body={'Input all of information above before adding'}
      />
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
              maxDate={new Date()}
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
              Cancel
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
            Add Employee
          </Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 30,
            }}>
            {picture === '' ? (
              <View
                style={{
                  width: 150,
                  height: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Ionicons
                  name="person-outline"
                  size={100}
                  color={'hsl(0,0%,73%)'}
                />
              </View>
            ) : (
              <Image
                source={{uri: picture.uri}}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'contain',
                  borderRadius: 100,
                }}
              />
            )}

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
          {/*Name */}
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
                borderRadius: 10,
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
          {/*Identification */}
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
                borderRadius: 10,
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
          {/*Phone */}
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
                borderRadius: 10,
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
          {/*Birthday */}
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
                borderRadius: 10,
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
              <Pressable onPress={() => setOnModalCalendar(!onModalCalendar)}>
                <AntDesign name="calendar" size={24} color="black" />
              </Pressable>
            </View>
          </View>

          {/*Gender */}
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
            <View
              style={{
                borderRadius: 10,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
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
                    borderRadius: 10,
                  }}
                />
              </Picker>
            </View>
          </View>

          {/*Email */}
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
                borderRadius: 10,
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
          {/*Address */}
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
                borderRadius: 10,
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
          {/*Nationality */}
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
                borderRadius: 10,
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
          {/*Position */}
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
              Position:
            </Text>
            {/* <TextInput
              value={position}
              onChangeText={setPosition}
              style={{
                borderRadius: 10,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Position"
              placeholderTextColor="hsl(0,0%,60%)"
            /> */}
            <View
              style={{
                borderRadius: 10,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
                paddingHorizontal: 10,
              }}>
              <Picker
                selectedValue={position}
                onValueChange={(itemValue, itemIndex) => setPosition(itemValue)}
                mode="dropdown">
                {Position.map((item, index) => (
                  <Picker.Item
                    label={item}
                    value={item}
                    style={{
                      color: 'black',
                      backgroundColor: 'hsl(222,56%,96%)',
                      borderRadius: 10,
                    }}
                  />
                ))}
              </Picker>
            </View>
          </View>
          {/*Salary */}
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
              Basic salary:
            </Text>
            <TextInput
              value={salary}
              onChangeText={setSalary}
              style={{
                borderRadius: 10,
                paddingHorizontal: 20,
                fontWeight: '600',
                backgroundColor: 'hsl(222,56%,96%)',
                height: 55,
                color: 'black',
              }}
              placeholder="Basic salary"
              placeholderTextColor="hsl(0,0%,60%)"
            />
          </View>
          {/*English Skill */}
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
              English Level:
            </Text>
            <DropDownSkill />
          </View>
          {/*Level Account */}
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
              level of account:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Checkbox
                  onPress={() => setLevelAccount(0)}
                  status={levelAccount === 0 ? 'checked' : 'unchecked'}
                  color="black"
                />
                <Text style={{fontSize: 18, color: 'black'}}>0</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Checkbox
                  onPress={() => setLevelAccount(1)}
                  status={levelAccount === 1 ? 'checked' : 'unchecked'}
                  color="black"
                />
                <Text style={{fontSize: 18, color: 'black'}}>1</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Checkbox
                  onPress={() => setLevelAccount(2)}
                  status={levelAccount === 2 ? 'checked' : 'unchecked'}
                  color="black"
                />
                <Text style={{fontSize: 18, color: 'black'}}>2</Text>
              </View>
            </View>
          </View>
          {/*Date join */}
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
          <TouchableOpacity
            onPress={AddImage}
            style={{
              marginBottom: 25,
            }}>
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
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddEmployee;
