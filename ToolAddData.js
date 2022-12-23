import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {doc, query, setDoc, Timestamp, where} from 'firebase/firestore';
import {uuidv4} from '@firebase/util';
import {db} from './src/Firebase/firebase';
import {collection, getDocs} from 'firebase/firestore';
import {listenerCancelled} from '@reduxjs/toolkit/dist/listenerMiddleware/exceptions';
import moment from 'moment';
const ToolAddData = () => {
  const AddData = async () => {
    for (let i = 1; i <= datamonth; i++) {
      const Id = uuidv4();
      const date = `2022-${month}-${i}`;
      const randomHour1 = Math.floor(Math.random() * 9) + 4;
      const randomHour2 = Math.floor(Math.random() * 24) + 13;
      const Data = {
        Id: Id,
        Date: new Timestamp(new Date(`${date} 00:00:00`).getTime() / 1000, 0),
        Arrival: new Timestamp(
          new Date(`${date} ${randomHour1}:34:00`).getTime() / 1000,
          0,
        ),
        Depart: new Timestamp(
          new Date(`${date} ${randomHour2}:34:00`).getTime() / 1000,
          0,
        ),
      };
      await setDoc(
        doc(db, 'Employee/l3TLUDx5ltEro8H1NivH/Calendar_Work', Id),
        Data,
      );
    }
  };
  const [List, setList] = useState([]);
  const GetDataCaculate = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(db, 'Employee/l3TLUDx5ltEro8H1NivH/Calendar_Work'),
        where('Date', '>=', new Date(`2022-${month}-1`)),
        where('Date', '<=', new Date(`2022-${month}-${datamonth}`)),
      ),
    );

    let tmp = [];
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      // doc.data() is never undefined for query doc snapshots
      tmp.push({
        Id: doc.data().Id,
        Arrival: doc.data().Arrival,
        Date: doc.data().Date,
        Depart: doc.data().Depart,
      });
    });
    setList([...tmp]);
  };
  const Caluated = async () => {
    let workovertime = 0;
    let date_work = List.length;
    let date_off = datamonth - date_work;
    console.log('date off', date_off);
    console.log('date work', date_work);
    const Id = uuidv4();
    const date = `2022-${month}-${1}`;

    List.map((item, index) => {
      console.log(
        moment(item.Depart.toDate()).format('DD/MM/YYYY, h:mm:ss a'),
        moment(item.Arrival.toDate()).format('DD/MM/YYYY, h:mm:ss a'),
      );
      workovertime += (item.Depart - item.Arrival) / 3600;
    });
    const Data = {
      HourWorkOvertime: workovertime - 8 * datamonth,
      Id: Id,
      Month: new Timestamp(new Date(`${date} 00:00:00`).getTime() / 1000, 0),
      Number_Date_Off: date_off,
      Number_Date_Work: date_work,
      Total_Salary: (workovertime - 8 * datamonth) * 80 + 6000,
    };

    await setDoc(
      doc(db, 'Employee/l3TLUDx5ltEro8H1NivH/Salary_Monthly', Id),
      Data,
    );
  };
  console.log(List.length);
  const datamonth = 31;
  const month = 9;
  return (
    <View>
      <TouchableOpacity onPress={AddData}>
        <Text>add</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={GetDataCaculate}>
        <Text>get</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Caluated}>
        <Text>caculate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToolAddData;
