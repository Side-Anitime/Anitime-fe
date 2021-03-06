import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {useForm, Controller} from 'react-hook-form';
import {PETNAME_REG_EXP} from '../../../common/constants';
import {MyPetStackScreenProps, PetInfo} from '../../../common/models';

import {selectPetInfo, setPetBirthDate, setPetName} from '../petInfoSlice';
import {useAppDispatch} from '../../../app/store';

import {formatDateToString} from '../../../common/utils/TimeUtils';
import CustomDatePicker from '../../../common/components/CustomDatePicker';
import CustomSelector from '../../../common/components/CustomSelector';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

interface Props extends MyPetStackScreenProps<'PetInfoEditScreen'> {}

function PetInfoEditScreen(props: Props) {
  const nameRef = useRef<TextInput | null>(null);
  const dispatch = useAppDispatch();
  const currentPetInfo: PetInfo = useSelector(selectPetInfo);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<PetInfo>({
    mode: 'onBlur',
    defaultValues: {
      name: currentPetInfo.name,
      birthDate: currentPetInfo.birthDate,
      gender: currentPetInfo.gender,
      neuterYn: currentPetInfo.neuterYn,
    },
  });
  // React.useLayoutEffect(() => {
  //   const routeName = getFocusedRouteNameFromRoute(props.route);
  //   console.log('rroute', routeName);
  //   if (routeName === 'Group') {
  //     props.navigation.setOptions({
  //       tabBarStyle: {
  //         display: 'none',
  //       },
  //     });
  //   } else {
  //     props.navigation.setOptions({
  //       tabBarStyle: {
  //         display: 'none',
  //       },
  //     });
  //   }
  // }, [props.navigation, props.route]);
  return (
    <KeyboardAwareScrollView style={{flex: 1}} extraScrollHeight={60}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>??????</Text>
        <Controller
          control={control}
          rules={{
            required: '????????? ??????????????????',
            pattern: {
              value: PETNAME_REG_EXP,
              message: '????????? ????????? ????????????.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              placeholder="????????? ??????????????????"
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
        <Text style={styles.label}>??????</Text>
        <Controller
          control={control}
          rules={{
            required: '????????? ??????????????????',
            pattern: {
              value: PETNAME_REG_EXP,
              message: '????????? ????????? ????????????.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomSelector
              onChange={gender => {
                onChange(gender);
              }}
              value={value}
              options={[
                {value: 'MALE', label: '??????'},
                {
                  value: 'FEMALE',
                  label: '??????',
                },
              ]}
            />
          )}
          name="gender"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name?.message}</Text>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>??????</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomDatePicker
              maximumDate={new Date()}
              date={value ? new Date(value) : undefined}
              onDateChange={date => {
                console.log('CURRENT', formatDateToString(date));
                dispatch(setPetBirthDate(formatDateToString(date)));
                onChange(formatDateToString(date));
              }}
            />
          )}
          name="birthDate"
        />
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.name?.message}</Text>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>????????? ??????</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <CustomSelector
              onChange={neuterYn => {
                onChange(neuterYn);
              }}
              value={value}
              options={[
                {value: 'Y', label: '???'},
                {
                  value: 'N',
                  label: '?????????',
                },
                {
                  value: '',
                  label: '?????????',
                },
              ]}
            />
          )}
          name="neuterYn"
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name?.message}</Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>?????????</Text>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => <></>}
          name="shortIntroduce"
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

  errorText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F26C6C',
  },
});

export default PetInfoEditScreen;
