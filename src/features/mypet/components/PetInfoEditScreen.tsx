import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {PETNAME_REG_EXP} from '../../../common/constants';
import {MyPetStackScreenProps, PetInfo} from '../../../common/models';

import {selectPetInfo, setPetBirthDate, setPetName} from '../petInfoSlice';
import {useAppDispatch} from '../../../app/store';

import {formatDate} from '../../../common/utils/TimeUtils';
import CustomDatePicker from '../../../common/components/CustomDatePicker';

interface Props extends MyPetStackScreenProps<'PetInfoEditScreen'> {}

function PetInfoEditScreen(props: Props) {
  const nameRef = useRef<TextInput | null>(null);
  const dispatch = useAppDispatch();
  const currentPetInfo = useSelector(selectPetInfo);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<PetInfo>({
    mode: 'onBlur',
    defaultValues: {
      name: props.route.params?.item?.name,
    },
  });

  const onSubmit = () => {
    console.log('SUBMIT', currentPetInfo);
  };
  return (
    <KeyboardAwareScrollView style={{flex: 1}} extraScrollHeight={60}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이름</Text>
        <Controller
          control={control}
          rules={{
            required: '이름을 입력해주세요',
            pattern: {
              value: PETNAME_REG_EXP,
              message: '올바른 형식이 아닙니다.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              placeholder="이름을 입력해주세요"
              placeholderTextColor="#9F9F9F"
              onChangeText={(name: string) => {
                dispatch(setPetName(name));
                onChange(name);
              }}
              value={value}
              ref={nameRef}
              textContentType="name"
              clearButtonMode="while-editing"
              returnKeyType="next"
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name?.message}</Text>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>성별</Text>
        <Controller
          control={control}
          rules={{
            required: '이름을 입력해주세요',
            pattern: {
              value: PETNAME_REG_EXP,
              message: '올바른 형식이 아닙니다.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <Text style={styles.labelSelect}>남아</Text>
              <Text style={styles.labelSelect}>여아</Text>
            </>
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name?.message}</Text>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>생일</Text>
        <Controller
          control={control}
          rules={{
            required: '이름을 입력해주세요',
            pattern: {
              value: PETNAME_REG_EXP,
              message: '올바른 형식이 아닙니다.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomDatePicker
              maximumDate={new Date()}
              onDateChange={date => {
                dispatch(setPetBirthDate(formatDate(date)));
              }}
            />
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name?.message}</Text>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  inputWrapper: {flexDirection: 'row', padding: 20},
  label: {
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 16,
  },
  labelSelect: {
    fontSize: 16,
    paddingRight: 50,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F26C6C',
  },
});

export default PetInfoEditScreen;
