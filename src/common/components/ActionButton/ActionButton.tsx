import React, {RefObject} from 'react';
import {Text} from 'react-native-svg';
import union from '../../asstes/UI/rounded_edge_bottom_tab.png';
import styled from 'styled-components/native';
import {Image} from 'native-base';
import actionButton from '../../asstes/UI/actionbutton.png';
import {TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
}

function ActionButton(props: Props) {
  const onPress = () => {
    props.onPress();
  };
  return (
    <ButtonWrapper accessibilityRole="button" onPress={onPress}>
      <ButtonImage source={actionButton} alt="버튼" />
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled(TouchableOpacity)`
  justify-content: flex-end;
`;

const ButtonImage = styled(Image)``;

export default ActionButton;
