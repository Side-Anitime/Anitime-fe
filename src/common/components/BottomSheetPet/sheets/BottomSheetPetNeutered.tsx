import React from 'react';
import styled from 'styled-components/native';
import {Heading} from 'native-base';
import {Pressable, Text, TextInput, Button} from 'react-native';
import {Gender, Species} from '../../../models';
import {CSSProperties} from 'styled-components';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../../app/store';
import {
  selectPetInfo,
  setPetNeutered,
  setPetSpecies,
} from '../../../../features/mypet/petInfoSlice';

function BottomSheetPetNeutered() {
  const dispatch = useAppDispatch();
  const currentPetInfo = useSelector(selectPetInfo);
  const onSet = (petNeutered: string) => {
    dispatch(setPetNeutered(petNeutered));
  };

  return (
    <>
      <Title>
        <Heading>
          {currentPetInfo.name}의{'\n'}중성화 여부를 선택해주세요.
        </Heading>
      </Title>
      <Selection>
        <PetButton
          color={currentPetInfo.isNeutered === 'Y' ? '#FFA115' : '#c4c4c4'}
          onPress={() => onSet('Y')}>
          <PetText>예</PetText>
        </PetButton>
        <PetButton
          onPress={() => onSet('N')}
          color={currentPetInfo.isNeutered === 'N' ? '#FFA115' : '#c4c4c4'}>
          <PetText>아니요</PetText>
        </PetButton>
        <PetButton
          onPress={() => onSet('')}
          color={currentPetInfo.isNeutered === '' ? '#FFA115' : '#c4c4c4'}>
          <PetText>몰라요</PetText>
        </PetButton>
      </Selection>
    </>
  );
}

export default BottomSheetPetNeutered;

interface PetButtonProps {
  color?: CSSProperties['color'];
}
const Title = styled.Text`
  margin-bottom: 40px;
`;

const PetButton = styled(Pressable)<PetButtonProps>`
  height: 48px;
  width: 100px;
  background-color: #fff;
  border-color: ${props => props.color};
  border-width: 1px;
  border-radius: 30px;
  justify-content: center;
`;
const PetText = styled.Text`
  text-align: center;
`;

const Selection = styled.View`
  width: 100%;
  margin-top: 30px;
  flex-direction: row;

  justify-content: space-evenly;
`;
