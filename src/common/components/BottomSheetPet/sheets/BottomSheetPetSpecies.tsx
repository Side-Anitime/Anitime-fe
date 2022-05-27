import React from 'react';
import {Pressable} from 'react-native';
import styled from 'styled-components/native';
import {Heading, Avatar, Button} from 'native-base';
import {Species} from '../../../models';
//img
import dogFace from '../../../asstes/UI/dogface.png';
import catFace from '../../../asstes/UI/catface.png';

interface Props {
  onSelect: (petSpecies: Species) => void;
  currentSpecies?: Species;
}
function BottomSheetPetSpecies(props: Props) {
  const onSelectPetSpecies = (petType: Species) => {
    props.onSelect(petType);
  };

  return (
    <>
      <Title>
        <Heading>어떤 동물을 키우시나요?</Heading>
      </Title>
      <Selection>
        <DogSelection onPress={() => onSelectPetSpecies('dog')}>
          <DogAva
            bgColor={props?.currentSpecies === 'dog' ? '#FFA115' : '#F2F2F2'}
            alignSelf="center"
            size="2xl"
            source={dogFace}
            //FIXME: correct adjustments after getting unified image sizes. As of now the images are incoherent
            safeArea={5}>
            RB
          </DogAva>
          <PetText>
            <Heading>강아지</Heading>
          </PetText>
        </DogSelection>
        <CatSelection onPress={() => onSelectPetSpecies('cat')}>
          <CatAva
            bgColor={props?.currentSpecies === 'cat' ? '#FFA115' : '#F2F2F2'}
            alignSelf="center"
            size="2xl"
            source={catFace}>
            RB
          </CatAva>
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

const DogAva = styled(Avatar)``;

const PetText = styled.Text`
  text-align: center;
  margin-top: 10px;
`;

const CatAva = styled(Avatar)``;
