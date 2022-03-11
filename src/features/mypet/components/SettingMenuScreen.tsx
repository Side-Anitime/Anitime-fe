import React from 'react';
import {
  Text,
  VStack,
  Switch,
  Flex,
  NativeBaseProvider,
  Box,
  Heading,
  View,
  Center,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

function SettingMenuScreen({navigation}) {
  return (
    <NativeBaseProvider>
      <Box>
        <View mt={3} ml={45}>
          <Flex direction="row">
            <Center size="16" h="0" />
            <Center size="16" h="0" />
            <Center size="16" h="0" />
            <Center size="16" h="0" />
            <Center size="16" h="0" />
            <Center>
              <Icon
                name="times-circle"
                size={30}
                color="#000000"
                onPress={() => navigation.goBack()}
              />
            </Center>
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
export default SettingMenuScreen;
