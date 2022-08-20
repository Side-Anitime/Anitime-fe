import {ScreenWidth} from '@rneui/base';
import {Input} from 'native-base';
import React, {useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  TextInput,
} from 'react-native';

interface Props {
  value?: string;
  onChange?: (value?: string) => void;
  isEditing?: boolean;
  w?: string;
  wrapperStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
}

function CustomTextInput({
  onChange,
  value,
  isEditing,
  wrapperStyle,
  textInputStyle,
  w,
}: Props) {
  return (
    <View style={wrapperStyle}>
      <Input
        w={w}
        size={'lg'}
        variant={isEditing ? 'filled' : 'filled'}
        maxWidth="300px"
        isReadOnly={!isEditing}
        _light={{
          bg: isEditing ? 'white' : 'transparent',
        }}
        _dark={{
          bg: isEditing ? 'white' : 'transparent',
        }}
        value={value}
        onChangeText={value => {
          if (onChange) onChange(value);
        }}
      />
    </View>
  );
}

export default CustomTextInput;

CustomTextInput.defaultProps = {
  isEditing: false,
  w: '100%',
  textInputStyle: {},
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
  },
};
