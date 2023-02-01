import {View, Text, Image, Pressable} from 'react-native';
import React, {memo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {addId} from '../../../Redux/Collect_ID_Employee';
import {useMemo} from 'react';

const ListComponent = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {title, item} = props;
  if (title === 'font')
    return (
      <View
        style={{
          alignSelf: 'center',
          marginTop: 20,
          elevation: 10,
          width: 300,
          height: 380,
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <Image
          source={{uri: item.Employee_Image}}
          style={{
            width: 300,
            height: 300,
            resizeMode: 'cover',
            borderRadius: 10,
          }}
        />
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
            }}>
            {item.Employee_Name}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
            }}>
            {item.Position}
          </Text>
        </View>
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 16,
            paddingBottom: 5,
            color: 'hsl(0,0%,60%)',
            width: 100,
          }}
          numberOfLines={1}>
          #{item.Employee_Id}
        </Text>
      </View>
    );
  else if (title === 'back')
    return (
      <View
        style={{
          alignSelf: 'center',
          marginTop: 20,
          elevation: 10,
          width: 300,
          height: 380,
          backgroundColor: 'white',
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              Name:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Employee_Name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              Id:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Employee_Id}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              Identification:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Identification}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              Phone number:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Phone}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              Email:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                maxWidth: '40%',
                color: 'hsl(0,0%,60%)',
              }}>
              Gender:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Gender}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                maxWidth: '40%',
                color: 'hsl(0,0%,60%)',
              }}>
              Age:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Age}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                maxWidth: '40%',
                color: 'hsl(0,0%,60%)',
              }}>
              Nationality:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Nationality}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                maxWidth: '40%',
                color: 'hsl(0,0%,60%)',
              }}>
              Date Of Birth:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Birthday}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                maxWidth: '40%',
                color: 'hsl(0,0%,60%)',
              }}>
              Position:
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: 'hsl(0,0%,60%)',
              }}>
              {item.Position}
            </Text>
          </View>
          <Pressable
            onPress={() => {
              dispatch(addId(item.Employee_Id));
              navigation.navigate('EmployeeProfile');
            }}
            //disabled={back}
            style={{
              paddingHorizontal: 20,
              backgroundColor: 'hsl(35,97%,55%)',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
              }}>
              View Profile
            </Text>
          </Pressable>
        </View>
      </View>
    );
};

export default memo(ListComponent);
