import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';

export const getColors = async () => {
  const res = await axios.get(`${Config.API_HOST}/plan/colors`);
  return res.data;
};

export const getPlans = async (
  year: string,
  month: string,
  userToken: string,
) => {
  try {
    const res = await axios.get(
      `${Config.API_HOST}/plan/calendar-view/{year}/{month}/{userToken}?year=${year}&month=${month}&userToken=${userToken}`,
    );
    return Object.assign({}, ...res.data.data);
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  selectedDate: {},
  curMonthPlans: {},
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    setCurMonthPlans(state, action) {
      state.curMonthPlans = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setSelectedDate, setCurMonthPlans} = calendarSlice.actions;

export default calendarSlice;
