import React from 'react';
import {Controller} from 'react-hook-form';
import styled from 'styled-components/native';
import {css} from 'styled-components';

const InputField = props => {
  const {
    style,
    icon,
    title,
    name,
    control,
    pattern,
    validate,
    placeholder,
    minLength,
    maxLength,
    suffix,
    innerSuffix,
    marginBottom,
    keyboardType,
    returnKeyType = 'done',
    errorMessage = '*',
    defaultValue = '',
    required = false,
    error = false,
    secure = false,
    disabled = false,
    testID = null,
  } = props;

  const rules = {
    required: required,
  };

  if (pattern) {
    rules.pattern = pattern;
  }
  if (validate) {
    rules.validate = validate;
  }

  return (
    <Wrapper>
      <InputText>
        {title} {required && <Asterisk>*</Asterisk>}
      </InputText>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        maxLength={maxLength}
        minLength={minLength}
        render={({field: {onChange, onBlur, value}}) => {
          return (
            <>
              <InputBoxContainer marginBottom={marginBottom} error={error}>
                <InputBox
                  style={style}
                  testID={testID}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType={keyboardType}
                  secureTextEntry={secure}
                  placeholder={placeholder}
                  editable={!disabled}
                  selectTextOnFocus={!disabled}
                  autoCapitalize="none"
                  returnKeyType={returnKeyType}
                />
                <InnerSuffix>{innerSuffix}</InnerSuffix>
                {icon}
              </InputBoxContainer>
              {error && <StyledError>{errorMessage}</StyledError>}
              {suffix && <StyledSuffix>{suffix}</StyledSuffix>}
            </>
          );
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View``;

const InputText = styled.Text`
  margin-bottom: 8px;
`;

const InputBoxContainer = styled.View<{marginBottom: number; error: any}>`
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  height: 44px;
  border-radius: 4px;
  border: 1px solid #d4d4d4;
  flex-direction: row;
  align-items: center;
  padding-right: 12px;
  justify-content: space-between;
  ${props =>
    props.error &&
    css`
      border: 1px solid #ff4d00;
    `}
`;

const InputBox = styled.TextInput`
  padding: 0 12px;
  height: 100%;
  width: 90%;
`;

const StyledError = styled.Text`
  font-size: 12px;
  color: #ff4d00;
  min-height: 25px;
`;

const StyledSuffix = styled.Text`
  font-size: 14px;
  color: #1d1e02;
  align-self: flex-end;
  margin-top: 8px;
`;

const InnerSuffix = styled.Text`
  font-size: 14px;
  color: #b6b6b6;
`;

const Asterisk = styled.Text`
  color: #ff4d00;
`;

export default InputField;
