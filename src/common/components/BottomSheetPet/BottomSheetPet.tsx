import React, {ReactNode, RefObject} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import styled from 'styled-components/native';
import {Button} from 'native-base';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../app/store';
import {
  BottomSheetPetName,
  BottomSheetPetSpecies,
  BottomSheetPetGender,
  BottomSheetPetBirthDate,
  BottomSheetPetFirstMeetDate,
  BottomSheetPetNeutered,
} from './sheets';
import {PetInfo} from '../../models';
import {reset} from '../../../features/mypet/petInfoSlice';
import {
  selectCurrentSheet,
  selectCurrentSheetComplete,
  incrementSheet,
} from './bottomSheetPetSlice';
import BottomSheetPetMemo from './sheets/BottomSheetPetMemo';

interface Props {
  refRBSheet: RefObject<RBSheet>;
  onComplete: (petInfo: PetInfo) => void;
}

type Sheet = {
  title: ReactNode;
  component: ReactNode;
};

function BottomSheetPet({refRBSheet}: Props) {
  const currentSheet = useSelector(selectCurrentSheet);
  const currentSheetComplete = useSelector(selectCurrentSheetComplete);
  const dispatch = useAppDispatch();

  const sheetList = [
    <BottomSheetPetSpecies />,
    <BottomSheetPetName />,
    <BottomSheetPetGender />,
    <BottomSheetPetBirthDate />,
    <BottomSheetPetFirstMeetDate />,
    <BottomSheetPetNeutered />,
    <BottomSheetPetMemo />,
  ];

  const onCloseBottomSheet = () => {
    dispatch(reset());
  };
  const onPressNextButton = () => {
    dispatch(incrementSheet());
  };

  return (
    <RBSheet
      ref={refRBSheet}
      height={400}
      onClose={() => onCloseBottomSheet()}
      closeOnDragDown={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        container: {
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
        draggableIcon: {
          backgroundColor: '#d4d4d4',
        },
      }}>
      <Wrapper>
        <SheetWrapper>{sheetList[currentSheet]}</SheetWrapper>
        <NextButton>
          <Button
            disabled={!currentSheetComplete}
            onPress={() => onPressNextButton()}
            size="full"
            _text={{
              color: '#FFFFFF',
              fontSize: '20px',
            }}
            style={{
              backgroundColor: currentSheetComplete ? '#FFA115' : '#D2D2D2',
              borderRadius: 0,
            }}>
            다음
          </Button>
        </NextButton>
      </Wrapper>
    </RBSheet>
  );
}
export default BottomSheetPet;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  height: 400px;
`;
const SheetWrapper = styled.View`
  margin: 40px 20px 20px 20px;
`;
const SheetTitle = styled.Text``;

const NextButton = styled(Pressable)`
  width: 100%;
  height: 56px;
  position: absolute;
  bottom: 25px;
`;
