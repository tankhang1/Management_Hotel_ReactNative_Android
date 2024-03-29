import {
  View,
  Text,
  useWindowDimensions,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {addLike, deleteLike} from '../../../Redux/ListLikeRoom';
import Entypo from 'react-native-vector-icons/Entypo';
import {setId} from '../../../Redux/ManageId';
const Search = ({navigation, route}) => {
  const {width} = useWindowDimensions();
  const dispatch = useDispatch();
  const GroupRoom = route.params.item;
  const R = useSelector(state => state.list_room).groupRoom.filter(
    value => value.key === GroupRoom.key,
  );

  const listlikeroom = useSelector(state => state.listlikeroom);
  const onChoose = id => {
    if (listlikeroom.indexOf(id) === -1) {
      dispatch(
        addLike({
          id: id,
        }),
      );
    } else {
      dispatch(
        deleteLike({
          id: id,
        }),
      );
    }
  };
  const renderRoom = ({item, index}) => {
    if (item.status === 1) {
      let check = listlikeroom.indexOf(item.id);
      return (
        <View
          key={index}
          style={{
            width: width * 0.8,
            height: 400,
            backgroundColor: 'white',
            marginVertical: 20,
            borderRadius: 10,
            elevation: 4,
            paddingBottom: 20,
          }}>
          <Image
            source={{
              uri: item.image,
            }}
            style={{
              width: '100%',
              height: 200,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              resizeMode: 'contain',
            }}
          />
          <View>
            <View
              style={{
                marginLeft: 10,
                marginVertical: 10,
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {item.no_room}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {[0, 0, 0, 0, 0].map((_, index) => {
                  if (index <= item.rating - 1)
                    return (
                      <Fontisto
                        key={index}
                        name="star"
                        size={16}
                        color="hsl(44,99%,50%)"
                        style={{
                          marginRight: 10,
                        }}
                      />
                    );
                  else if (index - item.rating + 1 <= 0.5)
                    return (
                      <Fontisto
                        key={index}
                        name="star-half"
                        size={16}
                        color="hsl(44,99%,50%)"
                        style={{
                          marginRight: 10,
                        }}
                      />
                    );
                  else return;
                })}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'hsl(0,0%,73%)',
                  }}>
                  {item.rating}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                width: '100%',
                borderColor: 'hsl(0,0%,80%)',
                marginVertical: 10,
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Ionicons
                    name="ios-person-outline"
                    size={20}
                    color="rgb(186,186,186)"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgb(186,186,186)',
                      marginLeft: 10,
                    }}>
                    QUANTITY
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  3 - 5
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderColor: 'hsl(0,0%,80%)',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <MaterialCommunityIcons
                    name="form-textarea"
                    size={20}
                    color="rgb(186,186,186)"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgb(186,186,186)',
                      marginLeft: 10,
                    }}>
                    AREA
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  1250 m²
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <FontAwesome
                    name="money"
                    size={20}
                    color="rgb(186,186,186)"
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: 'rgb(186,186,186)',
                      marginLeft: 10,
                    }}>
                    CHARGE
                  </Text>
                </View>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '600',
                  }}>
                  ${item.money}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-end',
            }}>
            <Pressable
              onPress={() => {
                dispatch(setId(item.id));
                navigation.navigate('RoomDetail');
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'hsl(346,100%,67%)',
                width: '40%',
                height: 40,
                borderRadius: 5,
                alignSelf: 'flex-end',
                marginRight: 10,
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>
                DETAIL!!
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onChoose(item.id);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  check > -1 ? 'hsl(0,99%,49%)' : 'hsl(145,67%,47%)',
                width: '40%',
                height: 40,
                borderRadius: 5,
                alignSelf: 'flex-end',
                marginRight: 10,
                marginVertical: 10,
              }}>
              <Text style={{fontSize: 16, color: 'white', fontWeight: '600'}}>
                {check > -1 ? 'SELECTED' : 'CHOOSE'}!!
              </Text>
            </Pressable>
          </View>
        </View>
      );
    }
  };
  const [search, setSearch] = useState('');
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/*Search */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',

          marginHorizontal: 10,

          borderRadius: 10,
          marginVertical: 10,
        }}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{
            width: 35,
            height: 35,
            borderRadius: 10,
            backgroundColor: 'hsl(0,0%,80%)',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <Entypo name="chevron-left" size={20} color="black" />
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 100,
            borderColor: 'hsl(0,0%,80%)',
          }}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
            selectionColor={'black'}
            multiline={false}
            numberOfLines={1}
            style={{
              fontSize: 16,
              color: 'black',
              width: '80%',
              paddingHorizontal: 20,
            }}
          />
          <Ionicons name="ios-search-outline" size={24} color="black" />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={R[0].value}
          renderItem={renderRoom}
          showsVerticalScrollIndicator={false}
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

export default Search;
