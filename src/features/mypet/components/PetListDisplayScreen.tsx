import React, {useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, Image, Modal, Pressable} from 'react-native';
import {Avatar, HStack, VStack, Center, View} from 'native-base';
import styled from 'styled-components/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheetPet from '../../../common/components/BottomSheetPet/BottomSheetPet';
import {MyPetStackScreenProps, PetInfo} from '../../../common/models';
import {useAppDispatch} from '../../../app/store';
import {setLoading, toggleLoading} from '../../loading/loadingSlice';
import ActionButton from '../../../common/components/ActionButton/ActionButton';
import {useDeletePet, useListPet} from '../../../common/api/PetRepository';
import {arrow_right, menu} from '../../../common/assets';
import {selectPetInfo, setPetInfo} from '../petInfoSlice';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CompleteOverlay from '../../loading/CompleteOverlay';

function PetListDisplayScreen({
  navigation,
  route,
}: MyPetStackScreenProps<'PetListDisplayScreen'>) {
  const refRBSheet = useRef<RBSheet>(null);
  const [isManageMode, SetManageMode] = useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  useFocusEffect(
    React.useCallback(() => {
      return () => refRBSheet.current?.close();
    }, []),
  );

  const currentPetInfo = useSelector(selectPetInfo);
  const {status, data, error, isFetching, refetch} = useListPet();
  const isDataNull = !data?.data || data?.data.length < 1;
  const {deletePet, deletePetStatus} = useDeletePet();

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
      dispatch(setPetInfo(item));
      setModalVisible(true);
    }
  };

  const onPressConfirmRemovePetButton = () => {
    if (currentPetInfo?.petId) {
      deletePet({userToken: 'testtoken', petId: currentPetInfo.petId});
    }
  };
  /*
   *
   * 반려동물 관리
   *
   */
  const onPressManagePetButton = () => {
    SetManageMode(!isManageMode);
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
      refetch();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (deletePetStatus === 'success') {
      refetch();
    }
  }, [deletePetStatus]);

  useEffect(() => {
    if (isDataNull) {
      SetManageMode(false);
    }
  }, [isDataNull]);

  return (
    <Wrapper>
      <ScreenWrapper>
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
        <PetListHeader>
          <PetListTitleText>반려동물 관리</PetListTitleText>
          <TouchableOpacity
            onPress={() => onPressManagePetButton()}
            disabled={isDataNull}>
            <PetListSettingText style={{color: isDataNull ? 'gray' : '#000'}}>
              {isManageMode ? '완료' : '관리'}
            </PetListSettingText>
          </TouchableOpacity>
        </PetListHeader>
        {/* TODO: 에러 처리 */}
        {status === 'error' ? (
          <Text>Error</Text>
        ) : status === 'success' ? (
          <>
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
                      {isManageMode ? (
                        <PetDeleteButton
                          onPress={() => onPressRemovePetButton(petItem)}>
                          <Text>삭제</Text>
                        </PetDeleteButton>
                      ) : (
                        <PetDetailButton
                          onPress={() => onPressDetailPetButton(petItem)}>
                          <Image source={arrow_right} />
                        </PetDetailButton>
                      )}
                    </PetListHStack>
                  </View>
                );
              }}
            />
          </>
        ) : (
          <></>
        )}
        <BottomSheetPet
          refRBSheet={refRBSheet}
          onComplete={petInfo => onCompleteAddPet()}
        />
      </ScreenWrapper>
      <ActionButton onPress={() => onPressAddPetButton()} />
      {/* MODAL */}
      <PetDeleteModal animationType="none" visible={modalVisible} transparent>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            height: '100%',
            justifyContent: 'center',
          }}>
          <PetDeleteModalView>
            <Text style={{textAlign: 'center', marginVertical: 20}}>
              {currentPetInfo.name}를(을) 삭제 하시겠습니까?
            </Text>
            <ButtonWrapper>
              <Button
                onPress={() => {
                  onPressConfirmRemovePetButton();
                  setModalVisible(false);
                }}
                style={{backgroundColor: 'purple'}}>
                <ButtonText style={{color: 'white'}}>확인</ButtonText>
              </Button>
              <Button onPress={() => setModalVisible(false)}>
                <ButtonText>취소</ButtonText>
              </Button>
            </ButtonWrapper>
          </PetDeleteModalView>
        </Pressable>
      </PetDeleteModal>
      {/* MODAL */}
    </Wrapper>
  );
}

const Wrapper = styled.View`
  flex: 1;
`;

const ScreenWrapper = styled.View`
  height: 100%;
  margin: 30px 16px 0px 16px;
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

const PetDeleteModal = styled(Modal)``;

const PetDeleteModalView = styled.View`
  align-self: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 7px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row-reverse;
  padding-horizontal: 20px;
`;

const Button = styled.TouchableOpacity`
  padding-horizontal: 15px;
  padding-vertical: 5px;
  margin-horizontal: 5px;
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  font-size: 12px;
`;

export default PetListDisplayScreen;
