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
      <Text style={styles.text}>
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
        <Text style={styles.text}>
          {date ? formatDateToString(date, 'YYYY') : '_____'}
          <Text style={labelStyle}> {'년 '}</Text>
          {date ? formatDateToString(date, 'MM') : '___'}
          <Text style={labelStyle}> {'월 '}</Text>
          {date ? formatDateToString(date, 'DD') : '___'}
          <Text style={labelStyle}> {'일 '}</Text>
        </Text>
      </Pressable>
      <RBSheet ref={refRBSheet}>
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
  datePicker: {},
  textWrapper: {},
  text: {
    color: '#000000',
    fontSize: 16,
  },
});
