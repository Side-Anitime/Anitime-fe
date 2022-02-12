import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: '',
  date: '',
  color: '',
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCalendar(state, action) {
      state.title = action.payload.title;
      state.date = action.payload.date;
      state.color = action.payload.color;
    },
  },
  extraReducers: builder => {},
});

export default calendarSlice;
