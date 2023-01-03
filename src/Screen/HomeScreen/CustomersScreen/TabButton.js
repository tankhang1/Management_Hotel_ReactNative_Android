import {View, StyleSheet, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const TabButton = props => {
  const {item, focused} = props;
  const navigation = useNavigation();
  const tranY = useSharedValue(0);
  const scaleView = useSharedValue(0.8);
  const hideText = useSharedValue(1);
  useEffect(() => {
    tranY.value = withTiming(0, {duration: 1000});
    scaleView.value = withTiming(0.8, {duration: 1000});
    hideText.value = withTiming(0);
    const subscribe = navigation.addListener('focus', () => {
      tranY.value = withTiming(-30, {duration: 1000});
      scaleView.value = withTiming(1.2, {duration: 1000});
      hideText.value = withTiming(1);
    });
    return subscribe;
  }, [navigation]);
  useEffect(() => {
    const subscribe = navigation.addListener('blur', () => {
      tranY.value = withTiming(0, {duration: 1000});
      scaleView.value = withTiming(0.8, {duration: 1000});
      hideText.value = withTiming(0);
    });
    return subscribe;
  }, [navigation]);
  const animatedTranY = useAnimatedStyle(() => {
    return {
      transform: [{translateY: tranY.value}, {scale: scaleView.value}],
    };
  });
  const animatedText = useAnimatedStyle(() => {
    return {
      opacity: hideText.value,
    };
  });
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <AnimatedPressable
      style={[styles.container, animatedTranY]}
      onPress={() => navigation.navigate(item.route)}>
      <View style={styles.btn}>
        <Animated.View style={styles.circle} />
        <item.Icon_type
          name={item.icon_name}
          size={20}
          color={focused ? 'white' : 'hsl(0,0%,60%)'}
        />
      </View>
      <Animated.Text style={[styles.text, animatedText]}>
        {item.title}
      </Animated.Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsl(208,65%,27%)',
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: 'hsl(0,0%,50%)',
  },
});
export default TabButton;
