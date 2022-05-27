import React from 'react';
import styled from 'styled-components/native';
import {Heading} from 'native-base';
import {Pressable, TextInput} from 'react-native';

interface Props {
  onChange: (petName?: string) => void;
  currentPetName?: string;
}

function BottomSheetPetName(props: Props) {
  const onChangePetName = (petName?: string) => {
    props.onChange(petName);
  };

  return (
    <>
      <Title>
        <Heading>반려동물의{'\n'}이름을 적어주세요.</Heading>
      </Title>
      <PetText>이름</PetText>
      <PetInput
        onChangeText={text => onChangePetName(text)}
        value={props?.currentPetName}
      />
    </>
  );
}

export default BottomSheetPetName;

const Title = styled.Text`
  margin-bottom: 40px;
`;
const PetText = styled.Text``;
const PetInput = styled(TextInput)`
  border-bottom-width: 2px;
  border-color: black;
`;
const Selection = styled(Pressable)`
  display: flex;
  flex-direction: column;
`;
