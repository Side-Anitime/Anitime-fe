import React from 'react';
import {Pressable} from 'react-native';
import {
  Text,
  VStack,
  Flex,
  NativeBaseProvider,
  Box,
  Heading,
  View,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';

function SettingMenuScreen({navigation}) {
  return (
    <NativeBaseProvider>
      <Box>
        <View mt={3} ml={45}>
          <Flex direction="row">
            <CloseButton>
              <Icon
                name="times-circle"
                size={30}
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </CloseButton>
          </Flex>
        </View>
        <View mt={10} ml={10}>
          <VStack space={8}>
            <NickNameText>
              <Heading fontSize="4xl">닉네임</Heading>
            </NickNameText>
            <ModifyNickNameButton>
              <Heading fontSize="lg" mt={5}>
                수정
                <Icon name="pencil" size={20} color="#000000" />
              </Heading>
            </ModifyNickNameButton>
            <Text fontSize="xl" mt={7}>
              서비스 이용 약관
            </Text>
            <Text fontSize="xl">개인정보 취급 방침</Text>
            <Text fontSize="xl">로그아웃</Text>
            <Text fontSize="xl">회원 탈퇴</Text>
          </VStack>
        </View>
      </Box>
    </NativeBaseProvider>
  );
}

const CloseButton = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 30px;
  height: 30px;
  left: 260px;
  top: 20px;
`;

const NickNameText = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 154px;
  height: 250px;
  left: 0px;
  top: 25px;
`;

const ModifyNickNameButton = styled(Pressable)`
  display: flex;
  position: absolute;
  width: 200px;
  height: 200px;
  left: 200px;
  top: 25px;
`;

export default SettingMenuScreen;
