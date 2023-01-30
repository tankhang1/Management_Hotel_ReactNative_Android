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
import {devToolsEnhancer} from 'redux-devtools-extension';
import FacilitiesCheck from './FacilitiesCheck';
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
    facility_check: FacilitiesCheck,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  preloadedState: {
    booking: null,
    id: null,
    bill: [],
    listlikeroom: [],
    collect_Id_Customer: '',
    collect_Id_Employee: '',
    english_level: [],
    list_bill: [],
    data_infor: {
      data: {
        employees: [],
        customers: [],
        currentEmployee: null,
      },
      isLoading: false,
      error: null,
    },
    list_room: {},
    facility_check: [],
  },
  devTools: [devToolsEnhancer({realtime: true})],
});
export default Store;
