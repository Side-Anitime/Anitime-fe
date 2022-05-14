import React from 'react';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';

function GuideScreen() {
  const {colors} = useTheme();
  return (
    <Container colors={colors}>
      <StyledGuideText>반려동물과의</StyledGuideText>
      <StyledGuideText>일정을 등록하고</StyledGuideText>
      <StyledGuideText>한 눈에 확인해보세요.</StyledGuideText>
      <StyledWrapper>
        <StyledLogo source={require('../../../common/asstes/auth_logo.png')} />
        <ButtonWrapper>
          <StyledButton>
            <StyledText>기존 회원 로그인</StyledText>
          </StyledButton>
          <SignUpButton>
            <SignUpText>회원가입</SignUpText>
          </SignUpButton>
        </ButtonWrapper>
      </StyledWrapper>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  padding: 67px 20px 0;
  background-color: ${({colors}) => colors.background};
`;

const StyledWrapper = styled.View`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex: 4;
`;

const StyledLogo = styled.Image`
  margin-top: 50px;
`;

const StyledGuideText = styled.Text`
  font-weight: 600;
  font-size: 28px;
  color: #242424;
`;

const StyledText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: white;
`;

const StyledButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 315px;
  height: 54px;
  background: #ffb82f;
  border-radius: 30px;
  color: black;
  margin-bottom: 10px;
`;

const SignUpButton = styled.Pressable``;
const SignUpText = styled.Text`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: black;
`;

const ButtonWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export default GuideScreen;
