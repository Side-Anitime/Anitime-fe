import RBSheet from 'react-native-raw-bottom-sheet';
import React from 'react';
import styled from 'styled-components/native';

interface BottomSheetProps {
  children: React.ReactNode;
  title: string;
  titlePosition?: string;
  height?: number;
  refRBSheet?: React.RefObject<RBSheet>;
}

function BottomSheet({
  children,
  title,
  titlePosition,
  height,
  refRBSheet,
}: BottomSheetProps) {
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
        <BottomSelectHeader titlePosition={titlePosition}>
          <BottomSelectHeaderText>{title}</BottomSelectHeaderText>
        </BottomSelectHeader>
        {children}
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
  align-items: ${({titlePosition}) => titlePosition};
  justify-content: center;
  height: 68px;
`;

const BottomSelectHeaderText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #000000;
`;
