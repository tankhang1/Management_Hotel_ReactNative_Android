import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Lottie from 'lottie-react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import {auth} from '../../Firebase/firebase';
import {sendPasswordResetEmail} from 'firebase/auth';
const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const sendPassword = async () => {
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert(error);
      });
  };
  const [isFocusE, setIsFocusE] = useState(false);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <KeyboardAvoidingView behavior={'position'}>
        <Lottie
          source={require('./assets/management.json')}
          autoPlay
          loop
          style={{
            width: '100%',
            height: 400,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            width: '80%',
            borderBottomWidth: 1,
            marginTop: 20,
          }}>
          <Fontisto
            name="email"
            size={24}
            style={{paddingHorizontal: 10}}
            color={isFocusE ? 'black' : 'hsl(0,0%,50%)'}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            style={{
              width: '80%',
            }}
            onFocus={() => setIsFocusE(true)}
            onBlur={() => setIsFocusE(false)}
          />
        </View>

        <TouchableOpacity onPress={sendPassword}>
          <View
            style={{
              width: '80%',
              height: 50,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#184771',
              borderRadius: 10,
              marginVertical: 20,
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: 'white',
              }}>
              Send
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              alignSelf: 'center',
            }}>
            I have a account?{' '}
            <Text
              style={{
                color: 'blue',
                fontWeight: '700',
              }}>
              Sign in?
            </Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default ForgotPassword;
