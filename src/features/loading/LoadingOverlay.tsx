import {ScreenHeight, ScreenWidth} from '@rneui/base';
import {Spinner} from 'native-base';
import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

function LoadingOverlay() {
  return (
    <Wrapper>
      <MessageBox>
        {/* <Message>LOADING</Message> */}
        <Spinner color="indigo.500" size="lg" />
      </MessageBox>
    </Wrapper>
  );
}

export default LoadingOverlay;

const Wrapper = styled.View`
  position: absolute;
  top: 0px;
  width: ${ScreenWidth}px;
  height: ${ScreenHeight}px;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0);
`;

const MessageBox = styled.View`
  display: flex;
  align-self: center;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center;
  height: 100px;
  width: 100px;
  border-radius: 15px;
`;

const Message = styled.Text`
  text-align: center;
`;
