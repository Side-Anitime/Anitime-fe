import React from 'react';
import styled from 'styled-components/native';
import {Heading} from 'native-base';
import {Pressable, TextInput} from 'react-native';
import {
  selectPetInfo,
  setPetName,
} from '../../../../features/mypet/petInfoSlice';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../../app/store';

function BottomSheetPetName() {
  const dispatch = useAppDispatch();
  const currentPetName = useSelector(selectPetInfo).name;
  const onSet = (petName: string) => {
    dispatch(setPetName(petName));
  };

  return (
    <>
      <Title>
        <Heading>반려동물의{'\n'}이름을 적어주세요.</Heading>
      </Title>
      <PetText>이름</PetText>
      <PetInput onChangeText={text => onSet(text)} value={currentPetName} />
    </>
  );
}

export default BottomSheetPetName;

const Title = styled.Text`
  margin-bottom: 40px;
`;
const PetText = styled.Text``;
const PetInput = styled(TextInput)`
  border-bottom-width: 1px;
  border-color: black;
`;
