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
import {MyPetStackScreenProps, PetInfo} from '../../../common/models';
import {useAppDispatch} from '../../../app/store';
import {toggleLoading} from '../../loading/loadingSlice';
import ActionButton from '../../../common/components/ActionButton/ActionButton';
import {
  useDeletePet,
  useListPet,
} from '../../../common/repositories/PetRepository';
import {arrow_right, menu} from '../../../common/asstes';
import {setPetInfo} from '../petInfoSlice';
import {useFocusEffect} from '@react-navigation/native';

function PetListDisplayScreen({
  navigation,
}: MyPetStackScreenProps<'PetListDisplayScreen'>) {
  const refRBSheet = useRef<RBSheet>(null);
  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      return () => refRBSheet.current?.close();
    }, []),
  );
  const {status, data, error, isFetching} = useListPet();
  const {deletePet} = useDeletePet();

  const onPressSettingButton = () => {
    navigation.navigate('SettingMenuScreen');
  };
  const onPressAddPetButton = () => {
    refRBSheet.current?.open();
  };

  const onPressRemovePetButton = (item: PetInfo) => {
    // TODO: 추후 디자인에 따라 삭제 버튼위치 변경될수있음
    if (item.petId) {
      deletePet({userToken: 'testtoken', petId: item.petId});
    }
  };

  const onPressDetailPetButton = (item: PetInfo) => {
    dispatch(setPetInfo(item));
    navigation.navigate('PetInfoDisplayScreen', {editMode: false});
  };

  const onCompleteAddPet = () => {
    //TODO: LOADING SCREEN
    dispatch(toggleLoading());
    navigation.navigate('PetInfoDisplayScreen', {editMode: true});
    dispatch(toggleLoading());
  };

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
          <Avatar bg="gray.300" alignSelf="center" size="2xl" />
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
            bounces
            data={data?.data}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{height: 200}} />}
            renderItem={({item, index}) => {
              const petItem = item as PetInfo;
              return (
                <TouchableOpacity>
                  <PetListHStack
                    key={index}
                    space={5}
                    justifyContent="space-between">
                    <Avatar
                      bg="gray.300"
                      size="59px"
                      source={{
                        uri: petItem.image,
                      }}
                    />
                    <Center>
                      <VStack>
                        <PetNameText>{petItem.name}</PetNameText>
                        <PetBreedText>{petItem.petKind?.kindName}</PetBreedText>
                      </VStack>
                    </Center>
                    <Spacer />
                    <Center>
                      <TouchableOpacity
                        onPress={() => onPressDetailPetButton(petItem)}>
                        <Image source={arrow_right} alt=">" />
                      </TouchableOpacity>
                    </Center>
                    <TouchableOpacity
                      onPress={() => onPressRemovePetButton(petItem)}>
                      <Text>삭제</Text>
                    </TouchableOpacity>
                  </PetListHStack>
                </TouchableOpacity>
              );
            }}
          />
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

export default PetListDisplayScreen;
