import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Animated,
  Modal,
  KeyboardAvoidingView,
  Easing,
  TouchableOpacity,
  ScrollView,
  AccessibilityInfo,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownKind from './DropDownKind';
import DropDownFacility from './DropDownFacility';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {addListener} from 'npm';
import {useDispatch, useSelector} from 'react-redux';
import {collection, doc, setDoc} from 'firebase/firestore';
import {db} from '../../../Firebase/firebase';
import {addRoom} from '../../../Redux/slices/dataSlice';

const AddNewRoom = () => {
  //Animation Kind Room lef

  const Rooms = useSelector(state => state.data_infor).data.rooms;
  //DataKindRoom
  const [open, setOpen] = useState(false);
  const dataKind = ['One Room', 'Twin Room', 'King Room'];
  const [value, setValue] = useState('');
  //DataFacility
  const [open_facility, setOpen_facility] = useState(false);
  const dataFacility = [
    'Service',
    'Wifi',
    'Receptionist',
    'Airconditioning',
    'Breakfast',
  ];
  const [value_facility, setValue_facility] = useState('');
  const [dataChip, setDataChip] = useState([]);
  const [indexD, setIndexD] = useState();
  //Value Kind Room
  const [kindRoom, setKindRoom] = useState('one-bed');
  const [roomCharge, setRoomCharge] = useState('');
  const [decribe, setDecribe] = useState('');
  const [isService, setIsService] = useState(false);
  const [isWifi, setIsWifi] = useState(false);
  const [isReceptionist, setIsReceptionist] = useState(false);
  const [isAirconditioning, setIsAirconditioning] = useState(false);
  const [isBreakfast, setIsBreakfast] = useState(false);

  //Picture room
  const [picture, setPicture] = useState('');
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
  //DeleteChip
  const DeleteChip = item => {
    let tmp = dataChip.filter(value => {
      return value !== item;
    });
    setDataChip(tmp);
  };
  const dispatch = useDispatch();
  const AddRoom = async () => {
    const Room = {
      id: Rooms.length + 1,
      image: picture,
      kind: kindRoom,
      money: roomCharge,
      no_rom: 'N_' + Math.floor(Math.random() * 1000) + 1,
      rating: Math.floor(Math.random() * 5) + 1,
      airconditioning: dataChip.indexOf('Airconditioning') === -1 ? 0 : 1,
      breakfast: dataChip.indexOf('Breakfast') === -1 ? 0 : 1,
      decribe: decribe,
      receptionist: dataChip.indexOf('Receptionist') === -1 ? 0 : 1,
      service: dataChip.indexOf('Service') === -1 ? 0 : 1,
      wifi: dataChip.indexOf('Wifi') === -1 ? 0 : 1,
    };
    await setDoc(doc(collection(db, 'DataRoom')), Room);
    dispatch(addRoom(Room));
    Alert.alert('Notice', 'New Room has been added');
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={-200}
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '700',
                marginBottom: 20,
              }}>
              Add New Room
            </Text>

            <Pressable onPress={() => setOnOptionC_L(!onOptionC_L)}>
              {picture === '' ? (
                <View
                  style={{
                    width: '100%',
                    height: 200,
                    borderWidth: 1,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={require('../asset/upload.png')}
                    style={{
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={{
                      color: 'hsl(0,0%,60%)',
                    }}>
                    Upload image room
                  </Text>
                </View>
              ) : (
                <Image
                  source={{uri: picture}}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 16,
                    marginBottom: 20,
                  }}
                />
              )}
            </Pressable>
            {/*Kind room and room charge */}
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 20,
              }}>
              {/*Kind Room */}
              <View
                style={{
                  width: '45%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: '700',
                    marginBottom: 5,
                  }}>
                  Kind room
                </Text>

                <View>
                  <DropDownKind
                    width={150}
                    open={open}
                    setOpen={setOpen}
                    value={value}
                    setValue={setValue}
                    dataKind={dataKind}
                  />
                </View>
              </View>

              {/*Money Rent*/}
              <View
                style={{
                  width: '45%',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'black',
                    fontWeight: '700',
                    marginBottom: 5,
                  }}>
                  Room charge
                </Text>
                <TextInput
                  value={roomCharge}
                  onChangeText={setRoomCharge}
                  placeholder="How much ?"
                  style={{
                    width: '100%',
                    borderWidth: 1,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    color: 'black',
                  }}
                  placeholderTextColor="hsl(0,0%,60%)"
                />
              </View>
            </View>

            {/*choose facility*/}
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 10,
              }}>
              Choose material facilities
            </Text>
            <View
              style={{
                marginBottom: 60,
              }}>
              <DropDownFacility
                open={open_facility}
                setOpen={setOpen_facility}
                value={value_facility}
                setValue={setValue_facility}
                dataKind={dataFacility}
                setChip={setDataChip}
                chip={dataChip}
              />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dataChip.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => DeleteChip(item)}
                    key={index}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      marginHorizontal: 10,
                      borderRadius: 10,
                      backgroundColor: 'hsl(0,0%,73%)',
                    }}>
                    <Text
                      style={{
                        color: 'black',
                      }}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
            {/*Decribe */}
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '600',
                  marginBottom: 10,
                }}>
                Decribe
              </Text>
              <TextInput
                value={decribe}
                onChangeText={setDecribe}
                placeholder="Decribe about your room"
                style={{
                  width: '100%',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderRadius: 10,
                  color: 'black',
                }}
                allowFontScaling={true}
                autoCapitalize={'sentences'}
                multiline
                placeholderTextColor="hsl(0,0%,60%)"
              />
            </View>

            <Pressable onPress={AddRoom}>
              <View
                style={{
                  width: 150,
                  height: 50,
                  marginBottom: 10,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'hsl(221,100%,80%)',
                  alignSelf: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  Add new room
                </Text>
              </View>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddNewRoom;
