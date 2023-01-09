import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {addLike, deleteLike} from '../../../Redux/ListLikeRoom';
const RoomDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const Id = useSelector(state => state.id);
  const Data_Room = useSelector(state => state.list_room).rooms;
  const bookMark1 = useRef(route.params?.bookMark);

  let data = Data_Room.filter(item => item.id === Id);
  const datafacility = [
    data[0].service === 1
      ? 'https://img.icons8.com/external-others-cattaleeya-thongsriphong/64/000000/external-Service-travel-color-line-others-cattaleeya-thongsriphong.png'
      : '',
    data[0].wifi === 1
      ? 'https://img.icons8.com/color/96/000000/wifi--v1.png'
      : '',
    data[0].receptionist === 1
      ? 'https://img.icons8.com/external-nawicon-outline-color-nawicon/64/000000/external-receptionist-hotel-nawicon-outline-color-nawicon.png'
      : '',
    data[0].airconditioning === 1
      ? 'https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/64/000000/external-air-conditioning-home-office-photo3ideastudio-flat-photo3ideastudio.png'
      : '',
    data[0].breakfast === 1
      ? 'https://img.icons8.com/officel/80/000000/breakfast.png'
      : '',
  ];

  const listlikeroom1 = useSelector(state => state.listlikeroom);

  const onLikeRoom = () => {
    bookMark1.current = !bookMark1.current;
    bookMark1.current === true
      ? listlikeroom1.indexOf(Id) === -1
        ? dispatch(
            addLike({
              id: Id,
            }),
          )
        : null
      : dispatch(
          deleteLike({
            id: Id,
          }),
        );
  };
  const onBook = () => {
    let promise = new Promise(function (Result, Error) {
      if (bookMark1.current === false) {
        dispatch(
          addLike({
            id: Id,
          }),
        );
        bookMark1.current = !bookMark1.current;
      }
      Result();
      Error();
    });
    promise.then(function () {
      navigation.navigate('Bill');
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Image
        source={{uri: data[0].image}}
        style={{
          width: '100%',
          height: '50%',
          resizeMode: 'cover',
        }}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 999,
          top: 30,
          width: '90%',
          alignSelf: 'center',

          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(route.params ? 'Booking' : 'Bill')
          }>
          <AntDesign name="arrowleft" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLikeRoom}>
          <Ionicons
            name={
              bookMark1.current === true
                ? 'ios-bookmarks'
                : 'ios-bookmarks-outline'
            }
            size={28}
            color={bookMark1.current === true ? 'hsl(205,100%,30%)' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: '100%',
          height: '65%',
          position: 'absolute',
          zIndex: 999,
          bottom: 0,
          alignSelf: 'center',
          backgroundColor: 'white',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 30,
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '95%',
            alignItems: 'flex-start',
          }}>
          <View>
            <Text
              style={{
                fontSize: 25,
                fontWeight: '700',
                color: 'black',
                letterSpacing: 1,
              }}>
              {data[0].no_room}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginVertical: 10,
                alignItems: 'center',
              }}>
              {[0, 0, 0, 0, 0].map((item, index) => {
                if (index <= data[0].rating - 1)
                  return (
                    <Fontisto
                      key={index}
                      name="star"
                      size={24}
                      color="hsl(44,99%,50%)"
                      style={{
                        marginRight: 10,
                      }}
                    />
                  );
                else if (index - data[0].rating + 1 <= 0.5)
                  return (
                    <Fontisto
                      key={index}
                      name="star-half"
                      size={24}
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
                  fontSize: 16,
                  color: 'hsl(0,0%,60%)',
                }}>
                {data[0].rating}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '700',
              }}>
              {data[0].money}$ /per Day
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 18,
            letterSpacing: 1,
            textAlign: 'justify',
            color: 'hsl(0,0%,60%)',
          }}>
          {data[0].decribe}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            marginTop: 10,
            fontWeight: '700',
          }}>
          Most popular facilities
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {datafacility.map((item, index) => {
            if (item !== '')
              return (
                <View
                  key={index}
                  style={{
                    width: 75,
                    height: 50,
                    marginHorizontal: 10,
                    borderRadius: 20,
                    marginVertical: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'hsl(205,100%,90%)',
                  }}>
                  <Image
                    source={{uri: item}}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              );
          })}
        </ScrollView>
        <Pressable onPress={onBook}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 50,
              backgroundColor: '#25A2CA',

              width: '60%',
              alignSelf: 'center',
              borderRadius: 100,
              position: 'relative',
              bottom: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
              }}>
              Book
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default RoomDetail;
