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
  },
  extraReducers: builder => {},
});

export const selectPetInfo = (state: RootState) => state.petInfo;

export const {reset, setPetSpecies, setPetName} = petInfoSlice.actions;

export default petInfoSlice;
