import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View, Image} from 'react-native';
import Lottie from 'lottie-react-native';

export default function Loading({navigation}) {
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(({finished}) => {
      navigation.navigate('Login');
    });
  }, []);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Image source={require('./assets/Logo.png')} />
      <Lottie
        source={require('./assets/Loading.json')}
        style={{
          width: 150,
          height: 150,
          marginTop: 100,
        }}
        progress={animationProgress.current}
      />
    </View>
  );
}
