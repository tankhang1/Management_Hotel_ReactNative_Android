import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import DashBoard from './Dashboard/Index';

const Home = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          // borderBottomWidth:2,
          // borderBottomColor:'hsl(0,0%,90%)',
        }}>
        <Pressable onPress={() => navigation.navigate('Setting')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={{
                uri: 'https://upanh.vn-z.vn/images/2019/05/31/61559045_1295650833919209_5400120122801127424_n.jpg_nc_cat104_nc_ocAQnEXs7J9op79pSurr9PTZqTeTckoL4yCdqyiarhWAlU9YyP2NjWMI3sf7uMRWtrQXM_nc_htscontent.fhan2-4.jpg',
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
                resizeMode: 'contain',
              }}
            />
            <View
              style={{
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontSize: 24,
                  color: 'black',
                  fontWeight: '700',
                  letterSpacing: 1,
                }}>
                Lusie Ann
              </Text>
              <Text>#AAAAAAAAAAAAA</Text>
            </View>
          </View>
        </Pressable>
        <View>
          <Lottie
            source={require('./asset/67834-ssssttt-shut-up-the-cat-is-sleeping.json')}
            style={{
              width: 200,
              height: 60,
              marginBottom: -15,
            }}
            resizeMode="cover"
            loop
            autoPlay
          />
          <View
            style={{
              borderWidth: 1,
            }}
          />
        </View>
      </View>
      <DashBoard />
    </View>
  );
};
export default Home;
