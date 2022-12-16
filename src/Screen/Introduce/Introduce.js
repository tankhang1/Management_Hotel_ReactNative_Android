import {
  View,
  Text,
  Dimensions,
  Pressable,
  ScrollView,
  Animated,
} from 'react-native';
import React, {useRef} from 'react';
import Lottie from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getDocs, collection} from 'firebase/firestore';
import {db} from '../../Firebase/firebase';
import {useState} from 'react';
import {addEmployee} from '../../Redux/DataEmployee';
import {addCustomer} from '../../Redux/DataCustomer';
import {useEffect} from 'react';
import {fetchData} from '../../Redux/thunk/fetchData';
const Introduce = ({navigation}) => {
  const {width, height} = Dimensions.get('screen');
  const DataIntroduce = [
    {
      id: 1,
      animation: require('./assets/travel.json'),
      title: 'Travel safely, comfortably, & easily',
      subtitle:
        'Welcome my booking app which is the best app for booking at the present. If you want find the hotel to stay when you travel another place, you should use my app',
    },
    {
      id: 2,
      animation: require('./assets/finding.json'),
      title: 'Find the best hotels for your vacation',
      subtitle:
        'We have all kinds of hotel from 3 star to 5 star, you can choose freely any hotels we had',
    },
    {
      id: 3,
      animation: require('./assets/discover.json'),
      title: 'Let discover the world with us',
      subtitle:
        'We have a lot of information of hotels all around the world, so you can choose any hotel that you want stay when you go here to travel, we commit this information is real if it has any information error we have Liability for compensation about ourservice.',
    },
  ];

  const scrollX = new Animated.Value(0);
  let position = Animated.divide(scrollX, width);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const {isLoading, data, error} = useSelector(state => state.data_infor);
  if (isLoading) {
    return <Text>Loading.....</Text>;
  } else if (error) {
    console.log(error);
    return;
  } else
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <ScrollView
          horizontal
          style={{
            width: width,
          }}
          snapToAlignment="center"
          snapToInterval={width}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}>
          {DataIntroduce.map((item, index) => {
            return (
              <View
                style={{
                  width: width,
                  height: height,
                }}
                key={index}>
                <View
                  style={{
                    width: width,
                    height: 400,
                  }}>
                  <Lottie source={item.animation} loop autoPlay />
                </View>
                {/*Title*/}
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: '600',
                    color: 'black',
                    textAlign: 'center',
                    width: '90%',
                    letterSpacing: 1,
                    alignSelf: 'center',
                    color: 'black',
                  }}>
                  {item.title}
                </Text>

                {/*Introduce*/}
                <Text
                  style={{
                    textAlign: 'justify',
                    marginTop: 10,
                    width: '90%',
                    alignSelf: 'center',
                    color: 'hsl(0,0%,60%)',
                  }}>
                  {item.subtitle}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 30,
          }}>
          {DataIntroduce.map((item, index) => {
            let opacity = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.2, 1, 0.2],
              extrapolate: 'clamp',
            });
            let tranWidth = position.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [10, 40, 10],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={{
                  width: tranWidth,
                  height: 10,
                  backgroundColor: 'hsl(145,67%,40%)',
                  opacity,
                  marginHorizontal: 10,
                  borderRadius: 100,
                }}></Animated.View>
            );
          })}
        </View>
        {/*Pressable Skip*/}
        <Pressable
          onPress={() => navigation.navigate('HomeScreen')}
          style={{
            width: '90%',
            alignSelf: 'center',
            height: 50,
            backgroundColor: 'hsl(145,67%,80%)',
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Text
            style={{
              color: 'hsl(145,67%,47%)',
              fontSize: 18,
              fontWeight: '500',
            }}>
            Skip
          </Text>
        </Pressable>
      </View>
    );
};

export default Introduce;
