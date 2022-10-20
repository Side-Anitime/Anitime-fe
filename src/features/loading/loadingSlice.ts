import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/rootReducer';

const initialState = true;

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    toggleLoading: state => !state,
    setLoading: (state, {payload}: PayloadAction<boolean>) => {
      state = payload;
      return state;
    },
  },
  extraReducers: builder => {},
});

export default loadingSlice;

export const selectLoading = (state: RootState) => state.loading;
export const {toggleLoading, setLoading} = loadingSlice.actions;
