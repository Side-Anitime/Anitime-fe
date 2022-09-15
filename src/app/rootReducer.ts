import {combineReducers} from 'redux';
import petInfoSlice from '../features/mypet/petInfoSlice';
import calendarSlice from '../features/calendar/calendarSlice';
import bottomSheetPetSlice from '../common/components/BottomSheetPet/bottomSheetPetSlice';
import loadingSlice from '../features/loading/loadingSlice';
import authSlice from '../features/auth/authSlice';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  calendar: calendarSlice.reducer,
  petInfo: petInfoSlice.reducer,
  loading: loadingSlice.reducer,
  bottomSheetPet: bottomSheetPetSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
