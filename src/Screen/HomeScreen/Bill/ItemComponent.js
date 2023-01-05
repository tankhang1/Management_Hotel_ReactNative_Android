import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
const ItemComponent = ({
  item,
  onMinus,
  onPlus,
  onDeleteRoom,
  navigation,
  width,
  index,
}) => {
  const translationX = useSharedValue(0);
  const hide = useSharedValue(0);
  const PanHandler = useAnimatedGestureHandler({
    onActive: (e, ctx) => {
      translationX.value = e.translationX;
    },
    onEnd: (e, ctx) => {
      if (e.translationX < 0) {
        translationX.value = withTiming(-100);
        hide.value = 40;
      } else {
        translationX.value = withTiming(0);
        hide.value = 0;
      }
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });
  const hideAnimated = useAnimatedStyle(() => {
    return {
      zIndex: hide.value,
    };
  });
  const TouchAnimated = Animated.createAnimatedComponent(TouchableOpacity);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
      }}>
      {/*Dang loi */}
      <GestureHandlerRootView
        style={{
          width: width * 0.95,
          height: 30,
          marginVertical: 10,
          position: 'absolute',
          zIndex: 33,
        }}>
        <PanGestureHandler onGestureEvent={PanHandler}>
          <Animated.View
            style={[
              {
                width: '100%',
                alignSelf: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',

                backgroundColor: 'white',
              },
              animatedStyle,
            ]}>
            <Text
              style={{
                color: 'hsl(0,0%,60%)',
                fontSize: 16,
              }}>
              {item.key} x {item.quantity}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                borderRadius: 10,
                paddingHorizontal: 10,
                borderColor: 'hsl(0,0%,73%)',
              }}>
              <Pressable
                onPress={() => {
                  onMinus(index);
                }}>
                <Entypo name="minus" size={16} color="hsl(0,0%,50%)" />
              </Pressable>
              <Text
                style={{
                  color: 'hsl(0,0%,50%)',
                  fontSize: 14,
                  marginHorizontal: 10,
                }}>
                {item.quantity}
              </Text>
              <Pressable
                onPress={() => {
                  onPlus(item.key, index);
                }}>
                <Entypo name="plus" size={16} color="hsl(0,0%,50%)" />
              </Pressable>
            </View>
            <Pressable onPress={() => onDeleteRoom(index)}>
              <Feather name="trash" size={16} color="black" />
            </Pressable>
            <Feather name="chevrons-left" size={24} color="black" />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
      <TouchAnimated
        onPress={() => {
          translationX.value = withTiming(0);
          hide.value = 40;
          navigation.navigate('SearchRoom', {item});
        }}
        style={[
          {
            width: 60,
            height: 30,
            position: 'absolute',
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'hsl(133,75%,57%)',
            borderRadius: 10,
          },
          hideAnimated,
        ]}>
        <Text
          style={{
            color: 'white',
            fontWeight: '600',
            fontSize: 14,
          }}>
          Detail
        </Text>
      </TouchAnimated>
    </View>
  );
};

export default ItemComponent;
