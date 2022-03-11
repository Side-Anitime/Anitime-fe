import React, {useCallback, useState} from 'react';
import {Alert, Pressable, Text, View, Image} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {RootStackParamList} from '../../../AppInner';
import {useAppDispatch} from '../../app/store';
import userSlice from '../../features/user/userSlice';
import styled from 'styled-components';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${Config.API_URL}/login`, {});
      console.log(response.data);
      Alert.alert('알림', '로그인 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          name: response.data.data.name,
          email: response.data.data.email,
          accessToken: response.data.data.accessToken,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        response.data.data.refreshToken,
      );
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse) {
        Alert.alert('알림', errorResponse.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, dispatch]);

  return (
    <>
      <Wrapper>
        <StyledLogo source={require('../../common/asstes/anytime_logo.png')} />
      </Wrapper>
      <ButtonWrapper>
        <StyledButton>
          <StyledText>카카오로 시작하기</StyledText>
        </StyledButton>
        <StyledButton>
          <StyledText>네이버로 시작하기</StyledText>
        </StyledButton>
      </ButtonWrapper>
    </>
  );
}

const Wrapper = styled(View)`
  display: flex;
  flex: 10;
  justify-content: center;
  align-items: center;
  background-color: #ffb82f;
`;

const ButtonWrapper = styled(View)`
  justify-content: center;
  flex: 7;
  align-items: center;
  background-color: #ffb82f;
`;

const StyledLogo = styled(Image)`
  margin-top: 50px;
`;

const StyledButton = styled(Pressable)`
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

const StyledText = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #000000;
`;

export default SignIn;
