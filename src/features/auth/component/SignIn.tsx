import React, {useState} from 'react';
import {Alert, Platform, Pressable, Image} from 'react-native';
import styled from 'styled-components/native';
import {login, getProfile, KakaoProfile} from '@react-native-seoul/kakao-login';
import {ConfigParam, NaverLogin} from '@react-native-seoul/naver-login';

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

  const naverLogin = (props: ConfigParam) => {
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
    <Container>
      <Wrapper>
        <LoginIconWrapper>
          <Pressable onPress={loginByKakao}>
            <Image source={require('../../../common/asstes/kakaoLogin.png')} />
          </Pressable>
          <Pressable onPress={naverLogin}>
            <Image source={require('../../../common/asstes/naverLogin.png')} />
          </Pressable>
        </LoginIconWrapper>
      </Wrapper>
      <EmailLoginButton>
        <EmailLoginText>이메일로 로그인</EmailLoginText>
      </EmailLoginButton>
      <FindIdWrapper>
        <FindIdQuestionText>계정이 기억나지 않으세요? </FindIdQuestionText>
        <FindIdText>계정찾기</FindIdText>
      </FindIdWrapper>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const LoginIconWrapper = styled.View`
  width: 125px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const EmailLoginButton = styled.Pressable`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 315px;
  height: 54px;
  border: 1.5px solid #c4c4c4;
  border-radius: 30px;
  color: black;
  margin-bottom: 29px;
`;

const EmailLoginText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: black;
`;

const FindIdWrapper = styled.View`
  flex-direction: row;
`;

const FindIdQuestionText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: #242424;
`;

const FindIdText = styled.Text`
  font-weight: 400;
  font-size: 16px;
  color: #242424;
  text-decoration-line: underline;
`;

export default SignIn;
