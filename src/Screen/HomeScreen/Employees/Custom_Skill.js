import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  I18nManager,
  Animated,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addSkill} from '../../../Redux/English_Level';

const Custom_Skill = ({width, height, skill}) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  renderRightAction = (text, color, x, progress) => {
    const pressHandler = () => {
      this.close();
      dispatch(
        addSkill({
          name: name,
          level: x,
        }),
      );
    };
    return (
      <Animated.View style={{flex: 1, transform: [{translateX: 0}]}}>
        <RectButton
          style={[
            styles.rightAction,
            {backgroundColor: color, borderRadius: 10},
          ]}
          onPress={pressHandler}>
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };
  renderRightActions = progress => (
    <View
      style={{
        width: 300,
        flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
      }}>
      {this.renderRightAction('Poor', 'hsl(360,99%,49%)', '1', progress)}
      {this.renderRightAction('Fair', 'hsl(46,99%,50%)', '2', progress)}
      {this.renderRightAction('Good', 'hsl(90,57%,62%)', '3', progress)}
      {this.renderRightAction('Excellent', 'hsl(120,100%,29%)', '4', progress)}
    </View>
  );
  updateRef = ref => {
    this._swipeableRow = ref;
  };
  close = () => {
    this._swipeableRow.close();
  };
  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={this.updateRef}
        friction={2}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}>
        <Pressable onTouchStart={() => setName(skill)}>
          <View
            style={{
              width: width,
              height: height,
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'hsl(222,56%,96%)',
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'black',
                fontWeight: '600',
              }}>
              {skill}
            </Text>
            <Entypo name="chevron-left" size={20} color="hsl(0,0%,73%)" />
          </View>
        </Pressable>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
export default Custom_Skill;
