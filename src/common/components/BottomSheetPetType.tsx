import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import {Pressable} from 'react-native';
import {Heading, Avatar, Button} from 'native-base';
import styled from 'styled-components';

function BottomSheetPetType({height, refRBSheet, handleOnPress}) {
  const onPress = item => {
    handleOnPress(item);
    refRBSheet.current.close();
  };

  return (
    <RBSheet
      height={height}
      ref={refRBSheet}
      closeOnDragDown={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
        container: {
          borderRadius: 10,
        },
        draggableIcon: {
          backgroundColor: '#d4d4d4',
        },
      }}>
      <Wrapper>
        <Title>
          <Heading>어떤 동물을 키우시나요?</Heading>
        </Title>

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
        <DogText>
          <Heading>강아지</Heading>
        </DogText>
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
        <CatText>
          <Heading>고양이</Heading>
        </CatText>
        <NextButton>
          <Button
            size="full"
            _text={{
              color: '#FFFFFF',
              fontSize: '20px',
            }}
            style={{
              backgroundColor: '#FFA115',
            }}>
            다음
          </Button>
        </NextButton>
      </Wrapper>
    </RBSheet>
  );
}

export default BottomSheetPetType;

const Wrapper = styled.View`
  display: flex;
`;

const Title = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 344px;
  height: 64px;
  left: 60px;
  top: 35px;
`;

const DogAva = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 20px;
  height: 14px;
  left: 85px;
  top: 100px;
`;

const DogText = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 70px;
  height: 34px;
  left: 60px;
  top: 240px;
`;

const CatAvg = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 70px;
  height: 34px;
  left: 220px;
  top: 100px;
`;

const CatText = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 70px;
  height: 34px;
  left: 227px;
  top: 240px;
`;

const NextButton = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 375px;
  height: 56px;
  left: 0px;
  top: 320px;
`;
