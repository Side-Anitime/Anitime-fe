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
import {SignUpScreenProps} from '../../../common/models/navigation/types';
import {useForm, Controller} from 'react-hook-form';
import {
  EMAIL_REG_EXP,
  NICKNAME_REG_EXP,
  PASSWORD_REG_EXP,
  PASSWORD_VALIDATION_MESSAGE,
} from '../../../common/constants';

function SignUpScreen({navigation}: SignUpScreenProps) {
  const emailRef = useRef<TextInput | null>(null);
  const nicknameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);
  const passwordCheckRef = useRef<TextInput | null>(null);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordCheck: '',
    },
  });

  const onSubmit = data => console.log(data);

  return (
    <KeyboardAwareScrollView style={{flex: 1}} extraScrollHeight={60}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>이메일</Text>
        <Controller
          control={control}
          rules={{
            required: '이메일을 입력해주세요',
            pattern: {
              value: EMAIL_REG_EXP,
              message: '올바른 이메일 형식이 아닙니다.',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.textInput}
              onBlur={onBlur}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor="#9F9F9F"
              onChangeText={onChange}
              value={value}
              ref={emailRef}
              textContentType="emailAddress"
              clearButtonMode="while-editing"
              returnKeyType="next"
              onSubmitEditing={() => nicknameRef.current?.focus()}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email?.message}</Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>닉네임</Text>
        <Controller
          control={control}
          rules={{
            required: '닉네임을 입력해주세요.',
            pattern: {
              value: NICKNAME_REG_EXP,
              message: '10글자 이하(영문, 국문)을 사용해주세요. :(',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={styles.textInput}
              placeholder="10글자 이하(영문, 국문)을 사용해주세요."
              placeholderTextColor="#9F9F9F"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              blurOnSubmit={false}
              ref={nicknameRef}
              clearButtonMode="while-editing"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          )}
          name="nickname"
        />
        {errors.nickname && (
          <Text style={styles.errorText}>{errors.nickname?.message}</Text>
        )}
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호</Text>
        <Controller
          control={control}
          rules={{
            required: '비밀번호를 입력해주세요.',
            pattern: {
              value: PASSWORD_REG_EXP,
              message: PASSWORD_VALIDATION_MESSAGE,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              style={styles.textInput}
              placeholder={PASSWORD_VALIDATION_MESSAGE}
              placeholderTextColor="#9F9F9F"
              onChangeText={onChange}
              value={value}
              keyboardType={
                Platform.OS === 'android' ? 'default' : 'ascii-capable'
              }
              textContentType="password"
              secureTextEntry
              returnKeyType="next"
              clearButtonMode="while-editing"
              ref={passwordRef}
              onSubmitEditing={() => passwordCheckRef.current?.focus()}
            />
          )}
          name="password"
        />
        {errors.nickname && (
          <Text style={styles.errorText}>{errors.password?.message}</Text>
        )}
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>비밀번호 확인</Text>
        <Controller
          control={control}
          rules={{
            required: true,
            pattern: {
              value: PASSWORD_REG_EXP,
              message: PASSWORD_VALIDATION_MESSAGE,
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onBlur={onBlur}
              style={styles.textInput}
              placeholder={PASSWORD_VALIDATION_MESSAGE}
              placeholderTextColor="#9F9F9F"
              onChangeText={onChange}
              value={value}
              keyboardType={
                Platform.OS === 'android' ? 'default' : 'ascii-capable'
              }
              textContentType="password"
              secureTextEntry
              returnKeyType="send"
              clearButtonMode="while-editing"
              ref={passwordCheckRef}
              onSubmitEditing={handleSubmit(onSubmit)}
            />
          )}
          name="passwordCheck"
        />
        {errors.nickname && (
          <Text style={styles.errorText}>{errors.passwordCheck?.message}</Text>
        )}
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          style={
            isValid
              ? StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
              : styles.loginButton
          }
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>다음</Text>
        </Pressable>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  inputWrapper: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonZone: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#F26C6C',
  },
});

export default SignUpScreen;
