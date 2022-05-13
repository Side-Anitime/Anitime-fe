import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import {Heading, Avatar, Button} from 'native-base';
import {Species} from '../../../models';

interface Props {
  onSelect: (petSpecies: Species) => void;
}
function BottomSheetPetSpecies({onSelect}: Props) {
  const onSelectPetSpecies = (petType: Species) => {
    onSelect(petType);
  };

  return (
    <>
      <Title>
        <Heading>어떤 동물을 키우시나요?</Heading>
      </Title>
      <Selection>
        <DogSelection onPress={() => onSelectPetSpecies('dog')}>
          <DogAva>
            <Avatar
              bg="purple.600"
              alignSelf="center"
              size="2xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
              }}>
              RB
            </Avatar>
          </DogAva>
          <PetText>
            <Heading>강아지</Heading>
          </PetText>
        </DogSelection>
        <CatSelection onPress={() => onSelectPetSpecies('cat')}>
          <CatAvg>
            <Avatar
              bg="purple.600"
              alignSelf="center"
              size="2xl"
              source={{
                uri: 'https://img.huffingtonpost.com/asset/618cc2d026000093123cdf98.jpg?cache=xQWtHHJF1a&ops=scalefit_720_noupscale&format=webp',
              }}>
              RB
            </Avatar>
          </CatAvg>
          <PetText>
            <Heading>고양이</Heading>
          </PetText>
        </CatSelection>
      </Selection>
    </>
  );
}

export default BottomSheetPetSpecies;

const Title = styled.Text`
  text-align: center;
  margin-bottom: 40px;
`;
const Selection = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const DogSelection = styled(Pressable)``;
const CatSelection = styled(Pressable)``;

const DogAva = styled.View``;

const PetText = styled.Text`
  text-align: center;
  margin-top: 10px;
`;

const CatAvg = styled.View``;
