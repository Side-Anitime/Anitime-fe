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
  onChange: (value: string) => void;
}

function CustomSelector(props: Props) {
  return (
    <View style={styles.wrapper}>
      {props.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            props.onChange(option.value);
          }}>
          <Text
            style={{
              ...styles.optionLabel,
              color: props.value === option.value ? '#000000' : '#C5C5C5',
              // fontWeight: props.value === option.value ? 'bold' : 'normal',
            }}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default CustomSelector;

CustomSelector.defaultProps = {};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  optionLabel: {
    fontSize: 16,
    paddingRight: 50,
  },
});
