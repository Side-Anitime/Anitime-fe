import {Button, Pressable, Text} from 'react-native';
import React from 'react';
import styled, {css} from 'styled-components/native';
import buttonTheme from '../utils/buttonTheme';

interface Props {
  layoutMode?: 'inline' | 'fullWidth';
  buttonTheme?: unknown; // Todo: 개선 필요
  styleType?: string;
  children: React.ReactNode;
  onPress: () => void;
}

function CommonButton({
  children,
  layoutMode = 'inline',
  styleType,
  ...rest
}: Props) {
  return (
    <StyledButton
      buttonTheme={buttonTheme}
      styleType={styleType}
      layoutMode={layoutMode}
      {...rest}>
      <StyledText>{children}</StyledText>
    </StyledButton>
  );
}

const StyledButton = styled(Pressable)`
  border: none;
  background: red;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.3px;
  cursor: ${({disabled}) => (disabled ? 'not-allowed' : 'pointer')};
  ${({buttonTheme, styleType = 'primary'}) => buttonTheme[styleType]};
`;

const StyledText = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
`;

export default CommonButton;
