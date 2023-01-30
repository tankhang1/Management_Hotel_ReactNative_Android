import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownKind from './DropDownKind';
import DropDownFacility from './DropDownFacility';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import {db, storage} from '../../../Firebase/firebase';
import {uuidv4} from '@firebase/util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ref, getDownloadURL, uploadString} from 'firebase/storage';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import ModalAdd from './ModalAdd';
const AddNewRoom = () => {
  //Animation Kind Room lef
  const [listImage, setListImage] = useState([]);
  const [base64, setBase64] = useState('');
  const AddImage = async () => {
    const imageRef = ref(storage, `rooms/${base64.fileName}`);
    if (typeof global.atob === 'undefined') {
      global.atob = a => Buffer.from(a, 'base64').toString('binary');
    }
    const Blob = global.Blob;
    delete global.Blob; // Blob must be undefined (setting it to null won't work)

    await uploadString(imageRef, base64.base64, 'base64', {
      contentType: base64.type,
    }).then(() => {
      getDownloadURL(imageRef)
        .then(url => {
          AddRoom(url);
        })
        .then(() => {
          global.Blob = Blob;
        });
    });
  };
  // DataKindRoom
  const [open, setOpen] = useState(false);
  const [dataKind, setDataKind] = useState([]);
  const [dataFacility, setDataFacility] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function getDb() {
      onSnapshot(collection(db, 'KindRoom'), snapshot => {
        let kinds = [];
        snapshot.forEach(doc => {
          kinds.push({...doc.data()});
          console.log(doc.data());
        });
        setDataKind([...kinds]);
      });

      onSnapshot(collection(db, 'Facility'), snapshot => {
        let facilities = [];
        snapshot.forEach(doc => {
          facilities.push(doc.data());
        });
        setDataFacility([...facilities]);
      });
    }
    getDb();
  }, []);
  //DataFacility
  const [open_facility, setOpen_facility] = useState(false);
  const [value_facility, setValue_facility] = useState('');
  const [dataChip, setDataChip] = useState([]);
  // Value Kind Room
  const [kindRoom, setKindRoom] = useState('Single Room');
  const [roomCharge, setRoomCharge] = useState('');
  const [decribe, setDecribe] = useState('');

  //Picture room
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
            setBase64(item);
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
            setBase64(item);
          }
        });
    });
    setOnOptionC_L(!onOptionC_L);
  };

  //DeleteChip;
  const DeleteChip = item => {
    let tmp = dataChip.filter(value => {
      return value !== item;
    });
    setDataChip(tmp);
  };
  const AddRoom = async url => {
    const Id = uuidv4();
    const Room = {
      id: Id,
      image: url,
      kind: kindRoom,
      money: Number(roomCharge),
      no_room: 'R_' + Math.floor(Math.random() * 1000) + 96,
      rating: Math.floor(Math.random() * 5) + 1,
      decription: decribe,
      facility: dataChip,
      status: 1,
      dateTo: new Timestamp.fromDate(new Date('1975-12-01')),
      dateFrom: new Timestamp.fromDate(new Date('1975-12-01')),
    };
    await setDoc(doc(collection(db, 'DataRoom')), Room).then(() => {
      ToastAndroid.show('New Room has been added', 2000);
      setBase64('');
      setKindRoom('Single Room');
      setRoomCharge();
      setDataChip([]);
      setDecribe('');
    });
  };

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalAddKindRoom, setOpenModalAddKindRoom] = useState(false);
  const [kindModal, setKindModal] = useState(0);
  console.log(dataChip);
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      style={{
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
      }}
      extraScrollHeight={20}>
      <ModalAdd
        open={openModalAdd}
        setOpen={setOpenModalAdd}
        kind={kindModal}
      />

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
          {base64 === '' ? (
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
              source={{uri: base64.uri}}
              style={{
                width: '100%',
                height: 200,
                borderRadius: 16,
                marginBottom: 20,
              }}
            />
          )}
        </Pressable>

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
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
                value={kindRoom}
                setValue={setKindRoom}
                dataKind={dataKind}
                openModalAdd={openModalAdd}
                setOpenModalAdd={setOpenModalAdd}
                setKind={setKindModal}
              />
            </View>
          </View>

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
            marginBottom: 20,
          }}>
          <DropDownFacility
            open={open_facility}
            setOpen={setOpen_facility}
            value={value_facility}
            setValue={setValue_facility}
            dataKind={dataFacility}
            setChip={setDataChip}
            chip={dataChip}
            openModalAdd={openModalAdd}
            setOpenModalAdd={setOpenModalAdd}
            setKind={setKindModal}
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

        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontWeight: '600',
              marginBottom: 10,
            }}>
            Description
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

        <Pressable onPress={AddImage}>
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
    </KeyboardAwareScrollView>
  );
};

export default AddNewRoom;
