import React, {useEffect, useRef} from 'react';
import {Pressable, Text, TouchableOpacity, Image} from 'react-native';
import {
  Avatar,
  HStack,
  VStack,
  Spacer,
  Center,
  View,
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
  const {status, data, error, isFetching, refetch} = useListPet();
  const {deletePet} = useDeletePet();

  const onPressSettingButton = () => {
    navigation.navigate('SettingMenuScreen');
  };

  /*
   *
   * 반려동물 등록
   *
   */
  const onPressAddPetButton = () => {
    refRBSheet.current?.open();
  };
  const onCompleteAddPet = () => {
    //TODO: LOADING SCREEN
    dispatch(toggleLoading());
    navigation.navigate('PetInfoDisplayScreen', {editMode: true});
    dispatch(toggleLoading());
  };
  /*
   *
   * 반려동물 삭제
   *
   */
  const onPressRemovePetButton = (item: PetInfo) => {
    // TODO: 추후 디자인에 따라 삭제 버튼위치 변경될수있음
    if (item.petId) {
      deletePet({userToken: 'testtoken', petId: item.petId});
    }
  };
  /*
   *
   * 반려동물 상세 정보
   *
   */
  const onPressDetailPetButton = (item: PetInfo) => {
    dispatch(setPetInfo(item));
    navigation.navigate('PetInfoDisplayScreen', {editMode: false});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Pet List Refetch
      if (refetch) refetch();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Wrapper>
      <Header>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingMenuScreen')}>
          <HamburgerButton source={menu} />
        </TouchableOpacity>
      </Header>
      <ProfileWrapper>
        <Avatar bg="gray.300" alignSelf="center" size="xl" />
        <ProfileText>닉네임</ProfileText>
      </ProfileWrapper>
      {status === 'loading' ? (
        <Text>Loading</Text>
      ) : status === 'error' ? (
        <Text>Error: {'ERROR'}</Text>
      ) : (
        <>
          <PetListHeader>
            <PetListTitleText>반려동물 관리</PetListTitleText>
            <TouchableOpacity>
              <PetListSettingText>관리</PetListSettingText>
            </TouchableOpacity>
          </PetListHeader>
          <PetList
            bounces
            data={data?.data}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{height: 200}} />}
            renderItem={({item, index}) => {
              const petItem = item as PetInfo;
              return (
                <View>
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
                    <PetVStack>
                      <PetNameText>{petItem.name}</PetNameText>
                      <PetBreedText>{petItem.petKind?.kindName}</PetBreedText>
                    </PetVStack>
                    <PetDetailButton
                      onPress={() => onPressDetailPetButton(petItem)}>
                      <Image source={arrow_right} />
                    </PetDetailButton>
                    {/* <PetDeleteButton
                      onPress={() => onPressRemovePetButton(petItem)}>
                      <Text>삭제</Text>
                    </PetDeleteButton> */}
                  </PetListHStack>
                </View>
              );
            }}
          />
        </>
      )}
      <ActionButton offsetX={2} onPress={() => onPressAddPetButton()} />
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
  margin: 30px 20px 0px 20px;
`;

const HamburgerButton = styled.Image``;

const Header = styled.View`
  display: flex;
  flex-direction: row-reverse;
`;

const ProfileWrapper = styled(Center)`
  margin-top: 20px;
  margin-bottom: 50px;
`;
const ProfileText = styled.Text`
  margin-top: 10px;
  color: #000;
  text-align: center;
  font-size: 18px;
`;
const PetList = styled.FlatList`
  display: flex;
  height: 300px;
  padding-bottom: 300px;
`;
const PetListHeader = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const PetListSettingText = styled.Text`
  margin-right: 10px;
  color: #000;
  font-size: 16px;
`;

const PetDeleteButton = styled.TouchableOpacity``;

const PetDetailButton = styled.TouchableOpacity``;

const PetListTitleText = styled.Text`
  color: #000;
  font-size: 16px;
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
  margin: 4px 0px
  border-radius: 10px;
  border-width: 1px;
  border-color: #f3f3f3;
  align-items: center;
  `;

const PetVStack = styled(VStack)`
  flex-grow: 2;
`;

export default PetListDisplayScreen;
