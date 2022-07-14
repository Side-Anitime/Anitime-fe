import {combineReducers} from 'redux';
import petInfoSlice from '../features/mypet/petInfoSlice';
import calendarSlice from '../features/calendar/calendarSlice';
import bottomSheetPetSlice from '../common/components/BottomSheetPet/bottomSheetPetSlice';
import loadingSlice from '../features/loading/loadingSlice';

const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
  petInfo: petInfoSlice.reducer,
  loading: loadingSlice.reducer,
  bottomSheetPet: bottomSheetPetSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
