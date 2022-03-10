import React from 'react';
import {Text, VStack, Switch, Flex, NativeBaseProvider} from 'native-base';

function SettingMenuScreen() {
  return (
    <NativeBaseProvider>
      <VStack space={8}>
        <Text fontSize="xl">설정 </Text>
        <Flex direction="row">
          <Text fontSize="xl">푸시알림설정&nbsp;&nbsp; </Text>
          <Switch defaultIsChecked colorScheme="primary" />
        </Flex>
        <Text fontSize="xl">오픈 소스 정보</Text>
        <Text fontSize="xl">버전 정보</Text>
      </VStack>
    </NativeBaseProvider>
  );
}
export default SettingMenuScreen;
