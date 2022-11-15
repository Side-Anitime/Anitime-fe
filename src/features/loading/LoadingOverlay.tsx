import {ScreenHeight, ScreenWidth} from '@rneui/base';
import {Spinner} from 'native-base';
import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import loadingGif from '../../common/assets/UI/loading.gif';

function LoadingOverlay() {
  return (
    <Wrapper>
      <MessageBox>
        {/* <Message>LOADING</Message> */}
        {/* <Spinner color="indigo.500" size="lg" /> */}
        <Image
          source={loadingGif}
          style={{
            width: 100,
          }}
          resizeMode="contain"
        />
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
  background-color: rgba(255, 255, 255, 0.5);
`;

const MessageBox = styled.View`
  display: flex;
  align-self: center;
  background-color: rgba(255, 255, 255, 0);
  justify-content: center;
  height: 100px;
  width: 100px;
  border-radius: 15px;
`;

const Message = styled.Text`
  text-align: center;
`;
