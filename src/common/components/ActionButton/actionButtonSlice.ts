import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../app/rootReducer';

export type ActionButtonState = boolean[];

const initialState: ActionButtonState = [false, false, false];

const actionButtonSlice = createSlice({
  name: 'actionButtonSlice',
  initialState,
  reducers: {
    setButton: (state, {payload}: PayloadAction<number>) => {
      state.splice(payload, 1, true);
      return state;
    },
    resetButton: () => initialState,
  },
});
export const selectActionButton = (state: RootState) => state.actionButton;

export const {setButton, resetButton} = actionButtonSlice.actions;

export default actionButtonSlice;
