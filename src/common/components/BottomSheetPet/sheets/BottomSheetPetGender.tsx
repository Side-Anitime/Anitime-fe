import React from 'react';
import styled from 'styled-components/native';
import {Heading} from 'native-base';
import {Pressable, Text, TextInput, Button} from 'react-native';
import {Gender} from '../../../models';
import {CSSProperties} from 'styled-components';
import {
  selectPetInfo,
  setPetGender,
} from '../../../../features/mypet/petInfoSlice';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../../app/store';

function BottomSheetPetGender() {
  const dispatch = useAppDispatch();
  const currentPetInfo = useSelector(selectPetInfo);
  const onSet = (petGender: Gender) => {
    dispatch(setPetGender(petGender));
  };

  return (
    <>
      <Title>
        <Heading>
          {currentPetInfo.name}의{'\n'}성별을 선택해주세요.
        </Heading>
      </Title>
      <Selection>
        <PetButton
          color={currentPetInfo.gender === 'MALE' ? '#FFA115' : '#c4c4c4'}
          onPress={() => onSet('MALE')}>
          <PetText
            style={{
              color: currentPetInfo.gender === 'MALE' ? '#FFA115' : '#c4c4c4',
            }}>
            남아
          </PetText>
        </PetButton>
        <PetButton
          onPress={() => onSet('FEMALE')}
          color={currentPetInfo.gender === 'FEMALE' ? '#FFA115' : '#c4c4c4'}>
          <PetText
            style={{
              color: currentPetInfo.gender === 'FEMALE' ? '#FFA115' : '#c4c4c4',
            }}>
            여아
          </PetText>
        </PetButton>
      </Selection>
    </>
  );
}

export default BottomSheetPetGender;

interface PetButtonProps {
  color?: CSSProperties['color'];
}
const Title = styled.Text`
  margin-bottom: 40px;
`;

const PetButton = styled(Pressable)<PetButtonProps>`
  height: 48px;
  width: 140px;
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
