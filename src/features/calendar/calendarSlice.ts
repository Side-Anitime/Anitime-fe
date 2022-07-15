import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';

export const getColors = async () => {
  const res = await axios.get(`${Config.API_HOST}/plan/colors`);
  return res.data;
};

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
