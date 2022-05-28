import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {useTheme} from '@react-navigation/native';
import BottomSheet from '../../../common/components/BottomSheet';
import {CATEGORIES} from '../../../common/constants';
import {GuideStackScreenProps} from '../../../common/models/navigation/types';
import SignIn from './SignIn';

function GuideScreen({navigation}: GuideStackScreenProps) {
  const refRBSheet = useRef();
  const {colors} = useTheme();

  const handleOnPressBottomSheet = item => {
    navigation.navigate('CalendarFormScreen', {item});
  };

  const onPressLoginButton = () => {
    refRBSheet.current.open();
  };

  return (
    <Container colors={colors}>
      <StyledGuideText>반려동물과의</StyledGuideText>
      <StyledGuideText>일정을 등록하고</StyledGuideText>
      <StyledGuideText>한 눈에 확인해보세요.</StyledGuideText>
      <StyledWrapper>
        <StyledLogo source={require('../../../common/asstes/auth_logo.png')} />
        <ButtonWrapper>
          <StyledLoginButton onPress={onPressLoginButton}>
            <StyledText>기존 회원 로그인</StyledText>
          </StyledLoginButton>
          <SignUpButton>
            <SignUpText>회원가입</SignUpText>
          </SignUpButton>
        </ButtonWrapper>
      </StyledWrapper>
      <BottomSheet
        title="로그인 방법을 선택해주세요"
        titlePosition="center"
        height={300}
        list={CATEGORIES}
        refRBSheet={refRBSheet}
        handleOnPress={handleOnPressBottomSheet}>
        <SignIn />
      </BottomSheet>
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

const StyledLoginButton = styled.Pressable`
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
