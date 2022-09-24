import React, {useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';

export type Options = {
  value: string;
  label: string;
};

/**
 *
 * @onChange: value 값 변경시
 * @options: 선택 가능한 Options 배열
 * @value: 현재 값
 * @isEditing: 편집모드 on/off
 *
 * @wrapperStyle: wrapper (view) style css
 * @optionStyle: 각 Option wrapper style css
 * @labelStyle: all text style css (can be combined with "valueStyle")
 * @valueStyle: value style css (will overwrite overlapping labelStyle values)
 * @labelStyleOnEdit: 편집모드 text style css
 *
 */
interface Props {
  onChange?: (value: string) => void;
  options: Array<Options>;
  value?: string;
  isEditing?: boolean;

  wrapperStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  optionStyle?: StyleProp<TouchableOpacityProps>;
  labelStyleOnEdit?: StyleProp<TextStyle>;
}

function CustomSelector({
  onChange,
  options,
  value,
  isEditing,
  labelStyle,
  valueStyle,
  optionStyle,
  wrapperStyle,
}: Props) {
  return (
    <View style={wrapperStyle}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            disabled={!isEditing}
            style={optionStyle}
            key={index}
            onPress={() => {
              if (isEditing) {
                if (onChange) onChange(option.value);
              }
            }}>
            <Text style={[labelStyle, option.value === value && valueStyle]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomSelector;

CustomSelector.defaultProps = {
  isEditing: false,
  wrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
  },
  optionStyle: {marginRight: 20, alignSelf: 'center'},
  valueStyle: {
    opacity: 1,
  },
  labelStyle: {
    opacity: 0.5,
    fontSize: 16,
    color: 'black',
  },
};
