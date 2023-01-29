import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Lottie from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../Firebase/firebase';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const onSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, userName, password).then(() =>
        navigation.navigate('IntroScreen'),
      );
    } catch (error) {
      setErrorText(JSON.parse(JSON.stringify(error)).code);
      setShowError(!showError);
    }
  };
  const [isPressN, setIsPressN] = useState(false);
  const [isPressP, setIsPressP] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Modal
        visible={showError}
        onRequestClose={() => {
          setShowError(!showError);
        }}
        transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(186,186,186,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              paddingVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            {/*Header Text */}
            <MaterialIcons name="error" size={100} color="hsl(0,99%,60%)" />
            {/*Sub header */}
            <Text
              style={{
                fontSize: 24,
                color: 'hsl(0,99%,60%)',
                letterSpacing: 1.5,
                fontWeight: '600',
              }}>
              Error!
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#bababa',
                marginVertical: 15,
              }}>
              {errorText}
            </Text>

            <Pressable
              onPress={() => setShowError(!showError)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: 150,
                height: 35,
                backgroundColor: 'hsl(0,99%,60%)',
                justifyContent: 'center',
                borderRadius: 10,
              }}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '500'}}>
                Try again
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
            borderBottomWidth: isPressN ? 1 : 0.5,
            marginTop: 20,
          }}>
          <Ionicons
            name="person-circle"
            size={24}
            style={{paddingHorizontal: 10}}
            color={isPressN ? 'black' : 'hsl(0,0%,50%)'}
          />
          <TextInput
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your username"
            onFocus={() => setIsPressN(true)}
            onBlur={() => setIsPressN(false)}
            style={{
              width: '90%',
              color: 'black',
            }}
            placeholderTextColor="hsl(0,0%,60%)"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            width: '80%',
            borderBottomWidth: isPressP ? 1 : 0.5,
            marginTop: 20,
          }}>
          <Feather
            name="lock"
            size={24}
            style={{paddingHorizontal: 10}}
            color={isPressP ? 'black' : 'hsl(0,0%,50%)'}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            style={{
              width: '75%',
              color: 'black',
            }}
            onFocus={() => setIsPressP(true)}
            onBlur={() => setIsPressP(false)}
            secureTextEntry={securePassword}
            placeholderTextColor="hsl(0,0%,60%)"
          />
          <Pressable onPress={() => setSecurePassword(!securePassword)}>
            <Feather
              name={securePassword == true ? 'eye-off' : 'eye'}
              size={24}
              color={isPressP ? 'black' : 'hsl(0,0%,50%)'}
            />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{
            paddingVertical: 10,
            alignSelf: 'flex-end',
            marginRight: '10%',
          }}>
          <Text
            style={{
              color: 'blue',
              fontFamily: '700',
            }}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSignIn}>
          <View
            style={{
              width: '80%',
              height: 50,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#184771',
              borderRadius: 10,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontWeight: '700',
                color: 'white',
              }}>
              SIGN IN
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;
