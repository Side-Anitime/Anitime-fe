import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../app/rootReducer';

const initialState = {
  name: '',
  email: '',
  accessToken: '',
  userToken: 'testtoken',
};
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
      state.userToken = action.payload.userToken;
    },
  },
  extraReducers: builder => {},
});

export const selectUserToken = (state: RootState) => state.auth.userToken;

export default authSlice;
