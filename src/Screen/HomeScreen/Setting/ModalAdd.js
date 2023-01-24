import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {addDoc, collection} from 'firebase/firestore';
import {cloneElement} from 'react';
import {db} from '../../../Firebase/firebase';

const ModalAdd = ({open, setOpen, kind}) => {
  const [typeRoom, setTypeRoom] = useState('');
  const [typeFacility, setTypeFacility] = useState('');
  const [image, setImage] = useState('');
  const actionAdd = async () => {
    if (kind === 0) {
      await addDoc(collection(db, 'KindRoom'), {Name: typeRoom});
    } else {
      await addDoc(collection(db, 'Facility'), {
        Name: typeFacility,
        Image: image,
      });
    }
    ToastAndroid.show(
      `Add ${kind === 0 ? 'kind room' : 'kind facility'} success`,
    );
    setOpen(!open);
  };
  return (
    <Modal
      visible={open}
      onRequestClose={() => {
        setOpen(!open);
      }}
      transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(186,186,186,0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',

            backgroundColor: 'white',
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          {kind === 0 ? (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                }}>
                What kind of room you want to add ?
              </Text>
              <TextInput
                value={typeRoom}
                onChangeText={setTypeRoom}
                style={{
                  fontSize: 16,
                  color: 'black',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  borderColor: 'hsl(0,0%,73%)',
                }}
                placeholder="kind room"
              />
              <Pressable
                onPress={actionAdd}
                style={{
                  backgroundColor: 'hsl(221,100%,80%)',
                  width: 150,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  Add
                </Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: 'black',
                }}>
                What kind of facilities you want to add ?
              </Text>
              <TextInput
                value={typeFacility}
                onChangeText={setTypeFacility}
                style={{
                  fontSize: 16,
                  color: 'black',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  borderColor: 'hsl(0,0%,73%)',
                }}
                placeholder="kind facilities"
              />
              <TextInput
                value={image}
                onChangeText={setImage}
                style={{
                  fontSize: 16,
                  color: 'black',
                  borderWidth: 1,
                  borderRadius: 10,
                  marginVertical: 10,
                  paddingHorizontal: 10,
                  borderColor: 'hsl(0,0%,73%)',
                }}
                placeholder="link image"
              />
              <Pressable
                onPress={actionAdd}
                style={{
                  backgroundColor: 'hsl(221,100%,80%)',
                  width: 150,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '700',
                  }}>
                  Add
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ModalAdd;
