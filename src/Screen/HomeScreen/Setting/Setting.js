import {View, Animated, TouchableOpacity, Easing, Alert} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AddNewRoom from './AddNewRoom';
import ChangeProfile from './ChangeProfile';
import {getAuth, signOut} from 'firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DataOption from './DataOption';
const Setting = ({navigation}) => {
  const [isBool, setIsBool] = useState(false);

  const animatedbg = useRef(new Animated.Value(0)).current;
  const SlideInRightText = useRef(new Animated.Value(0)).current;

  const SlideInRightHideText = useRef(new Animated.Value(0)).current;

  const animatedTranslateY = useRef(new Animated.Value(0)).current;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open === true) {
      Animated.timing(animatedbg, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(),
        Animated.timing(SlideInRightText, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      Animated.timing(SlideInRightHideText, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(animatedTranslateY, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedbg, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.linear,
      }).start(),
        Animated.timing(SlideInRightText, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      Animated.timing(SlideInRightHideText, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
      Animated.timing(animatedTranslateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [open]);

  const onOption = () => {
    setOpen(!open);
  };
  let bgInterpolate = animatedbg.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const OnTouchNavigation = index => {
    if (index === 0) {
      setIsBool(false);
    } else if (index === 1) {
      setIsBool(true);
    } else {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          navigation.navigate('AuthScreen');
        })
        .catch(error => {
          Alert.alert(error);
        });
    }
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      {isBool === false ? <ChangeProfile /> : <AddNewRoom />}

      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 1,
        }}>
        <Animated.View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            transform: [{scale: bgInterpolate}],
            borderRadius: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column-reverse',
          }}>
          <TouchableOpacity
            style={{}}
            onPress={() => {
              onOption();
            }}>
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'hsl(162,95%,90%)',
              }}>
              <Ionicons name="options-outline" size={24} color="black" />
            </View>
          </TouchableOpacity>
          <View>
            {open === true
              ? DataOption.map((item, index) => {
                  const tmp = item.transY;
                  let AnimatedText = SlideInRightText.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -120],
                    extrapolate: 'clamp',
                  });

                  let AnimatedHide = SlideInRightHideText.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolate: 'clamp',
                  });

                  let TranslateY = animatedTranslateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  });
                  return (
                    <AnimatedTouchable
                      onPress={() => {
                        OnTouchNavigation(index);
                      }}
                      key={index}
                      style={{
                        transform: [{translateY: TranslateY}],
                        opacity: AnimatedHide,
                        marginVertical: 10,
                      }}>
                      <Animated.View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                        <Animated.Text
                          style={{
                            position: 'absolute',
                            transform: [{translateX: AnimatedText}],
                            opacity: AnimatedHide,
                            color: 'white',
                            fontSize: 16,
                          }}>
                          {item.title}
                        </Animated.Text>
                        <View
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 100,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <item.Icon_type
                            name={item.icon_name}
                            size={20}
                            color="black"
                          />
                        </View>
                      </Animated.View>
                    </AnimatedTouchable>
                  );
                })
              : null}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Setting;
