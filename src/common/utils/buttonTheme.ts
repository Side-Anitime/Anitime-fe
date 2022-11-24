import {css} from 'styled-components';
import {colors} from './colors';

// 공통 버튼 테마

const disabled = css`
  background: ${({theme}) => theme.gray3};
  color: ${({theme}) => theme.gray9};
  border: 1px solid ${({theme}) => theme.gray5};
`;

const primary = css`
  background-color: ${colors.primary};
  border-radius: 8px;
  border: none;
  height: 40px;
  color: aqua;
`;

const buttonTheme = {
  primary,
};

export default buttonTheme;
