import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/rootReducer';
import {PetInfo} from '../../common/models';

const initialState: PetInfo = {
  id: '',
  regDate: '',
};

const petInfoSlice = createSlice({
  name: 'petInfo',
  initialState,
  reducers: {
    reset: () => initialState,
    setPetInfo: (state, {payload}: PayloadAction<PetInfo>) => payload,
    setPetSpecies: (state, {payload}: PayloadAction<PetInfo['species']>) => {
      state.species = payload;
    },
    setPetName: (state, {payload}: PayloadAction<PetInfo['name']>) => {
      state.name = payload;
    },
    setPetGender: (state, {payload}: PayloadAction<PetInfo['gender']>) => {
      state.gender = payload;
    },
    setPetBirthDate: (
      state,
      {payload}: PayloadAction<PetInfo['birthDate']>,
    ) => {
      state.birthDate = payload;
    },
    setPetFirstMeetDate: (
      state,
      {payload}: PayloadAction<PetInfo['firstMeetDate']>,
    ) => {
      state.firstMeetDate = payload;
    },
    setPetNeutered: (
      state,
      {payload}: PayloadAction<PetInfo['isNeutered']>,
    ) => {
      state.isNeutered = payload;
    },
    setPetMemo: (state, {payload}: PayloadAction<PetInfo['memo']>) => {
      state.memo = payload;
    },
  },
  extraReducers: builder => {},
});

export const selectPetInfo = (state: RootState) => state.petInfo;

export const {
  reset,
  setPetSpecies,
  setPetName,
  setPetGender,
  setPetBirthDate,
  setPetFirstMeetDate,
  setPetNeutered,
  setPetMemo,
} = petInfoSlice.actions;

export default petInfoSlice;
