import {View, Text, Modal, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const AlertWarning = ({visible, setVisible, header, body}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
      transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(186,186,186,0.2)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            width: '80%',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          {/*Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons name="warning" size={40} color="hsl(35,100%,50%)" />

            <Text
              style={{
                fontSize: 24,
                color: 'hsl(0,99%,49%)',
                fontWeight: '600',
              }}>
              {header}
            </Text>
          </View>
          {/*Body */}
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              textAlign: 'justify',
              marginVertical: 10,
            }}>
            {body}
          </Text>
          <Pressable
            onPress={() => setVisible(!visible)}
            style={{
              width: 100,
              borderRadius: 10,
              backgroundColor: '#FF8F6B',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                paddingVertical: 15,
              }}>
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AlertWarning;
