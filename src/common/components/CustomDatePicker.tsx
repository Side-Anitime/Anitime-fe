import RBSheet from 'react-native-raw-bottom-sheet';
import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

interface Props {
  date?: Date;
  maximumDate?: Date;
  onDateChange: (date?: Date) => void;
}

function CustomDatePicker(props: Props) {
  const refRBSheet = useRef<RBSheet>(null);

  const onOpenDatePicker = () => {
    refRBSheet.current?.open();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.textWrapper} onPress={() => onOpenDatePicker()}>
        <Text>{props.date ? 'ff' : 'nn'} </Text>
        <Text style={styles.label}>년</Text>
        <Text>{props.date ? 'ff' : 'nn'} </Text>
        <Text style={styles.label}>월</Text>
        <Text>{props.date ? 'ff' : 'nn'} </Text>
        <Text style={styles.label}>일</Text>
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

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },
  datePicker: {
    height: 70,
  },
  textWrapper: {
    flexDirection: 'row',
  },
  label: {
    fontSize: 16,
  },
});
