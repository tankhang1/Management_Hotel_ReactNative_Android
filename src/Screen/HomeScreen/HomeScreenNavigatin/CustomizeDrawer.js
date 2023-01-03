import {
  View,
  Text,
  Image,
  TouchableHighlight,
  Pressable,
  StatusBar,
} from 'react-native';
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {getAuth, signOut} from 'firebase/auth';
import {useSelector} from 'react-redux';

const CustomizeDrawer = ({props, navigation}) => {
  const currentEmployee = useSelector(state => state.data_infor).data
    .currentEmployee;
  return (
    <View
      style={{
        flex: 1,
      }}>
      <DrawerContentScrollView {...props}>
        <View>
          <Pressable
            style={{
              width: '100%',
            }}
            onPress={() => navigation.navigate('Setting')}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                marginVertical: 20,
                paddingLeft: 10,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: currentEmployee.Employee_Image}}
                  style={{
                    width: 50,
                    height: 50,
                    resizeMode: 'contain',
                    borderRadius: 100,
                  }}
                />
                <View
                  style={{
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontWeight: '700',
                    }}>
                    {currentEmployee.Employee_Name}
                  </Text>
                  <Text
                    style={{
                      color: 'hsl(0,0%,73%)',
                    }}>
                    #{currentEmployee.Employee_Id}
                  </Text>
                </View>
              </View>
              <FontAwesome5 name="angle-down" size={20} color="black" />
            </View>
          </Pressable>
          {/* DashBoard */}
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Home');
            }}
            underlayColor={'hsl(241,65%,90%)'}
            style={{
              width: '120%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop:20,
                paddingHorizontal: 10,
              }}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-dashboard-100-most-used-icons-flaticons-flat-flat-icons-2.png',
                }}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  width: '60%',
                  paddingHorizontal: 10,
                  color: 'black',
                }}>
                DashBoard
              </Text>
            </View>
          </TouchableHighlight>
          {/* Customers */}
          <TouchableHighlight
            onPress={() => navigation.navigate('Customer')}
            underlayColor={'hsl(241,65%,90%)'}
            style={{
              width: '120%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop:20,
                paddingHorizontal: 10,
              }}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-fauzidea-outline-color-fauzidea/64/000000/external-customer-e-commerce-fauzidea-outline-color-fauzidea.png',
                }}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  width: '60%',
                  paddingHorizontal: 10,
                  color: 'black',
                }}>
                Customers
              </Text>
            </View>
          </TouchableHighlight>
          {/* Employee */}
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Employee');
            }}
            underlayColor={'hsl(241,65%,90%)'}
            style={{
              width: '120%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop:20,
                paddingHorizontal: 10,
              }}>
              {/* <FontAwesome name='user-circle' color={"black"} size={24}/> */}
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/000000/external-employee-human-resource-itim2101-lineal-color-itim2101.png',
                }}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  width: '60%',
                  paddingHorizontal: 10,
                  color: 'black',
                }}>
                Employees
              </Text>
            </View>
          </TouchableHighlight>
          {/* report */}
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('Report');
            }}
            underlayColor={'hsl(241,65%,90%)'}
            style={{
              width: '120%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop:20,
                paddingHorizontal: 10,
              }}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/fluency/96/000000/profit-report.png',
                }}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  width: '60%',
                  paddingHorizontal: 10,
                  color: 'black',
                }}>
                Report
              </Text>
            </View>
          </TouchableHighlight>
          {/* room */}
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('BillNavigation');
            }}
            underlayColor={'hsl(241,65%,90%)'}
            style={{
              width: '120%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-booking-vacation-planning-solo-trip-flaticons-flat-flat-icons-2.png',
                }}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  width: '60%',
                  paddingHorizontal: 10,
                  color: 'black',
                }}>
                Room
              </Text>
            </View>
          </TouchableHighlight>
          {/*Exit */}
          <TouchableHighlight
            onPress={() => {
              const auth = getAuth();
              signOut(auth)
                .then(() => {
                  navigation.navigate('AuthScreen');
                })
                .catch(error => {
                  Alert.alert(error);
                });
            }}
            underlayColor={'hsl(241,65%,90%)'}
            style={{
              width: '120%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop:20,
                paddingHorizontal: 10,
              }}>
              <Image
                source={{
                  uri: 'https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-exit-100-most-used-icons-flaticons-flat-flat-icons.png',
                }}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  width: '60%',
                  paddingHorizontal: 10,
                  color: 'red',
                }}>
                Exit
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomizeDrawer;
