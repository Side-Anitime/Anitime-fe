import React, {useEffect, useState} from 'react';
import {Calendar, LocaleConfig, DateData} from 'react-native-calendars';
import deepmerge from 'deepmerge';
import {korMonth} from '../../../common/constants';
import {useQuery} from '@tanstack/react-query';
import {getPlans} from '../calendarSlice';

LocaleConfig.locales.kr = {
  monthNames: korMonth,
  monthNamesShort: korMonth,
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

function MyCalendar() {
  const [curMonth, setCurMonth] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState({});

  const {data: calendarData, status} = useQuery(['plans', curMonth], () =>
    getPlans('2022', curMonth, 'testtoken'),
  );

  useEffect(() => {
    setSelectedDay(calendarData);
  }, [status, calendarData]);

  const onDayPress = (day: DateData) => {
    const mergedDay = deepmerge(calendarData, {
      [day.dateString]: {
        marked: true,
        selected: true,
        color: 'blue',
      },
    });
    setSelectedDay(mergedDay);
  };

  const onMonthChange = (monthData: DateData) => {
    setCurMonth(monthData.month.toString().padStart(2, '0'));
  };

  return (
    <Calendar
      monthFormat={'yyyy년 MM월'}
      enableSwipeMonths={true}
      onDayPress={onDayPress}
      onMonthChange={onMonthChange}
      markingType={'multi-dot'}
      markedDates={selectedDay}
    />
  );
}

export default MyCalendar;
