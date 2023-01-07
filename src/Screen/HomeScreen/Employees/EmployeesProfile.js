import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryTheme,
  VictoryArea,
} from 'victory-native';
import {Calendar} from 'react-native-calendars';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {useEffect} from 'react';
const EmployeesProfile = () => {
  const id = useSelector(state => state.collect_Id_Employee);
  const dataEmployee = useSelector(
    state => state.data_infor,
  ).data.employees.filter(value => value.Employee_Id === id);
  useEffect(() => {
    const AddNew = () => {
      let tmp = [];
      dataEmployee[0].List_Date_Off.map((item, index) => {
        let x = convertString(item);
        const object = {
          name: x,
          property: {dots: [off_A]},
        };
        tmp.push(object);
      });
      dataEmployee[0].List_Date_Work.map((item, index) => {
        let x = convertString(item);
        const object = {
          name: x,
          property: {dots: [working]},
        };
        tmp.push(object);
      });
      dataEmployee[0].List_Date_Off_NoAdmit.map((item, index) => {
        let x = convertString(item);
        const object = {
          name: x,
          property: {dots: [off_noA]},
        };
        tmp.push(object);
      });
      dataEmployee[0].List_Date_WorkOvertime.map((item, index) => {
        let x = convertString(item);
        const object = {
          name: x,
          property: {dots: [workovertime]},
        };
        tmp.push(object);
      });
      let rv = {};
      for (let i = 0; i < tmp.length; ++i) {
        rv[tmp[i].name] = tmp[i].property;
      }
      setDate_List(rv);
    };
    AddNew();
  }, [dataEmployee[0]]);
  const working = {key: 'dateworking', color: 'hsl(145,67%,47%)'};
  const workovertime = {key: 'workovertime', color: 'hsl(224,75%,53%)'};
  const off_A = {key: 'off_A', color: 'hsl(35,100%,50%)'};
  const off_noA = {key: 'off_noA', color: 'red'};
  function convertString(date) {
    let tmp = date;
    tmp = tmp.split('/');
    tmp.reverse();
    tmp = tmp.join('-');
    return tmp;
  }
  const [date_list, setDate_List] = useState({});

  const note = [
    {
      color: 'hsl(145,67%,47%)',
      text: 'Workday',
    },
    {
      color: 'hsl(224,75%,53%)',
      text: 'Workovertime',
    },
    {
      color: 'hsl(35,100%,50%)',
      text: 'Absent have leave',
    },
    {
      color: 'red',
      text: 'Absent without leave',
    },
  ];
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 10,
      }}
      showsVerticalScrollIndicator={false}>
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Image
          source={{uri: dataEmployee[0].Employee_Image}}
          style={{
            width: 150,
            height: 150,
            resizeMode: 'contain',
            borderRadius: 100,
          }}
        />
        <View
          style={{
            paddingTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            {dataEmployee[0].Employee_Name}
          </Text>
          <Text
            style={{
              fontSize: 16,
            }}>
            #{dataEmployee[0].Employee_Id}
          </Text>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '600',
            }}>
            {dataEmployee[0].Position}
          </Text>
        </View>
      </View>
      {/*Contact information */}
      <View>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '600',
          }}>
          Contact Information
        </Text>
        <View
          style={{
            paddingTop: 10,
          }}>
          {/*Birthday */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                backgroundColor: 'hsl(0,0%,80%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="calendar" size={20} color="white" />
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 10,
                color: 'black',
              }}>
              {dataEmployee[0].Birthday}
            </Text>
          </View>
          {/*Phone */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                backgroundColor: 'hsl(0,0%,80%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="phone" size={20} color="white" />
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 10,
                color: 'black',
              }}>
              {dataEmployee[0].Phone}
            </Text>
          </View>
          {/*Mail*/}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                backgroundColor: 'hsl(0,0%,80%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="mail" size={20} color="white" />
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 10,
                color: 'black',
              }}>
              {dataEmployee[0].Email}
            </Text>
          </View>
          {/*Address */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 100,
                backgroundColor: 'hsl(0,0%,80%)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Ionicons name="location-outline" size={20} color="white" />
            </View>
            <Text
              style={{
                fontSize: 16,
                paddingLeft: 10,
                color: 'black',
              }}>
              {dataEmployee[0].Address}
            </Text>
          </View>
        </View>
      </View>
      {/*Skill*/}
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '600',
            }}>
            English level
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 200,
              height: 20,
              marginLeft: 20,
            }}>
            {[
              'hsl(360,99%,49%)',
              'hsl(46,99%,50%)',
              'hsl(90,57%,62%)',
              'hsl(120,100%,29%)',
            ].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '20%',
                    height: '100%',
                    backgroundColor: item,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: index === 0 ? 30 : 0,
                    borderBottomLeftRadius: index === 0 ? 30 : 0,
                    borderTopRightRadius: index === 3 ? 30 : 0,
                    borderBottomRightRadius: index === 3 ? 30 : 0,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                    }}>
                    {index + 1}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <VictoryChart polar theme={VictoryTheme.material}>
            <VictoryPolarAxis
              dependentAxis
              style={{axis: {stroke: 'none'}}}
              tickFormat={() => null}
            />
            <VictoryPolarAxis labelPlacement="perpendicular" />
            <VictoryArea
              data={dataEmployee[0].List_Skill_Id}
              labels={({datum}) => datum.y}
              style={{
                labels: {fill: 'black'},
                data: {fill: '#c43a31'},
              }}
            />
          </VictoryChart>
        </View>
      </View>
      {/*Day working*/}
      <View
        style={{
          marginBottom: 50,
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '600',
          }}>
          List day working
        </Text>
        <View>
          {note.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 30,
                    backgroundColor: item.color,
                    marginHorizontal: 10,
                  }}
                />
                <Text
                  style={{
                    color: 'hsl(0,0%,60%)',
                  }}>
                  {item.text}
                </Text>
              </View>
            );
          })}
        </View>
        <Calendar markingType="multi-dot" markedDates={date_list} />
      </View>
    </ScrollView>
  );
};

export default EmployeesProfile;
