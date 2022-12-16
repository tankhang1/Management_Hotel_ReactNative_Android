import {getApps, initializeApp} from 'firebase/app';
import {getAuth, initializeAuth} from 'firebase/auth';
import {initializeFirestore} from 'firebase/firestore';
import {getReactNativePersistence} from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDHj8DJkeBuXKD355jqCXzEFEtuaLnmz5s',
  authDomain: 'hotelmanagement-dd856.firebaseapp.com',
  projectId: 'hotelmanagement-dd856',
  storageBucket: 'hotelmanagement-dd856.appspot.com',
  messagingSenderId: '903008575577',
  appId: '1:903008575577:web:c6bf79c76bf3a9df9e9148',
  measurementId: 'G-JM59920WK5',
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {auth, db};
