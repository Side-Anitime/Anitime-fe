import React, {useState} from 'react';
import {Alert, Platform} from 'react-native';
import styled from 'styled-components/native';
import {login, getProfile, KakaoProfile} from '@react-native-seoul/kakao-login';
import {NaverLogin} from '@react-native-seoul/naver-login';

const iosKeys = {
  kConsumerKey: 'VC5CPfjRigclJV_TFACU',
  kConsumerSecret: 'f7tLFw0AHn',
  kServiceAppName: '테스트앱(iOS)',
  kServiceAppUrlScheme: 'testapp', // only for iOS
};

const androidKeys = {
  kConsumerKey: '0ItHds0lfc5nywExNGI0',
  kConsumerSecret: 'LilXdv0hPO',
  kServiceAppName: 'anytime',
};

const initials = Platform.OS === 'ios' ? iosKeys : androidKeys;

function SignIn() {
  const [naverToken, setNaverToken] = useState(null);

  const loginByKakao = async (): Promise<void> => {
    const {accessToken} = await login();
    const {nickname, phoneNumber, ageRange, gender}: KakaoProfile =
      await getProfile();
  };

  const naverLogin = props => {
    return new Promise((resolve, reject) => {
      NaverLogin.login(props, (err, token) => {
        console.log(`\n\n  Token is fetched  :: ${token} \n\n`);
        setNaverToken(token);
        if (err) {
          reject(err);
          return;
        }
        resolve(token);
      });
    });
  };

  const naverLogout = () => {
    NaverLogin.logout();
    setNaverToken('');
  };

  const getUserProfile = async () => {
    const profileResult = await getProfile(naverToken.accessToken);
    if (profileResult.resultcode === '024') {
      Alert.alert('로그인 실패', profileResult.message);
      return;
    }
    console.log('profileResult', profileResult);
  };

  return (
    <>
      <Wrapper>
        <StyledLogo source={require('../../common/asstes/anytime_logo.png')} />
      </Wrapper>
      <ButtonWrapper>
        <StyledButton onPress={loginByKakao}>
          <StyledText>카카오로 시작하기</StyledText>
        </StyledButton>
        <StyledButton onPress={() => naverLogin(initials)}>
          <StyledText>네이버로 시작하기</StyledText>
        </StyledButton>
      </ButtonWrapper>
    </>
  );
}

const Wrapper = styled.View`
  display: flex;
  flex: 10;
  justify-content: center;
  align-items: center;
  background-color: #ffb82f;
`;

const ButtonWrapper = styled.View`
  justify-content: center;
  flex: 7;
  align-items: center;
  background-color: #ffb82f;
`;

const StyledLogo = styled.Image`
  margin-top: 50px;
`;

const StyledButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 315px;
  height: 54px;
  background: #ffffff;
  border-radius: 30px;
  color: black;
  margin-bottom: 10px;
`;

const StyledText = styled.Text`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
`;

export default SignIn;
