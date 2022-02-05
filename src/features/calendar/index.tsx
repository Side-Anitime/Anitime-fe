import React from 'react';
import {View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key: 'workout', color: 'green'};

function MyCalendar() {
  return (
    <View>
      <Calendar
        onDayPress={day => {
          console.log('selected day', day);
        }}
        markingType={'multi-dot'}
        markedDates={{
          '2022-02-01': {
            dots: [vacation, massage, workout],
            selected: true,
            selectedColor: 'red',
          },
          '2022-02-02': {dots: [massage, workout], disabled: true},
          '2022-02-03': {dots: [massage, workout]},
        }}
      />
      <Text>Calendar</Text>
    </View>
  );
}
export default MyCalendar;
