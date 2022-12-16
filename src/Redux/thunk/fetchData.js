import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, getDocs} from 'firebase/firestore';
import moment from 'moment';
import {db} from '../../Firebase/firebase';
import {getAuth} from 'firebase/auth';

const fetchData = createAsyncThunk('datas/fetch', async () => {
  let tmp = {
    employees: [],
    customers: [],
    bills: [],
    rooms: [],
    currentEmployee: null,
  };
  const auth = getAuth();
  const user = auth.currentUser;
  const employees = await getDocs(collection(db, 'Employee_Information'));
  employees.forEach(doc => {
    if (doc.data().Email == user.email) tmp.currentEmployee = doc.data();
    tmp.employees.push(doc.data());
  });
  const customers = await getDocs(collection(db, 'Customer_Information'));
  customers.forEach(doc => {
    tmp.customers.push(doc.data());
  });
  const bills = await getDocs(collection(db, 'Bill_List'));
  bills.forEach(doc => {
    tmp.bills.push(doc.data());
  });
  const rooms = await getDocs(collection(db, 'DataRoom'));
  rooms.forEach(doc => {
    tmp.rooms.push(doc.data());
  });

  return tmp;
});

export {fetchData};
