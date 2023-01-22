import {View, Text, ImageBackground, ScrollView, Pressable} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {DataTable} from 'react-native-paper';
import {useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Template_Bill from './Template_Bill';

const CustomersProfile = () => {
  const Id = useSelector(state => state.collect_Id_Customer);
  const dataCustomer = useSelector(state => state.data_infor).data.customers;
  const Data_Id = dataCustomer.filter(value => {
    return value.Customer_Id === Id;
  });

  const list_bill = useSelector(state => state.list_bill).filter(value => {
    return value.Customer_Id === Id;
  });
  const [showBill, setShowBill] = useState(false);
  const [Bill_Id, setBill_Id] = useState('');
  const [onShowHistory, setOnshowHistory] = useState(false);
  return (
    <View
      style={{
        flex: 1,
      }}>
      {Id !== '' ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
          }}>
          {Bill_Id !== '' && (
            <Template_Bill
              visible={showBill}
              setVisible={setShowBill}
              Bill_Id={Bill_Id}
            />
          )}
          <View
            style={{
              marginTop: 20,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <ImageBackground
              source={{
                uri: 'https://i.pinimg.com/564x/b3/45/cb/b345cb93ef9660158e4a490db36eebf8.jpg',
              }}
              imageStyle={{
                borderRadius: 10,
              }}
              style={{
                paddingLeft: 20,
                paddingVertical: 20,
              }}>
              <Text
                style={{
                  color: 'rgb(211,211,211)',
                  fontSize: 24,
                  letterSpacing: 2,
                }}>
                {Data_Id[0].Customer_Name}
              </Text>
              <Text
                style={{
                  color: 'hsl(221,100%,64%)',
                  fontSize: 20,
                  letterSpacing: 2,
                  paddingVertical: 15,
                  flexWrap: 'wrap',
                }}
                numberOfLines={1}>
                Id: #{Data_Id[0].Customer_Id}
              </Text>
              <Text
                style={{
                  color: 'white',
                }}>
                Identification: {Data_Id[0].Identification}
              </Text>
              <Text
                style={{
                  color: 'white',
                }}>
                Phone: {Data_Id[0].Phone}
              </Text>
              <Text
                style={{
                  color: 'white',
                }}>
                Gender: {Data_Id[0].Gender}
              </Text>
              <Text
                style={{
                  color: 'white',
                }}>
                Status: {Data_Id[0].Status}
              </Text>
              <Pressable
                onPress={() => {
                  setOnshowHistory(!onShowHistory);
                }}
                style={{
                  position: 'absolute',

                  right: 0,
                  bottom: 0,
                }}>
                <View
                  style={{
                    backgroundColor: 'hsl(35,97%,60%)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 60,
                    height: 40,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '600',
                    }}>
                    History
                  </Text>
                </View>
              </Pressable>
            </ImageBackground>
          </View>
          <ScrollView style={{marginTop: 10}}>
            {onShowHistory === true ? (
              list_bill.length !== 0 ? (
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>Date Check In</DataTable.Title>
                    <DataTable.Title>Date Check Out</DataTable.Title>
                    <DataTable.Title>Bill Id</DataTable.Title>
                    <DataTable.Title>View Detail</DataTable.Title>
                  </DataTable.Header>
                  {list_bill.map((item, index) => {
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell>{item.Date_Check_In}</DataTable.Cell>
                        <DataTable.Cell>{item.Date_Check_Out}</DataTable.Cell>
                        <DataTable.Cell>{item.Bill_Id}</DataTable.Cell>
                        <DataTable.Cell>
                          <Pressable
                            onPress={() => {
                              setBill_Id(item.Bill_Id), setShowBill(!showBill);
                            }}
                            style={{
                              paddingHorizontal: 5,
                              paddingVertical: 5,
                              backgroundColor: 'hsl(220,98%,95%)',
                            }}>
                            <Text
                              style={{
                                color: 'blue',
                              }}>
                              View
                            </Text>
                          </Pressable>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                </DataTable>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    name="error-outline"
                    size={100}
                    style={{
                      resizeMode: 'contain',
                    }}
                    color="hsl(0,0%,80%)"
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: '500',
                      color: 'hsl(0,0%,80%)',
                    }}>
                    Not found
                  </Text>
                </View>
              )
            ) : null}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="database-off-outline"
            size={50}
            color="hsl(0,0%,73%)"
          />
          <Text
            style={{
              fontSize: 20,
              color: 'hsl(0,0%,73%)',
            }}>
            Don't have information
          </Text>
        </View>
      )}
    </View>
  );
};

export default CustomersProfile;
