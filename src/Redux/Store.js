import {configureStore} from '@reduxjs/toolkit';
import InforBooking from './InforBooking';
import ManageId from './ManageId';
import ManageBill from './ManageBill';
import ListLikeRoom from './ListLikeRoom';
import Collect_ID_Customer_Profile from './Collect_ID_Customer_Profile';
import English_Level from './English_Level';
import Collect_ID_Employee from './Collect_ID_Employee';
import {dataReducer} from './slices/dataSlice';
import {dataBills} from './slices/dataBills';
import {dataRooms} from './slices/dataRoom';
const Store = configureStore({
  reducer: {
    booking: InforBooking,
    id: ManageId,
    bill: ManageBill,
    listlikeroom: ListLikeRoom,
    collect_Id_Customer: Collect_ID_Customer_Profile,
    collect_Id_Employee: Collect_ID_Employee,
    english_level: English_Level,
    list_bill: dataBills,
    data_infor: dataReducer,
    list_room: dataRooms,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export default Store;
