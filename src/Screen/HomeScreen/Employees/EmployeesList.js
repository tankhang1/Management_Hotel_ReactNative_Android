import {
  View,
  Text,
  TextInput,
  Easing,
  Pressable,
  ScrollView,
  Dimensions,
  Modal,
  TouchableHighlight,
  FlatList,
  PermissionsAndroid,
  ToastAndroid,
  Animated,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ListComponent from './ListComponent';
import {useSelector} from 'react-redux';
import {writeFile, DownloadDirectoryPath} from 'react-native-fs';
import XLSX from 'xlsx';
const EmployeesList = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [visible, setVisible] = useState(false);
  const {width: SCREEN_WIDTH} = Dimensions.get('screen');

  const scrollX = useRef(new Animated.Value(0)).current;
  const positionIndex = Animated.divide(scrollX, SCREEN_WIDTH);
  const [searchName, setSearchName] = useState(true);
  const [searchPosition, setSearchPosition] = useState(false);
  const [searchId, setSearchId] = useState(false);
  const dataEmployee = useSelector(state => state.data_infor).data.employees;

  const [total, setTotal] = useState(dataEmployee.length);
  let number = 0;
  const [dataSearch, setDataSearch] = useState(dataEmployee);
  useEffect(() => {
    function searchDB() {
      let tmp = [];
      dataEmployee.map((item, index) => {
        if (
          (item.Employee_Name.toLowerCase().indexOf(search.toLowerCase()) >
            -1 &&
            searchName === true) ||
          (item.Position.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
            searchPosition === true) ||
          (item.Employee_Id.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
            searchId === true)
        ) {
          tmp.push(item);
        }
      });

      setDataSearch([...tmp]);
    }
    searchDB();
  }, [search]);
  console.log(dataSearch);

  const renderItem = ({item, index}) => {
    const animatedRotate = new Animated.Value(0);
    let back = false;
    let rotateFont = animatedRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    let rotateBack = animatedRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ['180deg', '360deg'],
    });
    const handlingFlashlist = () => {
      back = !back;
      Animated.timing(animatedRotate, {
        toValue: back ? 1 : 0,
        duration: 1000,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    };

    // if (
    //   (item.Employee_Name.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
    //     searchName === true) ||
    //   (item.Position.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
    //     searchPosition === true) ||
    //   (item.Employee_Id.toLowerCase().indexOf(search.toLowerCase()) > -1 &&
    //     searchId === true)
    // ) {
    //   number++;
    return (
      <Animated.View
        style={{
          width: SCREEN_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={index}>
        <Pressable
          onPress={handlingFlashlist}
          style={{
            position: 'absolute',
            top: 0,
          }}>
          <Animated.View
            style={{
              backfaceVisibility: 'hidden',
              transform: [{rotateY: rotateFont}],
            }}>
            <ListComponent title="font" item={item} />
          </Animated.View>
        </Pressable>

        {/*back */}
        <Pressable
          onPress={handlingFlashlist}
          style={{
            position: 'absolute',
            top: 0,
          }}>
          <Animated.View
            style={{
              backfaceVisibility: 'hidden',
              transform: [{rotateY: rotateBack}],
            }}>
            <ListComponent title="back" item={item} />
          </Animated.View>
        </Pressable>
      </Animated.View>
    );
  };

  const renderDot = ({item, index}) => {
    let opacity = positionIndex.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0.2, 1, 0.2],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        key={index}
        style={{
          width: 10,
          height: 10,
          borderRadius: 10,
          backgroundColor: 'black',
          marginHorizontal: 2,
          marginTop: 20,
          opacity,
        }}></Animated.View>
    );
  };
  const converDataEmployee = () => {
    let ListEmployee = [];

    dataEmployee.forEach(element => {
      let sum = 0;

      element.List_Skill_Id.forEach(skill => {
        sum += skill.y;
      });
      sum /= 4;
      tmp = {
        Address: element.Address,
        Birthday: element.Birthday,
        Date_Join: element.Date_Join,
        Email: element.Email,
        Employee_Id: element.Employee_Id,
        Employee_Image: element.Employee_Image,
        Employee_Name: element.Employee_Name,
        Gender: element.Gender,
        Identification: element.Identification,
        LevelEnglish: sum,
        Nationality: element.Nationality,
        Phone: element.Phone,
        Position: element.Position,
        Salary: element.Salary,
      };

      ListEmployee.push(tmp);
    });
    return ListEmployee;
  };

  const exportDataToExecl = async () => {
    // console.log(tmp);
    const data = converDataEmployee();
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    // Write generated excel to Storage
    await writeFile(
      DownloadDirectoryPath + '/ListEmployee.xlsx',
      wbout,
      'ascii',
    )
      .then(r => {
        ToastAndroid.show(
          'file ListEmployee.xlsx has created in directory',
          2000,
        );
      })
      .catch(e => {
        console.log('Error', e);
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
        console.log(PermissionsAndroid.RESULTS.GRANTED, granted);
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 15,
      }}>
      {/*Modal*/}
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        transparent
        statusBarTranslucent
        animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}></View>
      </Modal>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        transparent
        statusBarTranslucent
        animationType="slide">
        <Pressable
          onPress={() => setVisible(!visible)}
          style={{
            flex: 1,
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            elevation: 4,
          }}>
          <View
            style={{
              width: 30,
              height: 5,
              borderRadius: 30,
              marginVertical: 5,
              backgroundColor: 'hsl(0,0%,73%)',
              alignSelf: 'center',
            }}
          />
          <TouchableHighlight
            onPress={() => setSearchName(!searchName)}
            underlayColor="hsl(145,67%,80%)">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Search after name
              </Text>

              {searchName && <Entypo name="check" size={24} color="red" />}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => setSearchPosition(!searchPosition)}
            underlayColor="hsl(145,67%,80%)">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Search after position
              </Text>

              {searchPosition && <Entypo name="check" size={24} color="red" />}
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => setSearchId(!searchId)}
            underlayColor="hsl(145,67%,80%)">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Search after id
              </Text>

              {searchId && <Entypo name="check" size={24} color="red" />}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={handleExport}
            underlayColor="hsl(145,67%,80%)">
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                }}>
                Export
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </Modal>
      {/*Header */}
      <View
        style={{
          paddingHorizontal: 5,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //backgroundColor: 'hsl(0,0%,93%)',
            width: '95%',
            borderRadius: 10,
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'hsl(0,0%,93%)',
              marginHorizontal: 10,
              borderRadius: 100,
              paddingLeft: 10,
            }}>
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search Employees"
              style={{
                width: '85%',
                color: 'black',
              }}
              placeholderTextColor="hsl(0,0%,60%)"
            />
            <Pressable onPress={() => setSearch('')}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 25,
                  height: 25,

                  backgroundColor: 'hsl(0,0%,80%)',
                  borderRadius: 30,
                }}>
                <Feather name="x" size={15} />
              </View>
            </Pressable>
          </View>
        </View>
        <Pressable onPress={() => setVisible(!visible)}>
          <Entypo name="dots-three-vertical" size={24} color={'black'} />
        </Pressable>
      </View>

      {/*Quantity Employee */}
      <Text
        style={{
          fontSize: 16,
          paddingLeft: 10,
          paddingTop: 10,
          color: 'hsl(0,0%,60%)',
        }}>
        Total {dataSearch.length} employees
      </Text>

      {/*Carousel Employees*/}
      <View
        style={{
          height: 430,
        }}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          //snapToInterval={WIDTH_EMPLOYEE}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                width: SCREEN_WIDTH,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
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
          removeClippedSubviews={true}
          data={dataSearch}
          renderItem={renderItem}
          extraData={total}
          pagingEnabled={true}
        />
      </View>

      <View
        style={{
          alignSelf: 'center',
        }}>
        <FlatList
          data={[...new Array(dataSearch.length)]}
          renderItem={renderDot}
          horizontal
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

export default EmployeesList;
