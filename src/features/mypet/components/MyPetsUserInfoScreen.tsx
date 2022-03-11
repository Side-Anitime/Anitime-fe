import React from 'react';
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Heading,
  Center,
  View,
  Flex,
} from 'native-base';
import HamburgerBtn from '../../../common/components/HamburgerBtn';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../../App';

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: '보리',
    regDate: '2022-03-01',
    kind: '푸들',
    avatarUrl:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: '옥수수',
    regDate: '2022-03-01',
    kind: '진돗개',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    name: '쌀',
    regDate: '2022-03-01',
    kind: '똥개',
    avatarUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU',
  },
];

type MyPetScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SettingMenuScreen'
>;

function MyPetsUserInfoScreen({navigation}: MyPetScreenProps) {
  return (
    <Box>
      <View mt={4} ml={4}>
        <Flex direction="row">
          <Center>
            <HamburgerBtn></HamburgerBtn>
          </Center>
          <Center size="16" h="0" />
          <Center size="16" h="0" />
          <Center size="16" h="0" />
          <Center size="16" h="0" />
          <Center size="16" h="0" />
          <Center>
            <Icon
              name="gear"
              size={30}
              color="#000000"
              onPress={() => navigation.navigate('SettingMenuScreen')}
            />
          </Center>
        </Flex>
      </View>
      <Center>
        <Center
          height={430}
          width={{
            base: 200,
            lg: 250,
          }}>
          <VStack
            space={5}
            alignItems={{
              base: 'center',
              md: 'flex-start',
            }}>
            <Avatar
              bg="purple.600"
              alignSelf="center"
              size="2xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
              }}>
              RB
            </Avatar>
            <Text>닉네임</Text>
          </VStack>
        </Center>
      </Center>

      <Heading fontSize="xl" p="4" pb="3">
        반려동물 관리
      </Heading>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Box
            borderBottomWidth="1"
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2">
            <HStack space={3} justifyContent="space-between">
              <Avatar
                size="48px"
                source={{
                  uri: item.avatarUrl,
                }}
              />
              <VStack>
                <Text
                  _dark={{
                    color: 'warmGray.50',
                  }}
                  color="coolGray.800"
                  bold>
                  {item.name}
                </Text>
                <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {item.kind}
                </Text>
              </VStack>
              <Spacer />
              <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800"
                alignSelf="flex-start">
                {item.regDate}
              </Text>
            </HStack>
          </Box>
        )}
        keyExtractor={item => item.id}
      />
    </Box>
  );
}

export default MyPetsUserInfoScreen;
