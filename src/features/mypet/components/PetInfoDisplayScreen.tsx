import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {MyPetStackScreenProps, PetInfo} from '../../../common/models';
import {selectPetInfo} from '../petInfoSlice';
import {Avatar, Center, useToast} from 'native-base';
import CustomSelector from '../../../common/components/CustomSelector';
import {Controller, useForm} from 'react-hook-form';
import CustomDatePicker from '../../../common/components/CustomDatePicker';
import {formatDateToString} from '../../../common/utils/timeUtils';
import CustomTextInput from '../../../common/components/CustomTextInput';
import {useSavePet, useUpdatePet} from '../../../common/api/pet';
import {selectUserToken} from '../../auth/authSlice';
import {setLoading} from '../../loading/loadingSlice';
import {useAppDispatch} from '../../../app/store';

interface Props extends MyPetStackScreenProps<'PetInfoDisplayScreen'> {}

function PetInfoDisplayScreen({navigation, route}: Props) {
  const currentPetInfo: PetInfo = useSelector(selectPetInfo);
  const userToken = useSelector(selectUserToken);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState<boolean>(!currentPetInfo.petId);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<PetInfo>({
    mode: 'onBlur',
    defaultValues: currentPetInfo,
  });

  const {mutateAsync: savePet, status: savePetStatus} = useSavePet();

  const {mutateAsync: updatePet, status: updatePetStatus} = useUpdatePet();

  /*
   *
   * UPDATE
   *
   */
  const onUpdatePetInfo = async () => {
    await handleSubmit(async formData => {
      const updatedPetInfo: PetInfo = {
        ...formData,
        //TODO: petkindid 없을경우 믹스 견종 번호 ?
        petKindId: formData.petKind?.petTypeId ?? 1,
        //TODO: 대표 반려동물 등록 여부
        representYn: 'N',
      };
      await updatePet(updatedPetInfo);
    })();
  };
  /*
   *
   * SAVE
   *
   */
  const onSavePetInfo = async () => {
    await handleSubmit(async formData => {
      const createdPetInfo: PetInfo = {
        ...formData,
        userToken,
        petKindId: formData?.petKind?.petTypeId ?? 1,
      };
      await savePet(createdPetInfo);
    })();
  };
  /*
   *
   * HANDLER
   *
   */
  const onPressEditButton = async () => {
    // api
    setIsEditing(!isEditing);
    if (isEditing) {
      try {
        // 수정
        if (currentPetInfo.petId) {
          await onUpdatePetInfo();
        }
        //신규
        else {
          await onSavePetInfo().then(() => {
            navigation.navigate('PetListDisplayScreen');
          });
        }
      } catch (e) {
        //TODO: handle error
      }
    }
  };

  return (
    <View style={{display: 'flex'}}>
      <KeyboardAwareScrollView extraScrollHeight={60}>
        <View style={styles.wrapper}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.itemScrollViewWrapper}>
            <View style={styles.avatarWrapper}>
              <Avatar bg="gray.300" alignSelf="center" size="2xl" />
            </View>
            <Center>
              <Text style={styles.avatarText}>{currentPetInfo.name}</Text>
            </Center>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>성별</Text>
              <Controller
                control={control}
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomSelector
                    isEditing={isEditing}
                    onChange={gender => {
                      if (isEditing) {
                        onChange(gender);
                      }
                    }}
                    value={value}
                    options={[
                      {value: 'MALE', label: '남아'},
                      {
                        value: 'FEMALE',
                        label: '여아',
                      },
                    ]}
                  />
                )}
                name="gender"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>품종</Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <Text>품종</Text>
                )}
                name="neuterYn"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>생일</Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomDatePicker
                    labelStyle={styles.label}
                    isEditing={isEditing}
                    maximumDate={new Date()}
                    date={value ? new Date(value) : undefined}
                    onDateChange={date => {
                      onChange(formatDateToString(date));
                    }}
                  />
                )}
                name="birthday"
              />
              {errors.birthday && (
                <Text style={styles.errorText}>{errors.name?.message}</Text>
              )}
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>중성화 여부</Text>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <CustomSelector
                    isEditing={isEditing}
                    onChange={neuterYn => {
                      onChange(neuterYn);
                    }}
                    value={value ?? ''}
                    options={[
                      {value: 'Y', label: '예'},
                      {
                        value: 'N',
                        label: '아니오',
                      },
                      {
                        value: '',
                        label: '몰라요',
                      },
                    ]}
                  />
                )}
                name="neuterYn"
              />
            </View>
            <View style={{...styles.inputWrapper, marginBottom: 50}}>
              <View style={styles.shortIntroduceWrapper}>
                <Text style={styles.label}>소개글</Text>
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <CustomTextInput
                      isEditing={isEditing}
                      value={value}
                      onChange={shortIntroduce => {
                        onChange(shortIntroduce);
                      }}
                    />
                  )}
                  name="shortIntroduce"
                />
              </View>
            </View>
          </ScrollView>
          {/* <View
          style={{...styles.editButton, display: isEditing ? 'flex' : 'none'}}>
          <TouchableOpacity onPress={() => onPressEditButton()}>
            <Text style={styles.editButtonText}>등록하기</Text>
          </TouchableOpacity>
        </View> */}
        </View>
      </KeyboardAwareScrollView>
      <View
        pointerEvents="box-none"
        style={{
          ...styles.headerWrapper,
          alignSelf: 'flex-end',
        }}>
        <TouchableOpacity onPress={onPressEditButton}>
          <Text>{isEditing ? '완료' : '수정'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    overflow: 'visible',
    padding: 20,
  },
  headerWrapper: {
    position: 'absolute',
    height: 40,
    top: 20,
    right: 20,
    backgroundColor: 'transparent',
  },
  avatarWrapper: {
    marginVertical: 15,
  },
  itemScrollViewWrapper: {
    marginBottom: 50,
  },
  shortIntroduceWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  label: {
    paddingRight: 50,
    fontSize: 16,
    color: '#000000',
  },
  editButton: {
    backgroundColor: '#9A9A9A',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  editButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  avatarText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 18,
    marginBottom: 15,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F26C6C',
  },
});

export default PetInfoDisplayScreen;
