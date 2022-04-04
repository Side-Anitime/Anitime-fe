import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import styled from 'styled-components/native';
import {Button} from 'native-base';

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
        <Button>고양이 이미지</Button>
        <Button>개 이미지</Button>
      </Wrapper>
    </RBSheet>
  );
}

export default BottomSheetPetType;

const Wrapper = styled.View`
  display: flex;
`;
