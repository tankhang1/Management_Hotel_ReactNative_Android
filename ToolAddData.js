import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  doc,
  query,
  queryEqual,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
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
      const Data = {
        key: Id,
        Date: new Timestamp.fromDate(new Date(date)),
        Money: Math.floor(Math.random() * 3000) + 300,
      };
      await setDoc(
        doc(
          db,
          `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly/${key}/Revenue_Daily`,
          Id,
        ),
        Data,
      );
    }
  };
  const [List, setList] = useState([]);
  const GetDataCaculate = async () => {
    const querySnapshot = await getDocs(
      query(
        collection(
          db,
          `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly/${key}/Revenue_Daily`,
        ),
      ),
    );

    let tmp = [];
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      // doc.data() is never undefined for query doc snapshots
      tmp.push(doc.data());
    });
    setList([...tmp]);
  };
  const Caluated = async () => {
    let sum = 0;
    List.map((item, index) => {
      sum += Number(item.Money);
    });
    return sum;
  };

  const UpdateMonthly = async () => {
    console.log(List);
    let sum = 0;
    List.map((item, index) => {
      sum += Number(item.Money);
    });
    console.log(sum);
    const Id = uuidv4();
    const date = `2022-${month}-${datamonth}`;
    const Data = {
      key: Id,
      Date: new Timestamp.fromDate(new Date(date)),
      Income: sum,
      Outcome: Math.floor(Math.random() * 2000) + 1000,
    };
    console.log(Data);
    await updateDoc(
      doc(db, `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly/${key}`),
      {
        key: Id,
        Date: new Timestamp.fromDate(new Date(date)),
        Income: sum,
        Outcome: Math.floor(Math.random() * 2000) + 1000,
      },
    );
  };
  console.log(List.length);
  const datamonth = 30;
  const month = 12;
  const AddMonth = async () => {
    const Id = uuidv4();
    setKey(Id);
    const date = `2022-${month}-${datamonth}`;
    const Data = {
      key: Id,
      Date: new Timestamp.fromDate(new Date(date)),
      Income: Math.floor(Math.random() * 3000) + 300,
      Outcome: Math.floor(Math.random() * 3000) + 300,
    };
    await setDoc(
      doc(db, '/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly', Id),
      Data,
    );
  };
  const [getListMonth, setListMonth] = useState([]);
  const getMonth = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly`)),
    );

    let tmp = [];
    querySnapshot.forEach(doc => {
      console.log(doc.data());
      // doc.data() is never undefined for query doc snapshots
      tmp.push(doc.data());
    });
    setListMonth([...tmp]);
  };
  const UpdateYear = async () => {
    console.log(getListMonth);
    let income = 0;
    let outcome = 0;
    getListMonth.map((item, index) => {
      income += Number(item.Income);
      outcome += Number(item.Outcome);
    });
    console.log(income, outcome);
    const Id = uuidv4();
    const date = `2022-12-31`;

    await updateDoc(doc(db, `/Revenue/bKypk6E9kcOQZqzu9CZq`), {
      key: Id,
      Date: new Timestamp.fromDate(new Date(date)),
      Income: income,
      Outcome: outcome,
    });
  };
  const [key, setKey] = useState('');
  return (
    <View>
      <TouchableOpacity onPress={AddData}>
        <Text>add daily</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={UpdateMonthly}>
        <Text>update monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={AddMonth}>
        <Text>add monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={GetDataCaculate}>
        <Text>get</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Caluated}>
        <Text>caculate</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getMonth}>
        <Text>get Month</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={UpdateYear}>
        <Text>update year</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToolAddData;
