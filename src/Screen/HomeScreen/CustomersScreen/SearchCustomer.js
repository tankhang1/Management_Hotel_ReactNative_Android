import {
  View,
  Text,
  TextInput,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {addId} from '../../../Redux/Collect_ID_Customer_Profile';

const SearchCustomer = ({navigation}) => {
  const DataCustomer = useSelector(state => state.data_infor).data.customers;
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'hsl(0,0%,90%)',
          alignSelf: 'center',
          paddingHorizontal: 10,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search customer (name or phone)"
          style={{
            width: '90%',
            color: 'black',
          }}
          placeholderTextColor="hsl(0,0%,60%)"
        />
        <Feather name="search" size={20} />
      </View>
      <ScrollView>
        {DataCustomer.map((item, index) => {
          if (
            item.Customer_Name.toLowerCase().indexOf(search.toLowerCase()) >
              -1 ||
            item.Phone.toLowerCase().indexOf(search.toLowerCase()) > -1
          )
            return (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate('CustomerProfile');
                  dispatch(addId(item.Customer_Id));
                }}>
                <ImageBackground
                  source={{
                    uri: 'https://img6.thuthuatphanmem.vn/uploads/2022/03/15/background-card-visit-ca-nhan_092705420.jpg',
                  }}
                  style={{
                    width: '95%',
                    marginTop: 20,
                    height: 200,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: 20,
                      width: '50%',
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'hsl(220,61%,30%)',
                        fontWeight: '600',
                        paddingBottom: 20,
                      }}>
                      {item.Customer_Name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: 'black',
                        fontWeight: '500',
                      }}
                      numberOfLines={1}>
                      #{item.Customer_Id}
                    </Text>
                  </View>
                </ImageBackground>
              </Pressable>
            );
        })}
      </ScrollView>
    </View>
  );
};

export default SearchCustomer;
