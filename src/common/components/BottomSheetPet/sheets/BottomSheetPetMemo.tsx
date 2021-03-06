import React from 'react';
import styled from 'styled-components/native';
import {Heading} from 'native-base';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../../../../app/store';
import {Pressable, Text, TextInput, Button} from 'react-native';
import {CSSProperties} from 'styled-components';
import {
  selectPetInfo,
  setPetMemo,
} from '../../../../features/mypet/petInfoSlice';

function BottomSheetPetMemo() {
  const dispatch = useAppDispatch();
  const currentPetInfo = useSelector(selectPetInfo);
  const onSet = (petMemo?: string) => {
    dispatch(setPetMemo(petMemo));
  };

  return (
    <>
      <Title>
        <Heading>{currentPetInfo.name}를 소개해주세요.</Heading>
      </Title>
      <PetText>하고싶은 말이나 다짐을 써도 좋아요.</PetText>
      <PetInput
        onChangeText={text => onSet(text)}
        value={currentPetInfo.shortIntroduce}
        style={{color: !currentPetInfo ? '#C4C4C4' : '#000'}}
        placeholder={'보리야 하루에 한번씩은 꼭 산책하자'}
      />
    </>
  );
}

export default BottomSheetPetMemo;

interface PetButtonProps {
  color?: CSSProperties['color'];
}
const Title = styled.Text`
  margin-bottom: 40px;
`;

const PetText = styled.Text`
  margin-bottom: 10px;
`;
const PetInput = styled(TextInput)`
  border-bottom-width: 1px;
  border-color: black;
`;
