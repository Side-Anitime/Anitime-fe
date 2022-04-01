import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import styled from 'styled-components/native';

function BottomSheet({title, height, refRBSheet, list, handleOnPress}) {
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
        <BottomSelectHeader>
          <BottomSelectHeaderText>{title}</BottomSelectHeaderText>
        </BottomSelectHeader>
        {list.map(item => {
          return (
            <BottomSelectRow key={item} onPress={() => onPress(item)}>
              <BottomSelectRowText>{item}</BottomSelectRowText>
            </BottomSelectRow>
          );
        })}
      </Wrapper>
    </RBSheet>
  );
}

export default BottomSheet;

const Wrapper = styled.View`
  display: flex;
`;

const BottomSelectHeader = styled.View`
  display: flex;
  justify-content: center;
  height: 68px;
`;

const BottomSelectHeaderText = styled.Text`
  font-size: 18px;
  padding-left: 30px;
  font-weight: 600;
  color: #000000;
`;

const BottomSelectRow = styled.Pressable`
  flex-direction: row;
  align-items: center;
  height: 52px;
`;

const BottomSelectRowText = styled.Text`
  padding-left: 30px;
  font-size: 15px;
  color: #1d1e02;
`;
