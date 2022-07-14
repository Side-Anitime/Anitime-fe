import React, {useEffect, useRef} from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import {Avatar, HStack, VStack, Spacer, Center, View, Image} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheetPet from '../../../common/components/BottomSheetPet/BottomSheetPet';
import {MyPetStackScreenProps, PetInfo} from '../../../common/models';
import {formatStringToString} from '../../../common/utils/TimeUtils';
import {useAppDispatch} from '../../../app/store';
import {toggleLoading} from '../../loading/loadingSlice';
import ActionButton from '../../../common/components/ActionButton/ActionButton';

function MyPetsUserInfoScreen({
  navigation,
}: MyPetStackScreenProps<'MyPetsUserInfoScreen'>) {
  const refRBSheet = useRef<RBSheet>(null);
  const dispatch = useAppDispatch();
  const petList = [
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

  const onPressAddPetButton = () => {
    refRBSheet.current?.open();
  };

  const onCompleteAddPet = (item: PetInfo) => {
    //TODO: LOADING SCREEN
    dispatch(toggleLoading());
    refRBSheet.current?.close();
    navigation.navigate('PetInfoEditScreen');
    dispatch(toggleLoading());
  };

  return (
    <Wrapper>
      <PetHeader>
        {/* <HamButton>
          <HamburgerIcon
            onPress={() => navigation.navigate('AccountSettingMenuScreen')}
          />
        </HamButton> */}
        <SettingButton>
          <Icon
            name="gear"
            size={30}
            color="#000000"
            onPress={() => navigation.navigate('SettingMenuScreen')}
          />
        </SettingButton>
      </PetHeader>
      <View mt={4} ml={4}>
        <ProfileImgView>
          <Avatar
            bg="purple.600"
            alignSelf="center"
            size="2xl"
            source={{
              uri: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80',
            }}
          />
          <ProfileText>닉네임</ProfileText>
        </ProfileImgView>
      </View>
      {petList?.length < 1 ? (
        <PetListView></PetListView>
      ) : (
        <PetListView>
          <PetListVStack space={5}>
            <PetListTitleText>반려동물 관리</PetListTitleText>
            {petList.map((item, index) => (
              <PetListHStack
                key={index}
                space={5}
                justifyContent="space-between">
                <Avatar
                  size="59px"
                  source={{
                    uri: item.avatarUrl,
                  }}
                />
                <Center>
                  <VStack>
                    <PetNameText>{item.name}</PetNameText>
                    <PetBreedText>{item.kind}</PetBreedText>
                  </VStack>
                </Center>
                <Spacer />
                <Center>
                  <PetDateText>
                    {formatStringToString(item.regDate, 'YYYY.MM.DD')}
                  </PetDateText>
                </Center>
              </PetListHStack>
            ))}
          </PetListVStack>
        </PetListView>
      )}
      <ActionButton onPress={() => onPressAddPetButton()} />
      <BottomSheetPet
        refRBSheet={refRBSheet}
        onComplete={petInfo => onCompleteAddPet(petInfo)}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  height: 100%;
  flex: 1;
`;

const PetHeader = styled.View`
  display: flex;
  margin: 20px 45px 0px 45px;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const ProfileImgView = styled(Center)`
  margin-top: 40px;
`;
const ProfileText = styled.Text`
  margin-top: 15px
  color: #000;
  text-align: center;
  font-size: 18px;
`;

const PetListView = styled.View`
  margin: 30px 45px 0px 45px;
`;
const PetListTitleText = styled.Text`
  color: #000;
`;
const PetNameText = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 19px;
`;
const PetBreedText = styled.Text`
  color: #000;
  font-size: 13px;
`;
const PetDateText = styled.Text`
  color: #000;
  font-size: 16px;
`;
const PetListVStack = styled(VStack)``;

const PetListHStack = styled(HStack)``;

const SettingButton = styled(Pressable)``;

export default MyPetsUserInfoScreen;
