import {Button, Pressable, Text} from 'react-native';
import React from 'react';
import styled, {css} from 'styled-components/native';
import buttonTheme from '../utils/buttonTheme';

interface Props {
  layoutMode?: 'inline' | 'fullWidth';
  buttonTheme?: unknown; // Todo: 개선 필요
  styleType?: string;
  title: string;
  children: React.ReactNode;
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
      <Text>{children}</Text>
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
  ${props =>
    props.layoutMode === 'fullWidth' &&
    css`
      width: 100%;
    `}
`;

export default CommonButton;
