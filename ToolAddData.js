import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  addDoc,
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
      tmp.push({no_room: doc.data().no_room, money: doc.data().da});
    });
    setList([...tmp]);
  };
  const Caluated = async () => {
    let sum = 0;
    List.map((item, index) => {
      sum += Number(item.Money);
    });
    let sophong = Math.floor(Math.random() * 4) + 1;
    let maphong = [{}, {}, {}];

    for (let i = 0; i < sophong; i++) {
      maphong.push(List[Math.floor()].no_room);
    }
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
  let TemplateObject = {
    Address: '',
    Age: '',
    Birthday: '',
    Date_Join: '',
    Email: '',
    Employee_Id: '',
    Employee_Image: '',
    Employee_Name: '',
    Gender: '',
    Identification: '',
    Level: 0,
    List_Date_Off: [],
    List_Date_Off_NoAdmit: [],
    List_Date_Work: [],
    List_Date_WorkOvertime: [],
    List_Skill_Id: [
      {
        x: 'Reading',
        y: 0,
      },
      {
        x: 'Writting',
        y: 0,
      },
      {
        x: 'Listening',
        y: 0,
      },
      {
        x: 'Speaking',
        y: 0,
      },
    ],
    Nationality: '',
    Phone: '',
    Position: '',
    Salary: 0,
  };

  const AddDbEmployee = () => {
    for (let i = 0; i < 80; i++) {}
  };
  const [key, setKey] = useState('');

  const RandomDateOff = [
    Math.floor(Math.random() * 20) + 5,
    Math.floor(Math.random() * 20) + 5,
    Math.floor(Math.random() * 20) + 5,
    Math.floor(Math.random() * 20) + 5,
    Math.floor(Math.random() * 20) + 5,
  ];
  const RandomDateOff_NoAddmit = [];
  const AddDataDateWork = async () => {
    let RandomDateOff = [];
    for (let i = 0; i < 4; i++) {
      let tmp = Math.floor(Math.random() * 28) + 1;
      while (RandomDateOff.includes(tmp)) {
        tmp = Math.floor(Math.random() * 28) + 1;
      }
      RandomDateOff.push(tmp);
    }
    let RandomDateOff_NoAddmit = [];
    for (let i = 0; i < 2; i++) {
      let tmp = Math.floor(Math.random() * 28) + 1;
      while (
        RandomDateOff.includes(tmp) ||
        RandomDateOff_NoAddmit.includes(tmp)
      ) {
        tmp = Math.floor(Math.random() * 28) + 1;
      }
      RandomDateOff_NoAddmit.push(tmp);
    }
    let List_Date_WorkOvertime = [];
    for (let i = 0; i < 10; i++) {
      let tmp = Math.floor(Math.random() * 28) + 1;
      while (
        RandomDateOff.includes(tmp) ||
        RandomDateOff_NoAddmit.includes(tmp) ||
        List_Date_WorkOvertime.includes(tmp)
      ) {
        tmp = Math.floor(Math.random() * 28) + 1;
        console.log(tmp);
      }
      List_Date_WorkOvertime.push(tmp);
    }
    let DateWork = [];
    for (let i = 0; i < datamonth - 4 - 2 - 10; i++) {
      let tmp = Math.floor(Math.random() * datamonth) + 1;
      while (
        RandomDateOff.includes(tmp) ||
        RandomDateOff_NoAddmit.includes(tmp) ||
        List_Date_WorkOvertime.includes(tmp) ||
        DateWork.includes(tmp)
      ) {
        tmp = Math.floor(Math.random() * datamonth) + 1;
      }
      DateWork.push(tmp);
    }
    DateWork.map(async item => {
      await addDoc(
        collection(db, 'Employee_Information', 'E000001', 'List_Date_Work'),
        {
          Date: new Timestamp.fromDate(new Date(`2023-01-${item}`)),
        },
      );
    });
    RandomDateOff.map(async item => {
      await addDoc(
        collection(db, 'Employee_Information', 'E000001', 'List_Date_Off'),
        {
          Date: new Timestamp.fromDate(new Date(`2023-01-${item}`)),
        },
      );
    });
    RandomDateOff_NoAddmit.map(async item => {
      await addDoc(
        collection(
          db,
          'Employee_Information',
          'E000001',
          'List_Date_Off_NoAdmit',
        ),
        {
          Date: new Timestamp.fromDate(new Date(`2023-01-${item}`)),
        },
      );
    });
    List_Date_WorkOvertime.map(async item => {
      await addDoc(
        collection(
          db,
          'Employee_Information',
          'E000001',
          'List_Date_WorkOvertime',
        ),
        {
          Date: new Timestamp.fromDate(new Date(`2023-01-${item}`)),
        },
      );
    });
  };
  const datamonth = 30;
  const month = 12;
  return (
    <View>
      <TouchableOpacity onPress={AddDataDateWork}>
        <Text>add DateWork</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={UpdateMonthly}>
        <Text>update monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={AddMonth}>
        <Text>add monthly</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          console.log(list);
          c;
        }}>
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
