import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/rootReducer';
import {PetInfo} from '../../common/models';

const initialState: PetInfo = {};

const petInfoSlice = createSlice({
  name: 'petInfo',
  initialState,
  reducers: {
    reset: () => initialState,
    setPetInfo: (state, {payload}: PayloadAction<PetInfo>) => payload,
    setPetSpecies: (state, {payload}: PayloadAction<PetInfo['type']>) => {
      state.type = payload;
    },
    setPetName: (state, {payload}: PayloadAction<PetInfo['name']>) => {
      state.name = payload;
    },
    setPetGender: (state, {payload}: PayloadAction<PetInfo['gender']>) => {
      state.gender = payload;
    },
    setPetBirthday: (state, {payload}: PayloadAction<PetInfo['birthday']>) => {
      state.birthday = payload;
    },
    setPetFirstMeetDate: (
      state,
      {payload}: PayloadAction<PetInfo['firstMeetDate']>,
    ) => {
      state.firstMeetDate = payload;
    },
    setPetNeutered: (state, {payload}: PayloadAction<PetInfo['neuterYn']>) => {
      state.neuterYn = payload;
    },
    setPetMemo: (
      state,
      {payload}: PayloadAction<PetInfo['shortIntroduce']>,
    ) => {
      state.shortIntroduce = payload;
    },
  },
});

export const selectPetInfo = (state: RootState) => state.petInfo;

export const {
  reset,
  setPetInfo,
  setPetSpecies,
  setPetName,
  setPetGender,
  setPetBirthday,
  setPetFirstMeetDate,
  setPetNeutered,
  setPetMemo,
} = petInfoSlice.actions;

export default petInfoSlice;
