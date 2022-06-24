import React, {useRef} from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {SignUpScreenProps} from '../../../common/models/navigation/types';
import {useForm, Controller} from 'react-hook-form';
import {PETNAME_REG_EXP} from '../../../common/constants';
import {MyPetStackScreenProps, PetInfo} from '../../../common/models';

import {selectPetInfo, setPetName} from '../petInfoSlice';
import {useAppDispatch} from '../../../app/store';
import {HStack, VStack} from 'native-base';
import {flexbox} from 'native-base/lib/typescript/theme/styled-system';

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
      name: props.route.params.item.name,
    },
  });
  const onSubmit = () => {
    console.log('SUBMIT');
  };
  return (
    <KeyboardAwareScrollView
      style={{flex: 1, margin: 20}}
      extraScrollHeight={60}>
      <View>
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
            <HStack>
              <Text style={styles.label}>이름</Text>
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
            </HStack>
          )}
          name="name"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name?.message}</Text>
        )}
      </View>
      <View>
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
            <HStack style={{display: 'flex', justifyContent: 'space-evenly'}}>
              <Text>남아</Text>
              <Text>여아</Text>
            </HStack>
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
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F26C6C',
  },
});

export default PetInfoEditScreen;
