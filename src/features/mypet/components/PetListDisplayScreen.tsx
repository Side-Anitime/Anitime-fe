import React, {useEffect, useRef} from 'react';
import {Pressable, Text, TouchableOpacity} from 'react-native';
import {
  Avatar,
  HStack,
  VStack,
  Spacer,
  Center,
  View,
  Image,
  FlatList,
} from 'native-base';

import styled from 'styled-components/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheetPet from '../../../common/components/BottomSheetPet/BottomSheetPet';
import {MyPetStackScreenProps} from '../../../common/models';
import {useAppDispatch} from '../../../app/store';
import {toggleLoading} from '../../loading/loadingSlice';
import ActionButton from '../../../common/components/ActionButton/ActionButton';
import {fetchPetList} from '../../../common/repositories/PetRepository';
import {arrow_right, menu} from '../../../common/asstes';

function PetListDisplayScreen({
  navigation,
}: MyPetStackScreenProps<'PetListDisplayScreen'>) {
  const refRBSheet = useRef<RBSheet>(null);
  const dispatch = useAppDispatch();

  const onPressSettingButton = () => {
    navigation.navigate('SettingMenuScreen');
  };
  const onPressAddPetButton = () => {
    refRBSheet.current?.open();
  };

  const onCompleteAddPet = () => {
    //TODO: LOADING SCREEN
    dispatch(toggleLoading());
    // refRBSheet.current?.close();
    navigation.navigate('PetInfoEditScreen');
    dispatch(toggleLoading());
  };

  const {status, data, error, isFetching} = fetchPetList();

  useEffect(() => {
    refRBSheet.current?.close();
  }, [refRBSheet.current?.state]);

  return (
    <Wrapper>
      <PetHeader>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingMenuScreen')}>
          <Image source={menu} alt="메뉴" />
        </TouchableOpacity>
      </PetHeader>
      <View mt={4} ml={4}>
        <ProfileImgView>
          <Avatar bg="gray.600" alignSelf="center" size="2xl" />
          <ProfileText>닉네임</ProfileText>
        </ProfileImgView>
      </View>
      {status === 'loading' ? (
        <Text>Loading</Text>
      ) : status === 'error' ? (
        <Text>Error: {'ERROR'}</Text>
      ) : (
        <PetListView>
          <PetListTitleText>반려동물 관리</PetListTitleText>
          <PetList
            data={data?.data}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{height: 200}} />}
            renderItem={({item, index}) => (
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
                    <PetBreedText>견종</PetBreedText>
                  </VStack>
                </Center>
                <Spacer />
                <Center>
                  <TouchableOpacity>
                    <Image source={arrow_right} alt=">" />
                  </TouchableOpacity>
                </Center>
              </PetListHStack>
            )}
          />
          {/* <PetListVStack space={2}>
            <PetListTitleText>반려동물 관리</PetListTitleText>
            {data?.data?.map((item, index) => (
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
                    <PetBreedText>견종</PetBreedText>
                  </VStack>
                </Center>
                <Spacer />
                <Center>
                  <TouchableOpacity>
                    <Image source={arrow_right} alt=">" />
                  </TouchableOpacity>
                </Center>
              </PetListHStack>
            ))}
          </PetListVStack> */}
        </PetListView>
      )}
      <ActionButton onPress={() => onPressAddPetButton()} />
      <BottomSheetPet
        refRBSheet={refRBSheet}
        onComplete={petInfo => onCompleteAddPet()}
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
  margin: 20px 0px 0px 20px;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

const ProfileImgView = styled(Center)`
  margin-top: 20px;
`;
const ProfileText = styled.Text`
  margin-top: 15px
  color: #000;
  text-align: center;
  font-size: 18px;
`;
const PetList = styled.FlatList`
  display: flex;
  height: 300px;
  padding-bottom: 300px;
`;
const PetListView = styled.View`
  margin: 75px 25px 0px 25px;
`;
const PetListTitleText = styled.Text`
  color: #000;
  font-size: 18px;
  margin-bottom: 15px;
`;
const PetNameText = styled.Text`
  color: #000;
  font-weight: bold;
  font-size: 18px;
`;
const PetBreedText = styled.Text`
  color: #000;
  font-size: 13px;
`;

const PetListHStack = styled(HStack)`
  background-color: white;
  padding: 13px 20px;
  margin: 5px 0px
  border-radius: 15px;
  border-width: 1px;
  border-color: #f3f3f3;
`;

const SettingButton = styled(Pressable)``;

export default PetListDisplayScreen;
