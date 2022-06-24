import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../../app/rootReducer';
import {
  setPetSpecies,
  reset as resetPetInfo,
  setPetName,
  setPetGender,
  setPetBirthDate,
  setPetNeutered,
  setPetMemo,
  setPetFirstMeetDate,
} from '../../../features/mypet/petInfoSlice';

enum PetBottomSheets {
  PETSPECIES,
  PETNAME,
  PETGENDER,
  PETBIRTHDATE,
  PETFIRSTMEETDATE,
  PETNEUTERED,
  PETMEMO,
}

interface BottomSheetPetState {
  currentSheet: PetBottomSheets;
  currentSheetComplete: boolean;
  maxSheetLength: number;
}

const initialState: BottomSheetPetState = {
  currentSheet: 0,
  currentSheetComplete: false,
  maxSheetLength: 7,
};

const bottomSheetPetSlice = createSlice({
  name: 'bottomSheetPet',
  initialState,
  reducers: {
    reset: () => initialState,
    incrementSheet: state => {
      if (state.currentSheet + 1 < state.maxSheetLength) {
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
    [setPetName.type]: (state, action) => {
      if (state.currentSheet === PetBottomSheets.PETNAME) {
        //TODO: naming rule
        if (action.payload.length < 1) {
          state.currentSheetComplete = false;
          return;
        }
        state.currentSheetComplete = true;
      }
    },
    [setPetGender.type]: (state, action) => {
      if (state.currentSheet === PetBottomSheets.PETGENDER) {
        state.currentSheetComplete = true;
      }
    },
    [setPetBirthDate.type]: (state, action) => {
      if (state.currentSheet === PetBottomSheets.PETBIRTHDATE) {
        state.currentSheetComplete = true;
      }
    },
    [setPetFirstMeetDate.type]: (state, action) => {
      if (state.currentSheet === PetBottomSheets.PETFIRSTMEETDATE) {
        state.currentSheetComplete = true;
      }
    },
    [setPetNeutered.type]: (state, action) => {
      if (state.currentSheet === PetBottomSheets.PETNEUTERED) {
        state.currentSheetComplete = true;
      }
    },
    [setPetMemo.type]: (state, action) => {
      if (state.currentSheet === PetBottomSheets.PETMEMO) {
        state.currentSheetComplete = true;
      }
    },
    [resetPetInfo.type]: () => initialState,
  },
});

export const selectCurrentSheet = (state: RootState) =>
  state.bottomSheetPet.currentSheet;

export const selectCurrentSheetComplete = (state: RootState) =>
  state.bottomSheetPet.currentSheetComplete;

export const selectMaxSheetLength = (state: RootState) =>
  state.bottomSheetPet.maxSheetLength;

export const {reset, incrementSheet, decrementSheet, setCurrentSheetComplete} =
  bottomSheetPetSlice.actions;

export default bottomSheetPetSlice;
