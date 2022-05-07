import React from 'react';
import {Pressable} from 'react-native';
import {
  Text,
  VStack,
  Switch,
  Flex,
  NativeBaseProvider,
  Box,
  Heading,
  View,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components';
import {MyPetStackScreenProps} from '../../../common/models';

function AccountSettingMenuScreen({
  navigation,
}: MyPetStackScreenProps<'AccountSettingMenuScreen'>) {
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
            <Heading fontSize="4xl" p="0" pb="3">
              설정
            </Heading>
            <Flex direction="row">
              <Text fontSize="xl">푸시알림설정&nbsp;&nbsp; </Text>
              <Switch defaultIsChecked colorScheme="primary" />
            </Flex>
            <Text fontSize="xl">오픈 소스 정보</Text>
            <Text fontSize="xl">버전 정보</Text>
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

export default AccountSettingMenuScreen;
