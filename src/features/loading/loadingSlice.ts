import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/rootReducer';

const initialState = false;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    toggleLoading: state => !state,
  },
  extraReducers: builder => {},
});

export default loadingSlice;

export const selectLoading = (state: RootState) => state.loading;
export const {toggleLoading} = loadingSlice.actions;
