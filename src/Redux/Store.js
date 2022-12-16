import {configureStore} from '@reduxjs/toolkit';
import InforBooking from './InforBooking';
import ManageId from './ManageId';
import ManageBill from './ManageBill';
import ListLikeRoom from './ListLikeRoom';
import Collect_ID_Customer_Profile from './Collect_ID_Customer_Profile';
import English_Level from './English_Level';
import Collect_ID_Employee from './Collect_ID_Employee';
import {dataReducer} from './slices/dataSlice';
const Store = configureStore({
  reducer: {
    booking: InforBooking,
    id: ManageId,
    bill: ManageBill,
    listlikeroom: ListLikeRoom,
    collect_Id_Customer: Collect_ID_Customer_Profile,
    collect_Id_Employee: Collect_ID_Employee,
    english_level: English_Level,
    data_infor: dataReducer,
  },
});
export default Store;
