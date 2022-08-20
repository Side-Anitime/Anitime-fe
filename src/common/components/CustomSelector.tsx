import React, {useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

type Options = {
  value: string;
  label: string;
};

interface Props {
  value?: string;
  options: Array<Options>;
  onChange?: (value: string) => void;
  isEditing?: boolean;
}

function CustomSelector({onChange, options, value, isEditing}: Props) {
  return (
    <View style={styles.wrapper}>
      {options.map((option, index) => {
        if (!isEditing) {
          return (
            <Text
              key={index}
              style={{
                ...styles.optionLabel,
                color:
                  value === option.value
                    ? '#000000'
                    : isEditing
                    ? '#C5C5C5'
                    : '#e8e8e8',
                // fontWeight: props.value === option.value ? 'bold' : 'normal',
              }}>
              {option.label}
            </Text>
          );
        }
        return (
          <TouchableOpacity
            key={index}
            onPress={() => {
              if (onChange) onChange(option.value);
            }}>
            <Text
              style={{
                ...styles.optionLabel,
                color: value === option.value ? '#000000' : '#C5C5C5',
              }}>
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
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  optionLabel: {
    fontSize: 16,
    paddingRight: 30,
  },
});
