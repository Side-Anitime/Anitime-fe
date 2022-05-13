import React from 'react';
import styled from 'styled-components/native';
import {Heading, Input} from 'native-base';
import {Pressable, TextInput} from 'react-native';

function BottomSheetPetName() {
  return (
    <>
      <Title>
        <Heading>반려동물의{'\n'}이름을 적어주세요</Heading>
      </Title>
      <PetText>이름</PetText>
      <PetInput />
    </>
  );
}

export default BottomSheetPetName;

const Title = styled.Text`
  margin-bottom: 40px;
`;
const PetText = styled.Text``;
const PetInput = styled.TextInput`
  border-bottom-width: 2px;
  border-color: black;
`;
const Selection = styled(Pressable)`
  display: flex;
  flex-direction: column;
`;
