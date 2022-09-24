import {ScreenHeight, ScreenWidth} from '@rneui/base';
import {CheckIcon, PresenceTransition} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';

interface Props {
  visibility?: boolean;
}

function CompleteOverlay({visibility}: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visibility) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
  }, [visibility]);
  return (
    <Wrapper
      visible={isVisible}
      initial={{
        opacity: 0,
        scale: 0,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 250,
        },
      }}>
      <MessageBox>
        {/* <Message>DONE</Message> */}
        <CheckIcon style={{alignSelf: 'center'}} color="indigo.500" size="lg" />
      </MessageBox>
    </Wrapper>
  );
}

export default CompleteOverlay;

const Wrapper = styled(PresenceTransition)`
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
