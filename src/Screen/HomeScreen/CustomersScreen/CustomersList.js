import {
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {SlideInLeft} from 'react-native-reanimated';
import {DataTable, Provider as PaperProvider} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {
  writeFile,
  readFile,
  DownloadDirectoryPath,
  ExternalStorageDirectoryPath,
} from 'react-native-fs';
import XLSX from 'xlsx';
const CustomersList = ({navigation}) => {
  // const dataCustomer = ;
  const [visible, setVisible] = React.useState(false);

  const [CheckSort, setCheckSort] = useState(true);
  const [checkCustomer, setCheckCustomer] = useState(null);
  const tableHeader = [
    'Customer ID',
    'Customer Name',
    'Birthday',
    'Gender',
    'Identification',
    'Phone',
    'Status',
  ];
  let data = useSelector(state => state.data_infor).data.customers;
  const [data_table, setData] = useState([
    ...useSelector(state => state.data_infor).data.customers,
  ]);
  const exportDataToExecl = async () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data_table);
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    // Write generated excel to Storage
    await writeFile(
      DownloadDirectoryPath + '/ListCustomer.xlsx',
      wbout,
      'ascii',
    )
      .then(r => {
        ToastAndroid.show(
          'file ListCustomer.xlsx has created in directory',
          2000,
        );
      })
      .catch(e => {
        Alert.alert('Error', e);
      });
  };
  const handleExport = async () => {
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permistion needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportDataToExecl();
          console.log('Permistion granted');
        } else {
          console.log('Permission denied');
        }
      } else {
        exportDataToExecl();
      }
    } catch (error) {
      console.log('Error while checking permission');
      console.log(error);
      return;
    }
  };
  const SortA_Z = () => {
    setCheckSort(true);
    let tmp = data_table;
    tmp.sort(function (a, b) {
      if (a.Customer_Name > b.Customer_Name) return 1;
      else return -1;
    });
    const arraySort = [...tmp];
    setData(arraySort);
  };

  const SortZ_A = () => {
    setCheckSort(false);
    let tmp = data_table;
    tmp.sort(function (a, b) {
      if (a.Customer_Name < b.Customer_Name) return 1;
      else return -1;
    });
    const arraySort = [...tmp];
    setData(arraySort);
  };

  const NewCustomer = () => {
    if (checkCustomer === true || checkCustomer === false) {
      setCheckCustomer(null);
      setData([...data]);
    } else {
      setCheckCustomer(true);
      let tmp = [];
      data_table.forEach(e => {
        if (e.Status === 'New Customer') {
          tmp.push(e);
        }
      });
      setData([...tmp]);
    }
  };

  const OldCustomer = () => {
    if (checkCustomer === false || checkCustomer === true) {
      setCheckCustomer(null);
      setData([...data]);
    } else {
      setCheckCustomer(false);
      let tmp = [];
      data_table.forEach(e => {
        if (e.Status === 'Old Customer') tmp.push(e);
      });
      setData([...tmp]);
    }
  };
  const Reset = () => {
    setCheckCustomer(null);
    setCheckSort(null);
    setData([...data]);
  };
  const numberOfItemsPerPageList = [6, 8, 10];

  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data_table.length);
  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);
  return (
    <PaperProvider>
      <ScrollView
        style={{
          backgroundColor: 'white',
          flex: 1,
          paddingTop: 10,
        }}
        showsVerticalScrollIndicator={false}>
        {/*Modal */}
        <Modal
          visible={visible}
          transparent
          statusBarTranslucent
          onRequestClose={() => setVisible(!visible)}>
          <View
            style={{
              flex: 1,
            }}>
            <Pressable
              onPress={() => setVisible(!visible)}
              style={{
                flex: 1,
                opacity: 0.5,
                backgroundColor: 'hsl(0,0%,50%)',
              }}></Pressable>
            <View
              style={{
                width: '100%',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                paddingVertical: 10,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  borderTopRightRadius: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: 'hsl(0,0%,60%)',
                  }}>
                  Sort Customer by
                </Text>
                <Pressable onPress={() => setVisible(!visible)}>
                  <Feather name="x-octagon" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable
                onPress={() => SortA_Z()}
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                <Animated.View
                  entering={SlideInLeft}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: CheckSort === true ? 'black' : 'hsl(0,0%,60%)',
                      fontWeight: '500',
                    }}>
                    Sort from A - Z
                  </Text>

                  {CheckSort === true ? (
                    <Entypo name="check" size={20} color={'hsl(145,67%,47%)'} />
                  ) : null}
                </Animated.View>
              </Pressable>
              <Pressable
                onPress={() => SortZ_A()}
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                <Animated.View
                  entering={SlideInLeft}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: CheckSort === false ? 'black' : 'hsl(0,0%,60%)',
                      fontWeight: '500',
                    }}>
                    Sort from Z - A
                  </Text>

                  {CheckSort === false ? (
                    <Entypo name="check" size={20} color={'hsl(145,67%,47%)'} />
                  ) : null}
                </Animated.View>
              </Pressable>
              <Pressable
                onPress={() => NewCustomer()}
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                <Animated.View
                  entering={SlideInLeft}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: checkCustomer === true ? 'black' : 'hsl(0,0%,60%)',
                      fontWeight: '500',
                    }}>
                    New Customer
                  </Text>

                  {checkCustomer === true ? (
                    <Entypo name="check" size={20} color={'hsl(145,67%,47%)'} />
                  ) : null}
                </Animated.View>
              </Pressable>
              <Pressable
                onPress={() => {
                  OldCustomer();
                }}
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                <Animated.View
                  entering={SlideInLeft}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color:
                        checkCustomer === false ? 'black' : 'hsl(0,0%,60%)',
                      fontWeight: '500',
                    }}>
                    Old Customer
                  </Text>

                  {checkCustomer === false ? (
                    <Entypo name="check" size={20} color={'hsl(145,67%,47%)'} />
                  ) : null}
                </Animated.View>
              </Pressable>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}>
                <Pressable
                  onPress={Reset}
                  style={{
                    flex: 1,
                    backgroundColor: 'hsl(222,28%,90%)',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',

                      color: 'hsl(229,100%,29%)',
                    }}>
                    Reset
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => setVisible(!visible)}
                  style={{
                    flex: 1,
                    backgroundColor: 'hsl(229,100%,29%)',
                    borderRadius: 5,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '700',

                      color: 'white',
                    }}>
                    Done
                  </Text>
                </Pressable>
              </View>
              <Pressable
                style={{
                  width: 150,
                  height: 5,
                  backgroundColor: 'hsl(222,28%,80%)',
                  marginTop: 10,
                  borderRadius: 10,
                }}></Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}>
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{
              width: 35,
              height: 35,
              borderRadius: 100,
              backgroundColor: 'hsl(0,0%,95%)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="menu" size={20} color="black" />
          </Pressable>

          <Text
            style={{
              fontSize: 24,
              marginLeft: 10,
              color: 'black',
            }}>
            List Customer
          </Text>

          <Pressable
            onPress={() => {
              setVisible(!visible);
            }}>
            <MaterialCommunityIcons
              name="filter-variant"
              size={30}
              color={'black'}
            />
          </Pressable>
        </View>

        {/*Table*/}
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <DataTable>
              <DataTable.Header>
                {tableHeader.map((item, index) => {
                  return (
                    <DataTable.Title
                      style={{
                        width: index === 1 ? 150 : 100,
                      }}
                      key={index}>
                      <Text style={{color: 'black'}}>{item}</Text>
                    </DataTable.Title>
                  );
                })}
              </DataTable.Header>
              <View>
                <ScrollView showsHorizontalScrollIndicator={false}>
                  {data_table.slice(from, to).map((item, index) => {
                    return (
                      <DataTable.Row key={index}>
                        <DataTable.Cell
                          style={{
                            width: 100,
                          }}>
                          <Text style={{color: 'black'}}>
                            {item.Customer_Id}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            width: 150,
                          }}>
                          <Text style={{color: 'black'}}>
                            {item.Customer_Name}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            width: 100,
                          }}>
                          <Text style={{color: 'black'}}>{item.Birthday}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            width: 100,
                          }}>
                          <Text style={{color: 'black'}}>{item.Gender}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            width: 100,
                          }}>
                          <Text style={{color: 'black'}}>
                            {item.Identification}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            width: 100,
                          }}>
                          <Text style={{color: 'black'}}>{item.Phone}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell
                          style={{
                            width: 100,
                          }}>
                          <Text
                            style={{
                              color:
                                item.Status === 'New Customer' ? 'red' : 'blue',
                            }}>
                            {item.Status}
                          </Text>
                        </DataTable.Cell>
                      </DataTable.Row>
                    );
                  })}
                  <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(
                      data_table.length / numberOfItemsPerPage,
                    )}
                    onPageChange={page => setPage(page)}
                    label={() => {
                      <Text style={{color: 'black'}}>{`${from + 1}-${to} of ${
                        data_table.length
                      }`}</Text>;
                    }}
                    showFastPaginationControls
                    numberOfItemsPerPageList={numberOfItemsPerPageList}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={() => <Text>Rows per page</Text>}
                  />
                </ScrollView>
              </View>
            </DataTable>
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          {/*Export */}
          <Pressable
            onPress={handleExport}
            style={{
              width: 100,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'hsl(0, 100%, 60%)',
              marginVertical: 20,
              alignSelf: 'flex-end',
              marginRight: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  fontSize: 18,
                  color: 'white',
                  fontWeight: '600',
                }}>
                Export
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default CustomersList;
