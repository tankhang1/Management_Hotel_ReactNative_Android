import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  addDoc,
  doc,
  getDoc,
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
  const [dataRoom, setDataRoom] = useState([]);
  const collectDataRoom = async () => {
    const q = collection(db, 'DataRoom');
    const snapShot = getDocs(q);
    let tmp = [];
    (await snapShot).forEach(doc => {
      tmp.push(doc.data());
    });
    setDataRoom([...tmp]);
  };
  const solveDataRoom = () => {
    dataRoom.map(async (item, index) => {
      // let facility = [];
      // if (item.airconditioning === 1) {
      //   facility.push('airconditioning');
      // }
      // if (item.breakfast === 1) {
      //   facility.push('breakfast');
      // }
      // if (item.receptionist === 1) {
      //   facility.push('receptionist');
      // }
      // if (item.service === 1) {
      //   facility.push('service');
      // }
      // if (item.wifi === 1) {
      //   facility.push('wifi');
      // }
      // const Room = {
      //   id: item.id,
      //   image: item.image,
      //   kind: item.kind,
      //   money: item.money,
      //   no_room: item.no_room,
      //   rating: item.rating,
      //   decription: item.decription,
      //   facility: facility,
      //   status: item.status,
      //   dateTo: item.dateTo,
      //   dateFrom: item.dateFrom,
      // };
      // console.log(Room);
      await setDoc(doc(db, 'DataRoom', item.id), item);
    });
  };
  const upDateNo_Room = () => {
    dataRoom.map(async (item, index) => {
      await updateDoc(doc(db, 'DataRoom', item.id), {
        no_room: `R_${index}`,
      });
    });
  };

  const [bills, setBills] = useState([]);

  const collectBills = async () => {
    console.log('OK');
    const q = collection(db, 'Bill_List');
    const snapShot = await getDocs(q);
    let tmp = [];
    snapShot.forEach(doc => {
      tmp.push(doc.data());
    });
    setBills([...tmp]);
  };

  const [dailyURL, setDailyURL] = useState([]);
  const collectDaily = async () => {
    const q = collection(
      db,
      `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly/785ecb5c-a086-4208-b93f-222d929cb84d/Revenue_Daily`,
    );
    const snapShot = await getDocs(q);
    let tmp = [];
    snapShot.forEach(doc => {
      tmp.push(doc.id);
    });
    setDailyURL([...tmp]);
  };
  console.log(dailyURL);
  const datamonth = 30;
  const month = 12;

  const updateDaily = async () => {
    dailyURL.map(async id => {
      let bill = [];
      for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
        bill.push(bills[Math.floor(Math.random() * bills.length - 1)].Bill_Id);
      }

      await updateDoc(
        doc(
          db,
          `/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly/785ecb5c-a086-4208-b93f-222d929cb84d/Revenue_Daily/${id}`,
        ),
        {
          List_Bill: bill,
        },
      );
    });
  };

  const [idRevenueMonth, setIdRevenueMonth] = useState([]);
  const collectMonthly = async () => {
    const q = collection(db, '/Revenue/bKypk6E9kcOQZqzu9CZq/Revenue_Monthly');
    const snapShot = await getDocs(q);
    let tmp = [];
    snapShot.forEach(doc => {
      tmp.push(doc.id);
    });
    setIdRevenueMonth([...tmp]);
  };
  console.log(idRevenueMonth);
  return (
    <View>
      <TouchableOpacity onPress={collectMonthly}>
        <Text>collect month</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log(dataRoom)}>
        <Text>console log dataroom</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={upDateNo_Room}>
        <Text>update Room</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={collectBills}>
        <Text>collect bill</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log(bills)}>
        <Text>console log bill</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={collectDaily}>
        <Text>daily URL</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={updateDaily}>
        <Text>update daily</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToolAddData;
