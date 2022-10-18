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
import {formatDateToString} from '../utils/timeUtils';

interface Props {
  date?: Date;
  maximumDate?: Date;
  onDateChange: (date?: Date) => void;
  labelStyle?: StyleProp<TextStyle>;
  isEditing?: boolean;
}

function CustomDatePicker({
  isEditing,
  date,
  labelStyle,
  maximumDate,
  onDateChange,
}: Props) {
  const refRBSheet = useRef<RBSheet>(null);

  const onOpenDatePicker = () => {
    refRBSheet.current?.open();
  };

  if (!isEditing) {
    return (
      <Text style={labelStyle}>
        {date ? formatDateToString(date, 'YYYY') : '_____'}
        <Text style={labelStyle}> {'년 '}</Text>
        {date ? formatDateToString(date, 'MM') : '___'}
        <Text style={labelStyle}> {'월 '}</Text>
        {date ? formatDateToString(date, 'DD') : '___'}
        <Text style={labelStyle}> {'일 '}</Text>
      </Text>
    );
  }
  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.textWrapper} onPress={() => onOpenDatePicker()}>
        <Text style={labelStyle}>
          {date ? formatDateToString(date, 'YYYY') : '_____'}
          <Text style={labelStyle}> {'년 '}</Text>
          {date ? formatDateToString(date, 'MM') : '___'}
          <Text style={labelStyle}> {'월 '}</Text>
          {date ? formatDateToString(date, 'DD') : '___'}
          <Text style={labelStyle}> {'일 '}</Text>
        </Text>
      </Pressable>
      <RBSheet ref={refRBSheet}>
        <View style={styles.datePickerWrapper}>
          <DatePicker
            style={styles.datePicker}
            locale="ko"
            mode="date"
            maximumDate={maximumDate}
            date={date ?? new Date()}
            onDateChange={date => {
              onDateChange(date);
            }}
          />
        </View>
      </RBSheet>
    </View>
  );
}

export default CustomDatePicker;

CustomDatePicker.defaultProps = {
  labelStyle: {
    color: '#000000',
  },
  isEditing: false,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  datePickerWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  datePicker: {},
  textWrapper: {},
});
