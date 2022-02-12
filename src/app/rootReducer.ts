import {combineReducers} from 'redux';
import calendarSlice from '../features/calendar/calendarSlice';

const rootReducer = combineReducers({
  calendar: calendarSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
