import {combineReducers} from 'redux';
import petInfoSlice from '../features/mypet/petInfoSlice';
import calendarSlice from '../features/calendar/calendarSlice';
import bottomSheetPetSlice from '../common/components/BottomSheetPet/bottomSheetPetSlice';

const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
  petInfo: petInfoSlice.reducer,
  bottomSheetPet: bottomSheetPetSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
