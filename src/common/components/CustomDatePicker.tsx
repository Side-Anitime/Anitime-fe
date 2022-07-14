import RBSheet from 'react-native-raw-bottom-sheet';
import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {formatDateToString} from '../utils/TimeUtils';

interface Props {
  date?: Date;
  maximumDate?: Date;
  onDateChange: (date?: Date) => void;
  labelStyle?: StyleProp<TextStyle>;
}

function CustomDatePicker(props: Props) {
  const refRBSheet = useRef<RBSheet>(null);

  const onOpenDatePicker = () => {
    refRBSheet.current?.open();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.textWrapper} onPress={() => onOpenDatePicker()}>
        <Text style={styles.text}>
          {props.date ? formatDateToString(props.date, 'YYYY') : '__'}
          <Text style={props.labelStyle}> {'년 '}</Text>
          {props.date ? formatDateToString(props.date, 'MM') : '__'}
          <Text style={props.labelStyle}> {'월 '}</Text>
          {props.date ? formatDateToString(props.date, 'DD') : '__'}
          <Text style={props.labelStyle}> {'일 '}</Text>
        </Text>
      </Pressable>
      <RBSheet ref={refRBSheet}>
        <DatePicker
          style={styles.datePicker}
          locale="ko"
          mode="date"
          maximumDate={props.maximumDate}
          date={props.date ?? new Date()}
          onDateChange={date => {
            props.onDateChange(date);
          }}
        />
      </RBSheet>
    </View>
  );
}

export default CustomDatePicker;

CustomDatePicker.defaultProps = {
  labelStyle: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  datePicker: {},
  textWrapper: {},
  text: {
    fontSize: 16,
  },
});
