import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../app/rootReducer';
import {setPetSpecies} from '../../../features/mypet/petInfoSlice';

enum PetBottomSheets {
  PETSPECIES,
  PETNAME,
}

interface BottomSheetPetState {
  currentSheet: PetBottomSheets;
  currentSheetComplete: boolean;
  maxSheetLength: number;
}

const initialState: BottomSheetPetState = {
  currentSheet: 0,
  currentSheetComplete: false,
  maxSheetLength: 1,
};

const bottomSheetPetSlice = createSlice({
  name: 'bottomSheetPet',
  initialState,
  reducers: {
    reset: () => initialState,
    incrementSheet: state => {
      if (state.currentSheet < state.maxSheetLength) {
        state.currentSheet += 1;
        state.currentSheetComplete = false;
      }
    },
    decrementSheet: state => {
      if (state.currentSheet > 0) {
        state.currentSheet -= 1;
      }
    },
    setCurrentSheetComplete: (state, {payload}: PayloadAction<boolean>) => {
      state.currentSheetComplete = payload;
    },
  },
  extraReducers: {
    [setPetSpecies.type]: (state, action) => {
      if (state.currentSheet === PetBottomSheets.PETSPECIES) {
        state.currentSheetComplete = true;
      }
    },
  },
});

export const selectCurrentSheet = (state: RootState) =>
  state.bottomSheetPet.currentSheet;

export const selectCurrentSheetComplete = (state: RootState) =>
  state.bottomSheetPet.currentSheetComplete;

export const {reset, incrementSheet, decrementSheet, setCurrentSheetComplete} =
  bottomSheetPetSlice.actions;

export default bottomSheetPetSlice;
